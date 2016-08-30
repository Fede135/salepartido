cancha = new Mongo.Collection("cancha");

canchaSchema = new SimpleSchema({
	
	nCancha: {
		type: Number,
		label: "nCancha",
		max: 10
	},

	numeroDeCancha: {
		type: Number,
		label: "Identificador de la cancha",
		max: 10
	},

	luces: {
		type: Boolean,
		label: "¿Luces?",
		max: 5
	},
});

cancha.attachSchema(canchaSchema);
