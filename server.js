var http = require("http");
var https = require("https");
var VT = "adr_contabil_webhook_2026";
var TK = "EAAXaiCKHRJwBRFZBBDer4k0hrgC6EbHKVS1MHQKSMRSOJloDLSqbVCWxx8zjhHT9Gq87m7nca24kKj3mNFAi831OsagZBvCBAZBrsy73ZCfNlca4ozjXJMDkbJnZAeBHZA9O78107z7RxBwZAjY1oH17NptG3oaSjvsBJbtup379MHv4CSHIU8pcf28GZBdZAqwZDZD";
var PH = "1067629079762673";
var PT = process.env.PORT || 3000;
var N = String.fromCharCode(10);
var MENU = ["Ola! Bem-vindo a *A.D.R. Contabilidade e Pericias Contabeis*.","","Sou *ADENILSON DIAS RIBEIRO*:","Advocacia OAB/MG 218018","Contabilidade CRC/MG 111185","Pericia Judicial","","Escolha uma opcao:","","1 Advocacia","2 Contabilidade","3 Pericia","4 IRPF","5 Certidoes","6 Agendamento","7 Atendente"].join(N);
var R1 = ["*Advocacia e Consultoria Juridica*","","- Direito Civil e Empresarial","- Direito Trabalhista","- Direito Tributario","- Contratos e Pareceres","","OAB/MG 218018","","Digite 6 para agendar ou menu para voltar"].join(N);
var R2 = ["*Contabilidade e Impostos*","","- Abertura de Empresas","- Escrituracao Contabil e Fiscal","- Planejamento Tributario","- MEI, Simples, Lucro Presumido","","CRC/MG 111185","","Digite 6 para agendar ou menu para voltar"].join(N);
var R3 = ["*Pericia Contabil / Judicial*","","- Perito Judicial","- Perito Assistente","- Pericia Extrajudicial","- Laudo Pericial Contabil","","Digite 6 para agendar ou menu para voltar"].join(N);
var R4 = ["*IRPF - Imposto de Renda*","","- Declaracao Completa e Simplificada","- Retificacao","- Malha Fina","- Carne-Leao","","Digite 6 para agendar ou menu para voltar"].join(N);
var R5 = ["*Certidoes e Documentos*","","- CND","- Regularidade Fiscal","- FGTS","- Justica Federal/Estadual","","Digite 6 para agendar ou menu para voltar"].join(N);
var R6 = ["*Agendamento de Consulta*","","Informe:","- Nome completo","- Assunto","- Dia e horario","","Seg a Sex: 8h as 18h","Sao Cristovao - MG","Tel: (37) 98807-5561"].join(N);
var R7 = ["*Falar com Atendente*","","Aguarde que responderemos em breve.","Seg a Sex: 8h as 18h","Tel: (37) 98807-5561"].join(N);
var FB = ["Nao entendi. Escolha uma opcao:","","1 Advocacia","2 Contabilidade","3 Pericia","4 IRPF","5 Certidoes","6 Agendamento","7 Atendente"].join(N);
function send(to, txt) {
var b = JSON.stringify({messaging_product:"whatsapp",to:to,type:"text",text:{body:txt}});
var o = {hostname:"graph.facebook.com",path:"/v21.0/"+PH+"/messages",method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+TK,"Content-Length":Buffer.byteLength(b)}};
var r = https.request(o, function(){});
r.on("error", function(){});
r.write(b);
r.end();
}
function reply(txt) {
var t = txt.trim().toLowerCase();
if (t==="1") return R1;
if (t==="2") return R2;
if (t==="3") return R3;
if (t==="4") return R4;
if (t==="5") return R5;
if (t==="6") return R6;
if (t==="7") return R7;
if (t==="menu"||t==="oi"||t==="ola"||t==="inicio"||t==="bom dia"||t==="boa tarde"||t==="boa noite") return MENU;
return FB;
}
http.createServer(function(req, res) {
if (req.method==="GET") {
var u = new URL(req.url,"http://l:"+PT).searchParams;
if (u.get("hub.mode")==="subscribe"&&u.get("hub.verify_token")===VT) {res.writeHead(200);res.end(u.get("hub.challenge"));return;}
res.writeHead(200);res.end("OK");return;
}
if (req.method==="POST") {
var body="";
req.on("data",function(c){body+=c;});
req.on("end",function(){
res.writeHead(200);res.end("OK");
try{var d=JSON.parse(body);if(!d.entry)return;d.entry.forEach(function(e){if(!e.changes)return;e.changes.forEach(function(c){if(!c.value||!c.value.messages)return;c.value.messages.forEach(function(m){if(m.type==="text"){send(m.from,reply(m.text.body))}});});});}catch(e){}
});return;
}
res.writeHead(405);res.end();
}).listen(PT,function(){console.log("Bot on "+PT);});
