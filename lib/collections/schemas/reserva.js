Reserva = new Mongo.Collection("reserva");

if (typeof Schema === 'undefined') Schema = {};

Schema.Reserva = new SimpleSchema({

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

Reserva.attachSchema(Schema.Reserva);

validateReserva = function (reserva) {
		  var errors = {};
		  if (reserva.nom_reserva.length>50)
		    errors.nombreDeLaReserva = "Solo se admiten 50 caracteres solamente ";
		  if (!reserva.nom_reserva)
		    errors.nombreDeLaReserva = "Nombre de la reserva";
		  if (!reserva.nom_recinto)
		    errors.nombreRecinto = "Seleccione un recinto";
		  if (!reserva.num_cancha)
		    errors.nombreCancha =  "Seleccione una cancha";		  
		  return errors;
},


Meteor.methods({	

	reservaInsert : function(reservaAttributes) {
	    check(this.userId, String);
	    check(reservaAttributes, {
	      nom_reserva: String,
	      nom_recinto: String,
	      num_cancha: Number
    	});
	}
});