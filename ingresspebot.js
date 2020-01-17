const TelegramBot = require('node-telegram-bot-api');
const token = require('./token');
const bot = new TelegramBot(token, {polling: true});
const proxfsfecha="2020-02-01";
const proxfslugar="Por definir";
const proxeventonombre="Perpetua Hexathlon";
const proxeventofecha="2020-02-29";
const proxeventolugar="Lima";
const proxeventolink="https://community.ingress.com/en/discussion/8367/perpetua-hexathlon-event-detail-updates";

bot.on('message', function(msg){
    console.log(msg);
    var chatId = msg.chat.id;
    var username = msg.from.username;

if (msg.text.toString().toUpperCase() === "/START"){
    bot.sendMessage(chatId, "Hola, " + username + " soy un bot y mi nombre es IngressPEBot");
    bot.sendMessage(chatId, "Comandos disponibles: /evento /fs /meme");
} else if (msg.text.toString().toUpperCase() === "/EVENTO"){
	var date_1 = new Date();
    var date_2 = new Date(proxfsfecha);
    var diff_in_sec = (date_2 - date_1)/1000;
    bot.sendMessage(chatId, "Datos del proximo evento:");
    bot.sendMessage(chatId, "Nombre: " + proxeventonombre + " Lugar: " + proxeventolugar + " Fecha: " + proxeventofecha + ". Faltan " + ddhhmmss(diff_in_sec));
    bot.sendMessage(chatId, "Mas informacion: " + proxeventolink);
} else if (msg.text.toString().toUpperCase() === "/FS"){
	var date_1 = new Date();
    var date_2 = new Date(proxfsfecha);
    var diff_in_sec = (date_2 - date_1)/1000;
   bot.sendMessage(chatId, "Datos de proximo FS: Fecha: " + proxfsfecha + " Lugar: " + proxfslugar + ". Faltan " + ddhhmmss(diff_in_sec));
} else if (msg.text.toString().toUpperCase() === "/MEME"){
    bot.sendMessage(chatId, "Con el memero anonimo contactarte debes...");
} else {
    bot.sendMessage(chatId, 'Mensaje recibido. Si no has recibido la respuesta esperada, puedes reportarlo.');
}


});

function ddhhmmss (seconds) {
  var days = Math.floor(seconds / (3600*24));
  seconds  -= days*3600*24;
  var hrs   = Math.floor(seconds / 3600);
  seconds  -= hrs*3600;
  var mnts = Math.floor(seconds / 60);
  seconds  -= Math.floor(mnts*60);
  return days + " dias, " + hrs + " h, " + mnts + " m y " + seconds.toFixed(0) + " s.";
}


