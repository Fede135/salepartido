/*Reserva = new Mongo.Collection("reserva");

if (typeof Schema === 'undefined') Schema = {};

Schema.Canchas = new SimpleSchema({

	nombre_usuario:{
		type: String,
		value: Meteor.users().name;
	},
	
	fecha_de_creacion:{
		type: Date,
		autoValue: function() {
      				if (this.isInsert) {
        			return new Date();
     				}
  				},
	},	

	estado_reserva:{
    type:Object,
 	 },

    'estado_reserva.estado_de_reserva':{
     type : String,    
     allowedValues: ["Reservada","Suspendida"],
 	 },

});*/