Template.cargarCancha.helpers({
	recinto: function () {
		if (this._id === Recintos.ownerId) {
			recinto = Recintos.find({ownerId: Meteor.userId()})
			return recinto;
		}
	},

	
});

 