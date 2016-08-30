Template.updateRecinto.helpers({
	recintos: function () {
		return Recintos.find();
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

	countRecintos: function (){
		return Recintos.find().count();
	},
});