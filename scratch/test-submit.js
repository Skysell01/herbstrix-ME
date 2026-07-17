// Test script to run locally and test both Google Sheet webhook and Herbstrix CRM push

const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
const crmToken = process.env.HERBSTRIX_TOKEN;

console.log("=== Environment Variables ===");
console.log("Webhook URL:", webhookUrl);
console.log("CRM Token:", crmToken);

async function runTest() {
  console.log("\n1. Testing Google Sheets Webhook 'append'...");
  if (!webhookUrl) {
    console.error("Error: GOOGLE_SHEET_WEBHOOK_URL is not set.");
  } else {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "append",
          name: "Test User",
          phone: "9999999999",
          age: 30,
          city: "Delhi",
          concern: "stamina",
          bestTime: "anytime",
          sourcePage: "test-script",
          leadId: "test-lead-uuid",
          herbstrixOrderId: null,
          herbstrixStatus: "pending"
        })
      });
      console.log("Response Status:", res.status);
      const text = await res.text();
      console.log("Response Body:", text);
    } catch (err) {
      console.error("Google Sheets Webhook Failed:", err);
    }
  }

  console.log("\n2. Testing Herbstrix CRM push...");
  if (!crmToken) {
    console.error("Error: HERBSTRIX_TOKEN is not set.");
  } else {
    const params = new URLSearchParams({
      name: "Test User",
      number: "9999999999",
      channel_id: "AJN-TM-SKM",
      token: crmToken,
      product_id: "93",
    });
    const endpoint = "https://herbstrix.com/apileads/leads.php";
    const url = `${endpoint}?${params.toString()}`;
    
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          Referer: "https://tamil.intimacyschools.in/"
        }
      });
      console.log("CRM Response Status:", res.status);
      const text = await res.text();
      console.log("CRM Response Body:", text);
    } catch (err) {
      console.error("CRM Push Failed:", err);
    }
  }
}

runTest();
