Partido = new Mongo.Collection("partido");

if (typeof Schema === 'undefined') Schema = {};

Schema.Partido = new SimpleSchema({

	reserva_id:{
		type:String
	},

	equipoA:{
		type: [Schema.Jugador],
		optional: true,
	},
	
	equipoB:{
		type: [Schema.Jugador],
		optional: true,
	}
});

Partido.attachSchema(Schema.Partido);

if (typeof Schema === 'undefined') Schema = {};

Schema.Jugador = new SimpleSchema({	

	userId: {
		type: String,

	},

	nombre: {
		type: String,
	}

});

// Partido.update(partido._id, { $addToSet: { 'equipoA': { userId: this.id, nombre: this.nombre } } })