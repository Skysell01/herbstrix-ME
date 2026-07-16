# Why leads aren't reaching Herbstrix CRM

I checked the live server logs and found the actual error. **Your token, product_id, and channel_id are not the problem.** Every lead is being sent, but Herbstrix's hosting (Cloudflare in front of a Shopify-hosted endpoint) is **blocking our server with HTTP 403 "Sorry, you have been blocked"** before the request even reaches their PHP script.

Real log line from production:
```
[Herbstrix] forward failed [403]: <html>... Sorry, you have been blocked ...
You are unable to access myshopify.com ... Cloudflare Ray ID: 9fb0a94a1c9c7f17
```

This is what you should tell the Herbstrix tech contact — they'll recognize it instantly. It is a Cloudflare WAF / bot-protection block on their side, not a credentials issue.

## What's actually happening

1. Our server sends `GET https://herbstrix.com/apileads/leads.php?...` with the correct `name`, `number`, `channel_id=AJN-TM-SKM`, `product_id=93`, and `token`.
2. Herbstrix's domain sits behind Cloudflare and the backend resolves to a Shopify origin.
3. Cloudflare sees the request coming from a serverless worker (no browser User-Agent, datacenter IP) and serves a 403 challenge page instead of forwarding to `leads.php`.
4. Our code correctly logs the failure but the lead is never seen by Herbstrix — that's why nothing shows in their CRM.

The lead IS being saved in your own database and Google Sheet. Only the forward to Herbstrix is failing.

## Plan — two parallel tracks

### Track A — make our request look like a normal browser (might work immediately)

Update `src/server/herbstrix.server.ts` to send standard browser-style headers on the GET request:
- `User-Agent: Mozilla/5.0 (...) AppleWebKit/537.36 ... Chrome/...`
- `Accept: text/html,application/xhtml+xml,...`
- `Accept-Language: en-US,en;q=0.9`
- `Referer: https://tamil.intimacyschools.in/`

Cloudflare often blocks requests with empty/worker User-Agents. Adding real headers is a one-line fix and frequently clears generic bot blocks. We'll also:
- Log the **Cloudflare Ray ID** from the 403 response (so you can paste it to Herbstrix support — they can whitelist your traffic by Ray ID in seconds).
- Log the outbound URL with the token redacted, so future debugging is easy.

### Track B — give Herbstrix exactly what they need to whitelist us

You have one piece of information they need: the **outbound IP / ASN our requests come from**. Send Herbstrix's tech team this message (template included below) and ask them to whitelist us on their Cloudflare WAF:

> "Hi, we're sending leads to `https://herbstrix.com/apileads/leads.php` with `channel_id=AJN-TM-SKM`, `product_id=93`. Every request is being blocked by your Cloudflare with HTTP 403 'Sorry, you have been blocked.' Sample Cloudflare Ray ID: **9fb0a94a1c9c7f17**. Please whitelist our server (Cloudflare Workers, ASN 13335) on your WAF / bot-fight-mode for the `/apileads/` path, or share an alternate endpoint that doesn't require browser-style headers. Our token and IDs are correct — the request is not reaching your PHP at all."

If they can't whitelist, ask for one of these alternatives:
- a server-to-server endpoint that bypasses Cloudflare bot protection (often `api.herbstrix.com` style)
- a shared secret header (e.g. `X-API-Key`) they can configure as a WAF bypass rule
- permission for us to send `POST` instead of `GET` (sometimes routed differently)

### Track C — fallback if the above two don't work

If Cloudflare still blocks us after Track A, we add a tiny relay so the request reaches Herbstrix from a normal IP:
- a 5-line server function that POSTs the same query to a free relay (e.g. a small proxy worker on a residential-friendly host you set up, or a paid service like ScraperAPI), which then forwards to `leads.php`.

I won't build this now — only if Track A + B fails.

## Files I'll touch

```
src/server/herbstrix.server.ts   edit — add browser-style headers, log Ray ID, redact token
```

No backend changes (DB / Sheets / lead schema all stay the same). No frontend changes.

## What I need from you

1. **Send the message above to your Herbstrix contact** (Track B) so they can whitelist while we ship Track A.
2. Confirm I should ship Track A now. After deploy I'll send a real test lead and check the logs to see whether the 403 is gone or still there. I'll report back with the next step based on what I see.

That's it — credentials are fine, it's a network-layer block that needs both a code tweak on our side and a whitelist on their side.
