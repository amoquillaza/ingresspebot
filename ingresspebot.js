const TelegramBot = require('node-telegram-bot-api');
const token = require('./token');
const bot = new TelegramBot(token, {polling: true});

bot.onText(/^\/start/, function(msg){
  console.log(msg);
  var chatId = msg.chat.id;
  var username = msg.from.username;
  bot.sendMessage(chatId, "Hola, " + username + " soy un bot y mi nombre es IngressPEBot");
});

bot.on('message', function(msg){
    console.log(msg);
    var chatId = msg.chat.id;
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Mensaje recibido.');
});



