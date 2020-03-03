const comando=require('./gsheets');
const fs = require('fs');

//recargar archivos
comando.init();

//lectura
     fs.readFile('meme.comm.txt', (err, content) => {
        if (err) return console.log('Error loading meme.comm file:', err);
	    let memeFILE=content.toString().split(";");
	    let msgMEME=memeFILE[1];
		console.log(msgMEME);
	 });
	 
	 fs.readFile('fs.comm.txt', (err, content) => {
        if (err) return console.log('Error loading fs.comm file:', err);
	    let fsFILE=content.toString().split(";");
	    let msgFS=fsFILE[1];
		let adicFS=fsFILE[2];
		let fechaFS = new Date(adicFS);
		let fechaHOY = new Date();
		console.log(fechaHOY.toDateString(), fechaFS.toDateString());
		if(fechaHOY>fechaFS){
			console.log('Aun falta');
		}else{
			console.log('Este es un msg generico xq el FS ya pasó');			
		}
		
	 });