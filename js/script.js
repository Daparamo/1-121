$(function () {
	$("#tabla").hide();
	// para que pueda ser dinamico usar numeros con raices exactas ej 100 225 121 para que la matriz quede cuadrada
	var cantNumeros = 0;
	//numero a adivinar...
	var numAdivina = 1;
	//adnimaciones...
	var animate = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "jello"];
	// se crea una variable string para almacenar la tabla...
	var tabla = "";
	var tiempoResultado = "";
	var dificultad = "";
	//Variable de ayudas...
	var ayuda = 3;

	//Variables del contador de tiempo...
	var tiempo = 0;
	var ss = 0;
	var hh = 0;
	var mm = 0;
	//Variable para sabér si yá inicio el juego...
	var iniciar = false;

	var numeros = [{
		"numero": 1,
		"salio": "no",
		"seleccionado": "no"
	}];
	$("#obj").html("Objetivo : " + numAdivina);
	//JSON para almacenar numeros y propiedades...


	//se crea un json con sonidos...
	var audios = [
		{
			sonido: "success.mp3",
			label: "success"
		},
		{
			sonido: "error.mp3",
			label: "error"
		},
		{
			sonido: "tada.mp3",
			label: "tada"
		}
	];
	var sound = true;
	//Se cargan los sonidos...				 
	for (var audio = 0; audio < audios.length; audio++) {
		createjs.Sound.registerSound("sounds/" + audios[audio].sonido, audios[audio].label);
	}
	$("#sound").click(function (event) {
		if (sound) {
			sound = false;
			$("#sound").removeClass('sound');
			$("#sound").addClass('nosound');
		}
		else {
			sound = true;
			$("#sound").removeClass('nosound');
			$("#sound").addClass('sound');
		}
	});

	//Boton inicia... Comienza a contár el tiempo
	$("#ayuda").click(function (event) {
		if (ayuda > 0 && (numAdivina != (cantNumeros))) {
			var aleatorio = Math.floor(Math.random() * animate.length);
			$("#numero_" + numAdivina).removeClass('numero');
			$("#numero_" + numAdivina).removeAttr('style');
			$("#numero_" + numAdivina).last().addClass("animated " + animate[aleatorio]);
			$("#numero_" + numAdivina).last().addClass('selected');
			numAdivina++;
			sound == true ? createjs.Sound.play("success") : console.log("nosound");
			$("#obj").html("Objetivo : " + numAdivina);
			ayuda--;
			$("#ayuda").html("Ayudas : " + ayuda);
			if (ayuda == 0) {
				$("#ayuda").fadeOut('slow', function () { });
			}
		}
		else {
			$("#numero_" + numAdivina).removeClass('numero');
			$("#numero_" + numAdivina).removeAttr('style');
			$("#numero_" + numAdivina).last().addClass("animated " + animate[aleatorio]);
			$("#numero_" + numAdivina).last().addClass('selected');
			ganaste();
			//swal("Ganaste", "lograste encotrar todos los numeros en: " + hh +" : "  + mm +" : "+ ss +" hh/mm/ss","success");
			sound == true ? createjs.Sound.play("tada") : console.log("nosound");

			clearInterval(tiempo);
		}
	});

	$("#inicio").click(function (event) {
		$("#inicio").hide();
		$("#selectGame").removeAttr('style');



	});
	$("#facil").click(function (event) {
		cantNumeros = 9;
		dificultad = "Fácil";
		creaNumeros();
		creaTabla();
		iniciar();
	});
	$("#medio").click(function (event) {
		cantNumeros = 49;
		dificultad = "Medio";
		creaNumeros();
		creaTabla();
		iniciar();
	});
	$("#dificil").click(function (event) {
		cantNumeros = 121;
		dificultad = "Difícil";
		creaNumeros();
		creaTabla();
		iniciar();
	});

	var iniciar = function () {
		iniciar = true;
		SeleccionaNumero();
		clearInterval(tiempo);
		ss = mm = hh = 0;
		tiempo = setInterval(function () {
			ss++;
			ss;
			$("#tiempo").html("Tiempo: " + hh + " : " + mm + " : " + ss);
			if (ss >= 60) {
				ss = 0;
				mm++
				$("#tiempo").html("Tiempo: " + hh + " : " + mm + " : " + ss);
				if (mm >= 60) {
					ss = 0;
					mm = 0
					hh++
					$("#tiempo").html("Tiempo: " + hh + " : " + mm + " : " + ss);
				}
			}
			tiempoResultado = hh + " : " + mm + " : " + ss;
		}, 1000);
	};

	//llena nuestro vector de objetos con los numeros y 2 propiedades mas (para saber si ya salío y para saber si ya fue seleccionado)...
	var creaNumeros = (function creaNumeros() {
		//hace un push en nuestro vector de objetos desde el 2 por que el 1 ya lo quemamos en el codigo...
		for (var i = 2; i < cantNumeros + 1; i++) {
			numeros.push({ numero: i, salio: "no", seleccionado: "no" });
		};
	});

	//se crea la tabla dinamicamente con los id de cada campo 	
	var creaTabla = (function creaTabla() {
		tabla += "<table id='table'>"
		for (var i = 1; i < Math.sqrt(cantNumeros) + 1; i++) {
			tabla += "<tr>";
			for (var j = 1; j < Math.sqrt(cantNumeros) + 1; j++) {
				numPone = llenaTabla();
				tabla += "<td><div id='numero_" + numPone + "' style = color:" + randomColor() + ";cursor:pointer; class='numero'> " + numPone + " </div></td>";
			};
			tabla += "</tr>";
		};
		$("#tabla").append(tabla);
	});

	var llenaTabla = function () {
		var num = 0;
		var random = 0;
		//Se debe iterar hasta que se encuentra que un nímero no ha salido...
		do {
			random = Math.floor(Math.random() * cantNumeros);
			if (numeros[random].salio == "no") {
				num = numeros[random].numero;
				numeros[random].salio = "si";
				break;
			}
		} while (1);
		return num;
	};

	//Funcion para Seleccionar Numero 
	var SeleccionaNumero = (function SeleccionaNumero() {
		if (iniciar) {
			$("#inicio").hide();
			$("#selectGame").hide();
			$("#tabla").show();
			$("#ayuda").removeAttr('style');
			for (var i = 0; i <= cantNumeros; i++) {
				$("#numero_" + i).click(function (event) {
					numSeleccion = this.id.split("_")[1];
					if (numAdivina != cantNumeros) {
						if (numeros[numSeleccion].seleccionado == "no" && this.id.split("_")[1] == numAdivina) {
							numAdivina++;
							var aleatorio = Math.floor(Math.random() * animate.length);
							$("#numero_" + this.id.split("_")[1]).removeClass('numero');
							$("#numero_" + this.id.split("_")[1]).removeAttr('style');
							$("#numero_" + this.id.split("_")[1]).last().addClass("animated " + animate[aleatorio]);
							$("#numero_" + this.id.split("_")[1]).last().addClass('selected');
							$("#obj").html("Objetivo : " + numAdivina);
							sound == true ? createjs.Sound.play("success") : console.log("nosound");
						}
						else {
							if (numAdivina < numSeleccion) {
								Swal.fire("Incorrecto", "Vuelve a intentar", "error");
								sound == true ? createjs.Sound.play("error") : console.log("nosound");
							}
						}
					}
					else {
						var aleatorio = Math.floor(Math.random() * animate.length);
						$("#numero_" + this.id.split("_")[1]).removeClass('numero');
						$("#numero_" + this.id.split("_")[1]).last().addClass("animated " + animate[aleatorio]);
						$("#numero_" + this.id.split("_")[1]).last().addClass('selected');
						$("#obj").html("Objetivo : " + numAdivina);


						// ganaste();


						Swal.fire({ title: "Ganaste", text: "lograste encotrar todos los numeros en: " + hh + " : " + mm + " : " + ss + " hh/mm/ss", confirmButtonText: "Reiniciar", cancelButtonText: "Salir", closeOnConfirm: true, showCancelButton: false, type: "success" }, function (isConfirm) {
							isConfirm ? location.reload() : window.close()
						});
						//swal("Ganaste", "lograste encotrar todos los numeros en: " + hh +" : "  + mm +" : "+ ss +" hh/mm/ss","success");
						sound == true ? createjs.Sound.play("tada") : console.log("nosound");
						clearInterval(tiempo);

					}
				});
			};
		}
	});
	// var ganaste = function () {
	// 	let data = {
	// 		name: 'Daniel',
	// 		tiempo: tiempoResultado,
	// 		dificultad: dificultad
	// 	};
	// 	Swal.fire({
	// 		title: 'Ganaste lograste encotrar todos los numeros en ' + tiempoResultado,
	// 		input: 'text',
	// 		inputAttributes: {
	// 			autocapitalize: 'off'
	// 		},
	// 		showCancelButton: false,
	// 		confirmButtonText: 'Guardar',
	// 		showLoaderOnConfirm: true,
	// 		preConfirm: (Nombre) => {
	// 			data.nombre = Nombre;
	// 			return fetch(`http://localhost:4000/resultados`, {
	// 				method: 'POST', // or 'PUT'
	// 				body: JSON.stringify(data), // data can be `string` or {object}!
	// 				headers: {
	// 					'Content-Type': 'application/json'
	// 				}
	// 			})
	// 				.then(response => {
	// 					if (!response.ok) {
	// 						throw new Error(response.statusText)
	// 					}
	// 					return response.json()
	// 				})
	// 				.catch(error => {
	// 					Swal.showValidationMessage(
	// 						`Request failed: ${error}`
	// 					)
	// 				})
	// 		},
	// 		allowOutsideClick: () => !Swal.isLoading()
	// 	}).then((result) => {
	// 		if (result.isConfirmed) {
	// 			mostrarResultados(result);
	// 		}
	// 	})
	// }

	var mostrarResultados = function (result) {

		var div_resultados = document.createElement("div");
		div_resultados.id = "div_resultados";
		var div1 = document.createElement("div");
		console.log(result.value);
		var i = 0;
		while (i < result.value.length && i < 10) {
			var fila = result.value[i];
			console.log(fila)
			var table = fila["nombre"] != "" ? `<div><span style="color:#00994C;" class="spn1">Nombre:</span><span class="link3">${fila["nombre"]}</span></div > ` : "";
			table += fila["Dificultad"] != "" ? `<div><span style="color:#00994C;" class="spn1">Dificultad:</span><span>${fila["dificultad"]}</span></div>` : "";
			table += fila["tiempo"] != "" ? `<div class="gr_pro"><span style="color:#00994C;" class="spn1">Tiempo:</span><span>${fila["tiempo"]}</span></div>` : "";
			var div1 = document.createElement("div");
			div1.innerHTML = table;
			$("#resultados").append(div1);
			i++;
		}
		$("#obj").attr("style","display:none;");
		$("#sound").attr("style","display:none;");
		$("#tiempo").attr("style","display:none;");
		$("#tabla").attr("style","display:none;");
		$("#resultados").removeAttr('style');
		
	}
	//Colores Aleatorios...
	function randomColor() {
		// from http://www.paulirish.com/2009/random-hex-color-code-snippets/
		return '#' + (function lol(m, s, c) {
			return s[m.floor(m.random() * s.length)] +
				(c && lol(m, s, c - 1));
		})(Math, '0123456789ABCDEF', 4);
	};

	//Funcion para desactivar Buscador del explorador chrome...
	$(window).keydown(function (e) { //Tomado de http://stackoverflow.com/questions/7091538/is-it-possible-to-disable-ctrl-f-of-find-in-page
		if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {
			e.preventDefault();
		}
	});
});
