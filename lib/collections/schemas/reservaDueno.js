Reservadueno = new Mongo.Collection("reservadueno");

if (typeof Schema === 'undefined') Schema = {};

Schema.Reservadueno = new SimpleSchema({

	nom_reserva:{
		type:String,
		max: 50
	},

	nom_usario:{
		type:String		
	},

	nom_recinto:{
		type: String,
		label: "Nombre del recinto",
	},	

	num_cancha:{
		type: Number,
		label: "Cancha elegida",
		min: 0
	},

	hora_de_juego:{
		type: Number,
		label: "Hora elegida"
	},

	fecha_de_juego:{
		type: String,
		label: "Dia de juego"
	}
});

Reservadueno.attachSchema(Schema.Reservadueno);

validateReservadueno = function (reservadueno) {
		  var errors = {};
		  if (reservadueno.nom_reserva.length>50)
		    errors.nombreDeLaReserva = "Solo se admiten 50 caracteres solamente ";
		  if (!reservadueno.nom_reserva)
		    errors.nombreDeLaReserva = "Coloque un nombre para la reserva";
		  if (reservadueno.nom_usario.length>50)
		    errors.nombreDelCliente = "Solo se admiten 50 caracteres solamente ";
		  if (!reservadueno.nom_usario)
		    errors.nombreDelCliente = "Coloque un nombre para la reserva";  		  
		  if (!reservadueno.num_cancha)
		    errors.nombreCancha =  "Seleccione una cancha";
		  if (!reservadueno.nom_recinto)
		    errors.nombreRecinto = "Seleccione un recinto";  		  
		  return errors;
};