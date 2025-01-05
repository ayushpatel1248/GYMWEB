"use server";

import { createClient } from "../../utils/supabase/server";
import webpush from "web-push";

export const sendNotification = async (
  message: string,
  user_id: string,
  icon: string,
  name: string
) => {
  const vapidKeys = {
    publickey:"BDf-3G51UdegX8K9R5q_TPmyJSYRBiN3wczOAmDXkzX_I-zXM9Kymt5UEbVKWO1884lutCcNljUSXovmBvt-iIg",
    privatekey: "xwMOs06ZYpRcTPKmgsoq8YWsHhGj_JQLqLyNkOb6yZk",
  };
  webpush.setVapidDetails(
    "mailto:nharshit7024@gmail.com",
    vapidKeys.publickey,
    vapidKeys.privatekey
  );
  const supabase = await createClient();
  const { data, error } = await supabase.from("notification").select("*").eq("id", user_id).single();

  if (error) {
    return JSON.stringify({ error: error.message });
  } else if (data) {
    try {
      await webpush.sendNotification(
        JSON.parse(data.notification_json),
        JSON.stringify({
          message: name,
          icon: "",
          body: message,
        })
      );
      return "{}";
    } catch (e) {
      return JSON.stringify({ error: "faild to send notification" });
    }
  }
};
