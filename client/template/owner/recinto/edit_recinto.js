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

	onSuccess: function () {
      return function (result) { 
      	alert("Recinto actualizado"); console.log(result);
      	 };
      },
});
