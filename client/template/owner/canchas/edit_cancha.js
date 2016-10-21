Template.editCancha.helpers({

	canchasRecinto : function(){
		idCancha= this._id;
		canchas = Canchas.findOne({_id:idCancha});
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

	 updateCancha: function () {
            return "updateOrgForm-" + this._id;
         },
});
	

AutoForm.addHooks(
   'updateCancha',
  {
  after:{
    update: function (error, result) {    	
      if(! error){
       Session.set('alertCanchaEditada', true);
       Router.go('gestionCancha', {_id: canchas.recintoId });
       }
    }
  }
},
);
