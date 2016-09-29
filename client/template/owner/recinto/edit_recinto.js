Template.editRecinto.helpers({

	recinto : function(){
		return Recintos.findOne({_id: this._id});
	},
	
	servEstacionamiento: function(){
		return ["SI","NO"].map((el) => ({label: el, value: el}));
	},

	servBaños : function(){
		return ["SI","NO"].map((al) => ({label: al, value: al}));
	},

	servCamarines : function(){
		return ["SI","NO"].map((ol) => ({label: ol, value: ol}));
	},

	servCantina : function(){
		return ["SI","NO"].map((ol) => ({label: ol, value: ol}));
	},

	updateFormName: function () {
            return "updateOrgForm-" + this._id;

        },

});


Template.editRecinto.events({
	'click #actualizarRecinto': function(error) {
		if(! error)
	        alert("Recinto actualizado correctamente.");
	},


});


/*
AutoForm.addHooks(
   'updateFormName',
  {
  after:{
    update: function (error, result) {
      if(! error)
        console.log(result);
        alert("Recinto actualizado correctamente.Nombre del recinto: ");
       
    }
  }
},
);
*/