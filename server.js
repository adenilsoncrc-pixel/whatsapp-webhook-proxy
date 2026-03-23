const http = require("http");
const https = require("https");
const VERIFY_TOKEN = "adr_contabil_webhook_2026";
const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/lmu0em1kl9ho9krrasp079kp5fehe24u";
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url.includes("hub.verify_token")) {
    const params = new URL(req.url, `http://localhost:${PORT}`).searchParams;
    const mode = params.get("hub.mode");
    const token = params.get("hub.verify_token");
    const challenge = params.get("hub.challenge");
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      return res.end(challenge);
    }
    res.writeHead(403);
    return res.end("Forbidden");
  }
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const url = new URL(MAKE_WEBHOOK_URL);
      const options = {
        hostname: url.hostname,
        path: url.pathname,
        method: "POST",
        headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) },
      };
      const fwd = https.request(options, () => {});
      fwd.on("error", () => {});
      fwd.write(body);
      fwd.end();
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("OK");
    });
    return;
  }
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WhatsApp Webhook Proxy - OK");
});
server.listen(PORT, () => console.log("Proxy running on port " + PORT));
