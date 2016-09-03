Reserva = new Mongo.Collection("reserva");

if (typeof Schema === 'undefined') Schema = {};

Schema.Reserva = new SimpleSchema({

	nom_recinto:{
		type: String,
		label: "Nombre del recinto",
	},

	num_cancha:{
		type: Number,
		label: "Cancha elegida"
	},

	hora_de_juego:{
		type: String,
		label: "Hora elegida"
	},

	fecha_de_juego:{
		type: String,
		label: "Dia de juego"
	}
});

Reserva.attachSchema(Schema.Reserva);