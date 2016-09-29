Template.editCancha.helpers({

	canchasRecinto : function(){
		idCancha= this._id;
		var canchas = Canchas.findOne({_id:idCancha});
			console.log(canchas);
			return canchas;

	},

	// Todo esto es para mostrar los valores guardados en cancha
	cantJugadores: function(){
	 	return ["5 vs 5","6 vs 6","7 vs 7","11 vs 11"].map((el) => ({label: el, value: el}));
	 },

	 tipoCancha : function(){
	 	return ["Césped Sintético","Césped Natural","Baldosa","Tierra","Parquet"].map((al) => ({label: al, value: al}));
	 },

	 estadoCancha : function(){
	 	return ["Habilitada","No Habilitada","Mantenimiento"].map((ol) => ({label: ol, value: ol}));
	 },

	 updateFormName: function () {
            return "updateOrgForm-" + this._id;
         },
});
	

Template.editCancha.events({
	'click #actualizarCancha': function() {
	    alert("Cancha actualizada!!");
	      Router.go('gestionCancha',{_id:this.recintoId});
	    	
	    	
	},


});
	