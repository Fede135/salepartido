Template.cargarCancha.helpers({
	recinto: function () {
		if (Meteor.userId() === this.userId()) {
			return Recintos.find();
		}
	}
});