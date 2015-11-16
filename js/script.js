$(function()
{
	// para que pueda ser dinamico usar numeros con raices exactas ej 100 225 121 para que la matriz quede cuadrada
	var cantNumeros = 121;

	//arreglo de objetos para almacenar numeros y propiedades...
	numeros = [{ 	
					"numero" 		: 1,
					"salio"  		: "no",
					"seleccionado" : "no"
			  }];

	//llena nuestro vector de objetos con los numeros y 2 propiedades mas (para saber si ya salío y para saber si ya fue seleccionado)...
	var creaNumeros = (function creaNumeros()
	{
		//hace un push en nuestro vector de objetos desde el 2 por que el 1 ya lo quemamos en el codigo...
		for (var i = 2; i < cantNumeros+1; i++) {
			numeros.push({numero:i,salio:"no",seleccionado:"no"});
		};
	})();	
	// se crea una variable string para almacenar la tabla...
	var tabla="";
	
	//se crea la tabla dinamicamente con los id de cada campo 	
	var creaTabla = (function creaTabla()
	{		
		tabla+="<table>"		
		for (var i = 1; i < Math.sqrt(cantNumeros)+1; i++) {
			tabla += "<tr>";
			for (var j = 1; j < Math.sqrt(cantNumeros)+1; j++) 
			{					
				//debugger;
				random=Math.floor(Math.random()*cantNumeros)+1;
				numPone = numeros[random].salio=='no' ? numeros[random].numero : llenaTabla();
				tabla+="<td> <div id='numero_"+i+"_"+j+"' class='numero'>"+numPone+"</div></td>";
			};
			tabla+="</tr>";
		};
		$("#tabla").append(tabla);
	})();

	function llenaTabla()
	{		
		num = 1;
		random=Math.floor(Math.random()*122);
		if(numeros[random].salio=="no")
		{
			num = numeros[random].numero;
			console.log(num);
			numeros[random].salio="si";
		}		
		return num;
	};
	//Colores Aleatorios...
	var randomColor = function()
	{
    	// from http://www.paulirish.com/2009/random-hex-color-code-snippets/
    	return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
    	(c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);
  	};
});
