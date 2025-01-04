"use client"
import React from 'react'
import { createClient } from "../../utils/supabase/client";



 const page = () => {

    const urlBase64ToUint8Array = (base64String: string) => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
    };
const generateSuscribeEndPoint = async(registration:ServiceWorkerRegistration)=>{
   const  publicKey = 'BDf-3G51UdegX8K9R5q_TPmyJSYRBiN3wczOAmDXkzX_I-zXM9Kymt5UEbVKWO1884lutCcNljUSXovmBvt-iIg'
   const privateKey = 'xwMOs06ZYpRcTPKmgsoq8YWsHhGj_JQLqLyNkOb6yZk'
    const options={
        applicationServerKey :urlBase64ToUint8Array(publicKey) ,
        userVisibleOnly:true
    }
    try {
        const subscription = await registration.pushManager.subscribe(options);
        const supabase = createClient();
        const { error } = await supabase
          .from("notification")
          .insert({ notification_json: JSON.stringify(subscription) });
        if (error) {
          console.error("Error inserting subscription:", error.message);
        }
    } catch (err:any) {
        console.error("Failed to subscribe:", err.message);
    }
}

const subscribeUser = async () => {
    if ("serviceWorker" in navigator) {
      try {
        let registration = await navigator.serviceWorker.getRegistration();
  
        // Register service worker if not already registered
        if (!registration) {
          registration = await navigator.serviceWorker.register("/sw.js");
        }
  
        // Wait for the service worker to activate
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
  
        // Service worker is now active, proceed with subscription
        await generateSuscribeEndPoint(registration);
      } catch (error) {
        console.error("Error in service worker registration or subscription:", error);
      }
    } else {
      console.error("Service workers are not supported in this browser.");
    }
  };
    
const showNotification = ()=>{
   
    if('Notification' in window ){
        Notification.requestPermission().then((permission)=>{
            // setNotificationPermission(permission)

            if(permission === "granted"){
                subscribeUser()
            }else{
                "go to setting and enable notification"
            }
        })
    }else{
        console.log("sys not support notifications")
    }
}

        // showNotification()

  return (
    <div
    onClick={showNotification}
    >page</div>
  )
}
export default page;
