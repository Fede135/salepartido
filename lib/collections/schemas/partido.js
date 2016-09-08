Partido = new Mongo.Collection("partido");

if (typeof Schema === 'undefined') Schema = {};

Schema.Partido = new SimpleSchema({

	nom_reserva:{
		type:String,	
	}
});

Partido.attachSchema(Schema.Partido);