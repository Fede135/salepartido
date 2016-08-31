Recintos = new Mongo.Collection("recintos");

if (typeof Schema === 'undefined') Schema = {};

Schema.Recintos = new SimpleSchema({

	
	nombre_recinto:{
		type: String,
		label: "Nombre del recinto"
	},

	direccion_recinto:{
		type: String,
		label: "Direccion del recinto"
	},

	telefono_recinto:{
		type: Object,
		
	},

	'telefono_recinto.numero_fijo':{
		type:String
		
	},

	'telefono_recinto.celular_1':{
		type: String,
		optional: true,
	},

	'telefono_recinto.celular_2':{
		type:String,
		optional: true,
	},

	servicios:{
		type: Object,
	},

	'servicios.estacionamiento':{
		type:String,
		allowedValues: ["SI","NO"],
		autoform: {
      		afFieldInput: {
        		firstOption: "(Seleccione si cuenta o no con estacionamiento)"
      			}
    	}
	},

	'servicios.baños':{
		type:String,
		allowedValues: ["SI","NO"],
		autoform: {
      		afFieldInput: {
        		firstOption: "(Seleccione si el recinto cuenta o no con baños)"
      			}
    	}
	},

	'servicios.camarines':{
		type:String,
		allowedValues: ["SI","NO"],
		autoform: {
      		afFieldInput: {
        		firstOption: "(Seleccione si el recinto cuenta o no con camarines)"
      			}
    	}
	},

	'servicios.cantina':{
		label : "Cantina",
		type:String,
		allowedValues: ["SI","NO"],
		autoform: {
      		afFieldInput: {
        		firstOption: "(Seleccione si el recinto cuenta o no con cantina)"
      			}
    	}
	},

	createdAt: {
    	type: Date,
    	autoValue: function() {
      		if (this.isInsert) {
        		return new Date();
     }
  },
},

	imagen1_id :{
		type: String,
		optional: true,
		autoform: {
			type: "cfs-file",
			collection: "images"
		}
	},

	imagen2_id :{
		type: String,
		optional: true,
		autoform: {
			type: "cfs-file",
			collection: "images"
		}
	},

	imagen3_id :{
		type: String,
		optional: true,
		autoform: {
			type: "cfs-file",
			collection: "images"
		}
	},

	imagen4_id :{
		type: String,
		optional: true,
		autoform: {
			type: "cfs-file",
			collection: "images"
		}
	},

	canchas_recinto :{
		type: Schema.Canchas,

      		
    	},

   /* 'canchas_recinto.$' :{
		type: Schema.Canchas,

      		
    	},*/

	

});

Recintos.attachSchema(Schema.Recintos);
