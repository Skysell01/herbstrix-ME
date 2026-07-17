// Test the URL from .env file directly
const dotenvUrl = "https://script.google.com/macros/s/AKfycbycaD07CepI-3dLVXRYWWsRLjXzqz99iSBkme4x7bvQsA2iWT8xvaS9JjqUVskwYmMn/exec";

async function runTest() {
  console.log("Testing specific Webhook URL:", dotenvUrl);
  try {
    const res = await fetch(dotenvUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "list"
      })
    });
    console.log("Response Status:", res.status);
    const text = await res.text();
    console.log("Response Text:", text.slice(0, 300));
  } catch (err) {
    console.error("Failed:", err);
  }
}

runTest();
