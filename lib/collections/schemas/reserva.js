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
