const http=require("http"),https=require("https");const V="adr_contabil_webhook_2026",T="EAAXaiCKHRJwBRFZBBDer4k0hrgC6EbHKVS1MHQKSMRSOJloDLSqbVCWxx8zjhHT9Gq87m7nca24kKj3mNFAi831OsagZBvCBAZBrsy73ZCfNlca4ozjXJMDkbJnZAeBHZA9O78107z7RxBwZAjY1oH17NptG3oaSjvsBJbtup379MHv4CSHIU8pcf28GZBdZAqwZDZD",P="1067629079762673",PORT=process.env.PORT||3000;const M="Ola! Bem-vindo a A.D.R. Contabilidade.

1-Advocacia
2-Contabilidade
3-Pericia
4-IRPF
5-Certidoes
6-Agendamento
7-Atendente";function send(to,txt){const b=JSON.stringify({messaging_product:"whatsapp",to,type:"text",text:{body:txt}});const o={hostname:"graph.facebook.com",path:"/v21.0/"+P+"/messages",method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+T,"Content-Length":Buffer.byteLength(b)}};const r=https.request(o,()=>{});r.on("error",()=>{});r.write(b);r.end()}http.createServer((req,res)=>{if(req.method==="GET"){const u=new URL(req.url,"http://l:"+PORT).searchParams;if(u.get("hub.mode")==="subscribe"&&u.get("hub.verify_token")===V){res.writeHead(200);return res.end(u.get("hub.challenge"))}res.writeHead(200);return res.end("OK")}if(req.method==="POST"){let b="";req.on("data",c=>b+=c);req.on("end",()=>{res.writeHead(200);res.end("OK");try{const d=JSON.parse(b);if(!d.entry)return;for(const e of d.entry){if(!e.changes)continue;for(const c of e.changes){if(!c.value||!c.value.messages)continue;for(const m of c.value.messages){if(m.type!=="text")continue;send(m.from,M)}}}}catch(e){}});return}res.writeHead(405);res.end()}).listen(PORT,()=>console.log("Bot on "+PORT));
