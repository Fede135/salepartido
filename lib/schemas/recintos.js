Recintos = new Mongo.Collection("recintos");

Recintos.attachSchema(new SimpleSchema({

	
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

	'telefono_recinto.fijo':{
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
		type:String,
		allowedValues: ["SI","NO"],
		autoform: {
      		afFieldInput: {
        		firstOption: "(Seleccione si el recinto cuenta o no con cantina)"
      			}
    	}
	},

	imagenes_id :{
		type: String,
		optional: true,
		autoform: {
      		afFieldInput: {
        		type: "cfs-file",
        			collection: "Images"
      		}
    	}
	},
}));