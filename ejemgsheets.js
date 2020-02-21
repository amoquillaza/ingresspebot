const comando=require('./gsheets');
const fs = require('fs');

//recargar archivos
comando.init();

//lectura
     fs.readFile('meme.comm.txt', (err, content) => {
        if (err) return console.log('Error loading meme.comm file:', err);
	    var memeFILE=content.toString().split(";");
	    var msgMEME=memeFILE[1];
		console.log(msgMEME);
	 });