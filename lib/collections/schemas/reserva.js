Reserva = new Mongo.Collection("reserva");

if (typeof Schema === 'undefined') Schema = {};

Schema.Reserva = new SimpleSchema({

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
	      nom_recinto: String,
	      num_cancha: Number
    	});
	}
});