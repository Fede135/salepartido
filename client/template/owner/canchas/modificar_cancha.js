Template.modificarCancha.helpers({

	recinto: function () {
		
		if (this._id === Recintos.ownerId) {
			recintoz = Recintos.findOne({ownerId: Meteor.userId()});
			p = recintoz._id;
			return recintoz;
		}
	},

	canchas: function () {
		return Canchas.find({recintoId:"HnA3G5Fqf532eyFpd"});
		//no se si es el find() o que, por esto"HnA3G5Fqf532eyFpd"deberia ir recintoz._id 
	},

	cantJugadores: function(){
		return ["5 vs 5","6 vs 6","7 vs 7","11 vs 11"].map((el) => ({label: el, value: el}));
	},

	tipoCancha : function(){
		return ["Cesped Sintetico","Cesped Natural","Baldosa","Tierra"].map((al) => ({label: al, value: al}));
	},

	estadoCancha : function(){
		return ["Habilitada","No Habilitada","Mantenimiento"].map((ol) => ({label: ol, value: ol}));
	},

	updateFormName: function () {
            return "updateOrgForm-" + this._id;
        },

	countCanchas: function (){
		return Canchas.find({recintoId:"HnA3G5Fqf532eyFpd"}).count();
	},

	
});

//mostrar canchas que le pertenecen al recinto, del usuario logeado