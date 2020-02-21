const septicycl=require('./septicycl');
const [jsonresponse, hora, fecha] = septicycl.init();
const cycle = jsonresponse.cycle;
const checkpoints = jsonresponse.checkpoints;
console.log(checkpoints);
console.log(checkpoints.length);
console.log("Siendo las " + hora + " " + fecha + ", estamos en el ciclo " + cycle);
console.log("Proximos checkpoints:");
console.log(checkpoints[1].date.toLocaleString("es-MX"));
for(var i=0;i<checkpoints.length;i++){
	if(checkpoints[i].classes=='next'||checkpoints[i].classes=='upcoming'||checkpoints[i].classes=='upcoming final'){
   	   console.log("CP" + (i+1) + ": " + checkpoints[i].date + " Hora: " + checkpoints[i].time);
	}
}

