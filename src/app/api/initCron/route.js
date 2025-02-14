import { scheduleNotifications } from "../../notification/scheduleNotifications";
import { sendNotification } from "../../notification/sendNotification";

export async function GET(req, res) {

  // scheduleNotifications();
  sendNotification()
  console.log("Cron job initialized");
  return new Response(JSON.stringify({ message: "Cron job initialized" }), {
    status: 200,
  });
}
