const TelegramBot = require('node-telegram-bot-api');
const weather = require('weather-js');
const token = require('./token');
const septicycl=require('./septicycl');

//inicializar bot
const bot = new TelegramBot(token, {polling: true});

const proxfsfecha="2020-02-01";
const proxfslugar="Por definir";
const proxeventonombre="Perpetua Hexathlon";
const proxeventofecha="2020-02-29";
const proxeventolugar="Lima";
const proxeventolink="https://community.ingress.com/en/discussion/8367/perpetua-hexathlon-event-detail-updates";
const urlevento = 'https://us.v-cdn.net/6031689/uploads/208/SBI6RXVNX0WR.jpg';

bot.on('message', function(msg){
    console.log(msg);
    var chatId = msg.chat.id;
    var username = msg.from.username;
 
if (msg.text.toString().toUpperCase() === "/START"){
    var msgSTART="";
    msgSTART+="Hola, " + username + " soy un bot y mi nombre es IngressPEBot\n";
    msgSTART+="Comandos disponibles:\n"+"/evento\n"+"/ciclo\n"+"/fs\n"+"/meme\n"+"/ubicacion\n"+"/tiempo\n";
	bot.sendMessage(chatId,msgSTART);
} else if (msg.text.toString().toUpperCase() === "/EVENTO"){
	var date_1 = new Date();
    var date_2 = new Date(proxeventofecha);
	//48600 es 13:30 del día del evento
    var diff_in_sec = ((date_2 - date_1)/1000 + 48600);
    var msgEVENTO="";  
    bot.sendPhoto(chatId, urlevento);	
	msgEVENTO+="Datos del proximo evento:\n";
    msgEVENTO+="Nombre: " + proxeventonombre + " Lugar: " + proxeventolugar + " Fecha: " + proxeventofecha + ". Faltan " + ddhhmmss(diff_in_sec)+"\n";
    msgEVENTO+="Mas informacion: " + proxeventolink;
	bot.sendMessage(chatId,msgEVENTO);

} else if (msg.text.toString().toUpperCase() === "/FS"){
	var date_1 = new Date();
    var date_2 = new Date(proxfsfecha);
    var diff_in_sec = (date_2 - date_1)/1000;
   bot.sendMessage(chatId, "Datos de proximo FS: Fecha: " + proxfsfecha + " Lugar: " + proxfslugar + ". Faltan " + ddhhmmss(diff_in_sec));

} else if (msg.text.toString().toUpperCase() === "/MEME"){
    bot.sendMessage(chatId, "Con el memero anonimo contactarte debes...");
	
} else if (msg.text.toString().toUpperCase() === "/CICLO"){
    const [jsonresponse, hora, fecha] = septicycl.init();
    const cycle = jsonresponse.cycle;
    const checkpoints = jsonresponse.checkpoints;
	var msgCICLO="";
    msgCICLO+="Siendo las " + hora + " " + fecha + ", estamos en el ciclo " + cycle + ".\nProximos checkpoints:\n";
	//!!!falta un IF en caso no se reciban datos
    for(var i=0;i<checkpoints.length;i++){
    	if(checkpoints[i].classes=='next'||checkpoints[i].classes=='upcoming'){
   	       msgCICLO+="Fecha: " + checkpoints[i].date + ". Hora: " + checkpoints[i].time + ".\n";
	    }    
    }
	bot.sendMessage(chatId,msgCICLO);
	
} else if (msg.text.toString().toUpperCase() === "/TIEMPO"){
	bot.sendMessage(chatId, "Consultando el tiempo atmosferico para Lima,PE...");
//    var ciudad = match[1];
    var ciudad = "Lima,PE";
	var opciones = {
      search: ciudad, // lugar es la ciudad que el usuario introduce
      degreeType: 'C', // Celsius
      lang: 'es-ES' // Lenguaje en el que devolverá los datos
    }
    weather.find(opciones, function(err, result){

        if (err){ // Si ocurre algun error...
            console.log(err); // ... nos lo muestra en pantalla

        } else {
            console.log(result[0]); // Visualizamos el primer resultado del array
            
            bot.sendMessage(chatId, "Lugar: " + result[0].location.name +
            "\n\nTemperatura: " + result[0].current.temperature + "ºC\n" +
            "Visibilidad: " + result[0].current.skytext + "\n" +
            "Humedad: " + result[0].current.humidity + "%\n" +
            "Dirección del viento: " + result[0].current.winddisplay + "\n"
            ,{parse_mode: 'Markdown'});

        }
    })	
	
} else if (msg.text.toString().toUpperCase() === "/UBICACION"){
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        [{text: 'Coordenadas', request_location: true}],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    }),
  };
  bot.sendMessage(chatId, 'Solicitando ubicacion (GPS)', opts);	
} else {
    bot.sendMessage(chatId, 'Mensaje recibido. Si no has recibido la respuesta esperada, puedes reportarlo.');
}

});

//no entra aquí, todo se resuelve en /UBICACION
bot.on('location', (msg) => {
  console.log(msg);	
  var chatId = msg.chat.id;
  var username = msg.from.username;
  bot.sendMessage(chatId, "Tus Coordenadas son las siguientes:\n" + "Lat: " + msg.location.latitude + " Lon: " + msg.location.longitude + "\n");  
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


