Recintos = new Mongo.Collection("recintos");

if (typeof Schema === 'undefined') Schema = {};

Schema.Recintos = new SimpleSchema({

	ownerId:{
		type: String,
		autoValue: function(){
      		if(this.isInsert){
        		return Meteor.userId();
      		}
    	}
	},

		
	nombre_recinto:{
		type: String,
		label: "Nombre del recinto*",
		max: 30,
    	unique: true,
	},
	
	estado_recinto: {
            type: String,
            autoValue: function() {
      		if (this.isInsert) {
        		return "Habilitado";
     		}
  		},
    },

	direccion_recinto:{
		type: String,
		max: 50,
		label: "Dirección del recinto*",
	},

	telefono_recinto:{
		type: Object,
		
	},
	
	'telefono_recinto.teléfono_fijo':{
		type: Number,
		min:100000,
		label: "Teléfono fijo del recinto*",
		
	},

	'telefono_recinto.celular_1':{
		type: Number,
		optional: true,
		min: 100000,
		label: "Teléfono celular del recinto (I)",
	},

	'telefono_recinto.celular_2':{
		type:Number,
		optional: true,
		min: 100000,
		label: "Teléfono celular del recinto (II)",
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
    	},
    	label: "Estacionamiento*",
	},

	'servicios.baños':{
		type:String,
		allowedValues: ["SI","NO"],
		autoform: {
      		afFieldInput: {
        		firstOption: "(Seleccione si el recinto cuenta o no con baños)"
      			}
    	},
    	label: "Baños*",
	},

	'servicios.camarines':{
		type:String,
		allowedValues: ["SI","NO"],
		autoform: {
      		afFieldInput: {
        		firstOption: "(Seleccione si el recinto cuenta o no con camarines)"
      			}
    	},
    	label: "Camarines*",
	},

	'servicios.cantina':{
		label : "Cantina",
		type:String,
		allowedValues: ["SI","NO"],
		autoform: {
      		afFieldInput: {
        		firstOption: "(Seleccione si el recinto cuenta o no con cantina)"
      			}
    	},
    	label: "Cantina*",
	},

	createdAt: {
    	type: Date,
    	autoValue: function() {
      		if (this.isInsert) {
        		return new Date();
     		}
  		},
	},

	createdAtString: {
    	type: String,
    	autoValue: function() {
      		if (this.isInsert) {
        		var dia = new Date();
      			var diaMoment = moment(dia, 'DD/MM/YYYY', true).format('L');
			return diaMoment;      			
     		}
  		},
	},

	imagen1_id :{
		type: String,
		optional: true,
		autoform: {
			type: "cfs-file",
			collection: "images",
			placeholder: 'Click para subir una imagen.Tamaño máximo 2Mb'
		},
		label: "Imágen 1",
	},

	imagen2_id :{
		type: String,
		optional: true,
		autoform: {
			type: "cfs-file",
			collection: "images",
			placeholder: 'Click para subir una imagen.Tamaño máximo 2Mb'
		},
		label: "Imágen 2",

	},

	imagen3_id :{
		type: String,
		optional: true,
		autoform: {
			type: "cfs-file",
			collection: "images",
			placeholder: 'Click para subir una imagen.Tamaño máximo 2Mb'
		},
		label: "Imágen 3",
	},

	imagen4_id :{
		type: String,
		optional: true,
		autoform: {
			type: "cfs-file",
			collection: "images",
			placeholder: 'Click para subir una imagen.Tamaño máximo 2Mb'
		},
		label: "Imágen 4",
	},

});

Recintos.attachSchema(Schema.Recintos);
