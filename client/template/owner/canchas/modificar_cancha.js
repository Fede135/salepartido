Template.modificarCancha.helpers({
	canchas: function () {
		return Canchas.find();
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
		return Canchas.find().count();
	},
});