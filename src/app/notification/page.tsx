"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import { sendNotification } from "./sendNotification";

const Page = () => {
  const [notificationStatus, setNotificationStatus] = useState<string | null>(null);
  const supabase = createClient();
  const [ dbdata, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [redirecting, setRedirecting] = useState<boolean>(false);


  const parsePlanMonths = (planString: string): number => {
    const matches = planString.match(/(\d+)/);
    return matches ? parseInt(matches[0]) : 1;
  };

  
  const calculateRemainingDays = (doj: string, planString: string) => {
    const joinDate = new Date(doj);
    const monthsToAdd = parsePlanMonths(planString);

    // Get the end date
    const membershipEndDate = new Date(joinDate);

    // Add months considering variable month lengths
    // If the current day is 31st and next month has 30 days, it will correctly adjust
    membershipEndDate.setMonth(membershipEndDate.getMonth() + monthsToAdd);

    // Handle edge case where joining on 31st and ending month has fewer days
    if (joinDate.getDate() !== membershipEndDate.getDate()) {
      // This means we've hit the edge case of e.g., Jan 31 -> Feb 28
      // Go back to the last day of the intended month
      membershipEndDate.setDate(2);
    }

    // Set the time to end of day to include the full last day
    membershipEndDate.setHours(23, 59, 59, 999);

    const currentDate = new Date();

    // Calculate remaining time in milliseconds
    const remainingTime = membershipEndDate.getTime() - currentDate.getTime();

    // Convert to days and round up to give benefit of partial days to user
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

    return {
      remainingDays,
      endDate: membershipEndDate.toLocaleDateString(),
    };
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: rows, error } = await supabase
          .from("personList")
          .select("*");
        if (error) {
          console.error("Error fetching personList:", error);
          return;
        }

        const updatedData = await Promise.all(
          rows.map(async (row) => {
            // Calculate remaining days and end date
            const { remainingDays, endDate } = calculateRemainingDays(
              row.doj,
              row.plan
            );
            
        // Add remainingDays and endDate to row data
        row.remainingDays = remainingDays;
        row.membershipEndDate = endDate;
            

            return row;
          })
        );
        console.log("data updated", updatedData);
        setData(updatedData);
        
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  };

  const generateSubscribeEndPoint = async (registration: ServiceWorkerRegistration) => {
    const publicKey =
      "BDf-3G51UdegX8K9R5q_TPmyJSYRBiN3wczOAmDXkzX_I-zXM9Kymt5UEbVKWO1884lutCcNljUSXovmBvt-iIg";
    const options = {
      applicationServerKey: urlBase64ToUint8Array(publicKey),
      userVisibleOnly: true,
    };
    try {
      const subscription = await registration.pushManager.subscribe(options);
      
      const { error } = await supabase
        .from("notification")
        .insert({ notification_json: JSON.stringify(subscription) });
      if (error) {
        console.error("Error inserting subscription:", error.message);
      } else {
        console.log("User subscribed successfully!");
      }
    } catch (err: any) {
      console.error("Failed to subscribe:", err.message);
    }
  };

  const subscribeUser = async () => {
    if ("serviceWorker" in navigator) {
      try {
        let registration = await navigator.serviceWorker.getRegistration();

        // Register service worker if not already registered
        if (!registration) {
          registration = await navigator.serviceWorker.register("/sw.js");
        } else if (registration.waiting) {
          // Handle waiting service worker
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }

        // Check if already subscribed to push notifications
        const isSubscribed = await registration.pushManager.getSubscription();
        if (isSubscribed) {
          console.log("Already subscribed to push notifications.");
          return;
        }

        // Wait for service worker to activate if it's installing or waiting
        if (registration.installing || registration.waiting) {
          await new Promise<void>((resolve) => {
            const stateChangeListener = () => {
              if (registration.active) {
                resolve();
              }
            };

            if (registration.installing) {
              registration.installing.addEventListener("statechange", stateChangeListener);
            } else if (registration.waiting) {
              registration.waiting.addEventListener("statechange", stateChangeListener);
            }
          });
        }

        // Proceed with subscription
        await generateSubscribeEndPoint(registration);
      } catch (error) {
        console.error("Error in service worker registration or subscription:", error);
      }
    } else {
      console.error("Service workers are not supported in this browser.");
    }
  };

  const showNotification = async () => {
    if ("Notification" in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationStatus(permission);

        if (permission === "granted") {
          subscribeUser();
        } else {
          alert("Please enable notifications in your browser settings.");
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    } else {
      console.log("Your browser does not support notifications.");
    }
  };

  const handleSendNotification = async () => {
    try {
      // Check if service workers are supported
      if (!("serviceWorker" in navigator)) {
        console.error("Service workers are not supported in this browser.");
        return;
      }
  
      // Check if a service worker is registered
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) {
        console.error("No service worker is registered. Please register one first.");
        alert("Service worker is not registered. Subscribe for notifications first!");
        return;
      }
  
     // Proceed with sending the notification
      dbdata.map(async(el)=>{
        if(el.remainingDays == 0){
          const data = await sendNotification(
            `subscription end of ${el.fullName}`,
            "",
            "message"
          );
          console.log("Notification sent successfully:", data);
        }
      })
    } catch (error) {
      console.error("Error in sending notification:", error);
    }
  };
  

  return (
    <>
      <div onClick={showNotification} style={{ cursor: "pointer", padding: "10px", border: "1px solid #000" }}>
        Subscribe for Notifications
      </div>
      <div className="pt-6">
        <button onClick={handleSendNotification}>
          Send Notification
        </button>
      </div>

      {notificationStatus && (
        <div>
          Notification Permission: {notificationStatus}
        </div>
      )}
    </>
  );
};

export default Page;
