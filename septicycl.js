// fuente: https://septicycl.es/#
const moment = require('moment');
			var EPOCH = 1389150000000;
			var CYCLE_LENGTH = 630000000;
			var CHECKPOINT_LENGTH = 18000000;
			var cycle;
			var currentCycle;
//			const windowlocationhash = '#utc';
			const windowlocationhash = '#lima';
			var hora;
			var fecha;
			var jsonresponse;
			var UTC = false;
			function init() {
				UTC = !!(windowlocationhash === '#utc');
				if (!cycle) {
					cycle = currentCycle = Math.floor((new Date().getTime() - EPOCH) / CYCLE_LENGTH);
				}
				showCycle(0);
				tick();
				return [jsonresponse, hora, fecha];
			}
			function showCycle(delta) {
				cycle += delta;
				jsonresponse = calcCycle(cycle);
//				console.log(jsonresponse);
			}
                        function calcCycle(cycle) {
                                var start = new Date();
                                var now = start.getTime();
                                var year = formatDate(start, 'YYYY');
                                var cycleDisplay = cycle+1;
                                start.setTime(EPOCH + (cycle*CYCLE_LENGTH));
                                year = formatDate(start, 'YYYY');
                                start.setTime(start.getTime()+CHECKPOINT_LENGTH); // No measurement is taken until the first checkpoint after rollover.
                                var checkpoints = [];
                                for (var i=0;i<35;i++) {
                                        var next = isNext(start, now);
                                        checkpoints[i] = {
                                                date: formatDate(start, 'ddd D MMM') + (UTC ? ' UTC' : ''),
                                                time: formatDate(start, 'HH:mm'),
                                                classes: (next ? 'next' : (start.getTime() < now ? 'past' : 'upcoming')) + (i==34 ? ' final' : ''),
                                                next: next
                                        };
                                        start.setTime(start.getTime()+CHECKPOINT_LENGTH);
                                }
                                if (year > 2014) {
                                        var yearEnd = new Date(year-1, 11, 31, 23, 59);
                                        var lastCycle = Math.floor((yearEnd.getTime() - EPOCH) / CYCLE_LENGTH);
                                        cycleDisplay = cycle - lastCycle;
                                }
				if (cycleDisplay < 10) {
					cycleDisplay = '0'+cycleDisplay;
				}
                                return {cycle: year+'.'+(cycleDisplay), checkpoints:checkpoints, current:(cycle == currentCycle)};
                        }
			function isNext(start, now) {
				return (start.getTime() > now && (now + CHECKPOINT_LENGTH) > start.getTime());
			}
			function formatDate(date, format) {
				if (UTC) {
					return moment(date).utc().format(format);
				}
				//formato español de fecha
				moment.locale('es');
				return moment(date).format(format);
			}
			function tick() {
				hora = formatDate([], 'HH:mm');
//				console.log(hora);
				fecha = formatDate([], 'ddd D MMM'); 
//				console.log(fecha);
			}
			//window.setInterval(tick, 1000);
exports.init=init;
exports.hora=hora;
exports.fecha=fecha;
//exports.jsonresponse=jsonresponse;
