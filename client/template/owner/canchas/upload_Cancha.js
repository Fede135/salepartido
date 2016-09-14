Template.uploadCancha.helpers({
	recinto: function () {
		//Me busca los recintos del usuario logueado.
		var recinto = Recintos.findOne({ownerId:Meteor.userId()})
		var r = recinto._id;
			return r;
		
	},
});