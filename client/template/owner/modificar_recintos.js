Template.modificarRecinto.helpers({
	recinto: function () {
		return Recinto.find();
	},
	countRecintos: function (){
		return Recinto.find().count();
	},
	updateFormName: function () {
            return "updateOrgForm-" + this._id;
    },
});