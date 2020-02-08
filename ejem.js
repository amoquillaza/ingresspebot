const septicycl=require('./septicycl');
const [jsonresponse, hora, fecha] = septicycl.init();
const cycle = jsonresponse.cycle;
const checkpoints = jsonresponse.checkpoints;
console.log(checkpoints);
console.log("Siendo las " + hora + " " + fecha + ", estamos en el ciclo " + cycle);
console.log("Proximos checkpoints:");
for(var i=0;i<checkpoints.length;i++){
	if(checkpoints[i].classes=='next'||checkpoints[i].classes=='upcoming'||checkpoints[i].classes=='upcoming final'){
   	   console.log("Fecha: " + checkpoints[i].date + ". Hora: " + checkpoints[i].time);
	}
}

