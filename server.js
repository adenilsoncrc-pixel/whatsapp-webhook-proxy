const http = require("http");
const https = require("https");
const VERIFY_TOKEN = "adr_contabil_webhook_2026";
const WA_TOKEN = "EAAXaiCKHRJwBRFZBBDer4k0hrgC6EbHKVS1MHQKSMRSOJloDLSqbVCWxx8zjhHT9Gq87m7nca24kKj3mNFAi831OsagZBvCBAZBrsy73ZCfNlca4ozjXJMDkbJnZAeBHZA9O78107z7RxBwZAjY1oH17NptG3oaSjvsBJbtup379MHv4CSHIU8pcf28GZBdZAqwZDZD";
const PHONE_ID = "1067629079762673";
const PORT = process.env.PORT || 3000;
const MENU = "Ola! Bem-vindo a A.D.R. Contabilidade.
1-Advocacia
2-Contabilidade
3-Pericia
4-IRPF
5-Certidoes
6-Agendamento
7-Atendente";
function send(to, txt) {
var b = JSON.stringify({messaging_product:"whatsapp",to:to,type:"text",text:{body:txt}});
var o = {hostname:"graph.facebook.com",path:"/v21.0/"+PHONE_ID+"/messages",method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+WA_TOKEN,"Content-Length":Buffer.byteLength(b)}};
var r = https.request(o, function(){});
r.on("error", function(){});
r.write(b);
r.end();
}
var server = http.createServer(function(req, res) {
if (req.method === "GET") {
var u = new URL(req.url, "http://localhost:"+PORT).searchParams;
if (u.get("hub.mode")==="subscribe" && u.get("hub.verify_token")===VERIFY_TOKEN) {
res.writeHead(200);
res.end(u.get("hub.challenge"));
return;
}
res.writeHead(200);
res.end("Bot OK");
return;
}
if (req.method === "POST") {
var body = "";
req.on("data", function(c){body+=c;});
req.on("end", function(){
res.writeHead(200);
res.end("OK");
try {
var d = JSON.parse(body);
if (!d.entry) return;
d.entry.forEach(function(e){
if (!e.changes) return;
e.changes.forEach(function(c){
if (!c.value || !c.value.messages) return;
c.value.messages.forEach(function(m){
if (m.type==="text") send(m.from, MENU);
});
});
});
} catch(e){}
});
return;
}
res.writeHead(405);
res.end();
});
server.listen(PORT, function(){console.log("Bot on port "+PORT);});
