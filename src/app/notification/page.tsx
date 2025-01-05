"use client";
import React, { useState } from "react";
import { createClient } from "../../utils/supabase/client";
import { sendNotification } from "./sendNotification";

const Page = () => {
  const [notificationStatus, setNotificationStatus] = useState<string | null>(null);

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
      const supabase = createClient();
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
      const data = await sendNotification(
        "Notification: Your site is hacked",
        "",
        "message"
      );
      console.log("Notification sent successfully:", data);
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
