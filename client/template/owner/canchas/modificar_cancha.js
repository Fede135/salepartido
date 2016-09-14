Template.modificarCancha.helpers({

	recinto: function () {
		recinto = Recintos.findOne({ownerId:Meteor.userId()});
		var nomb = recinto.nombre_recinto;
			return nomb;
		
	},

	
	canchas: function () {
		recinto = Recintos.findOne({ownerId:Meteor.userId()});
		var p = recinto._id;
			return Canchas.find({recintoId:p});
		//no se si es el find() o que, por esto"HnA3G5Fqf532eyFpd"deberia ir recintoz._id 
	},

	cantJugadores: function(){
		return ["5 vs 5","6 vs 6","7 vs 7","11 vs 11"].map((el) => ({label: el, value: el}));
	},

	tipoCancha : function(){
		return ["Cesped Sintetico","Cesped Natural","Baldosa","Tierra","Parquet"].map((al) => ({label: al, value: al}));
	},

	estadoCancha : function(){
		return ["Habilitada","No Habilitada","Mantenimiento"].map((ol) => ({label: ol, value: ol}));
	},

	updateFormName: function () {
            return "updateOrgForm-" + this._id;
        },

	countCanchas: function (){
		recinto = Recintos.findOne({ownerId:Meteor.userId()});
		var p = recinto._id;
		return Canchas.find({recintoId:p}).count();
	},

	
});

//mostrar canchas que le pertenecen al recinto, del usuario logeado