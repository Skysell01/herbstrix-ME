// Test script to run locally and test Google Sheet list action
const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

console.log("=== Environment Variables ===");
console.log("Webhook URL:", webhookUrl);

async function runTest() {
  console.log("\nTesting Google Sheets Webhook 'list'...");
  if (!webhookUrl) {
    console.error("Error: GOOGLE_SHEET_WEBHOOK_URL is not set.");
  } else {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "list"
        })
      });
      console.log("Response Status:", res.status);
      const json = await res.json();
      console.log("Response JSON (first 3 leads):", JSON.stringify(json.leads?.slice(0, 3) || json, null, 2));
    } catch (err) {
      console.error("Google Sheets Webhook 'list' Failed:", err);
    }
  }
}

runTest();
