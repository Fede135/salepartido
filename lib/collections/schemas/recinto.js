Recinto = new Mongo.Collection("recinto");

Recinto.attachSchema(new SimpleSchema({

		nombreRecinto: {
		    type: String,
		    label: "Nombre del recinto",
			max: 100,
			autoform: {
		      	afFieldInput: {
		        firstOption: "(Campo obligatorio)"
		    	},
			},
		}, 
		direccion: {
		    type: String,
		    label: "Dirección del recinto",
		    max: 100,
			autoform: {
		      	afFieldInput: {
		        firstOption: "(Campo obligatorio)"
		    	},
			},    
		}, 
		altura: {
		    type: Number,
		    label: "Numeración de la calle",
		    min: 0,
		  }, 		 
		fechaDeRegistroAplicacion:{
			type: Date,
			defaultValue: new Date().getDate(),
		},
		fechaDeApertura:{
			type: Date,
			label:"Fecha de inaguración del recinto",
			autoform: {
		      	afFieldInput: {
		        firstOption: "(Campo obligatorio)"
		    	},
			},	
		},
}));
