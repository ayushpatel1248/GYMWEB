import { scheduleNotifications } from "../../notification/scheduleNotifications";

export async function GET(req, res) {
  scheduleNotifications();
  console.log("Cron job initialized");
  return new Response(JSON.stringify({ message: "Cron job initialized" }), {
    status: 200,
  });
}
