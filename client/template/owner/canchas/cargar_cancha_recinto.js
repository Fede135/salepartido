Template.cargarCancha.helpers({
	recinto: function () {
		if (this._id === Recintos.ownerId) {
			return Recintos.find({ownerId: Meteor.userId()});
		}
	},

	idRecinto : function(){
		var id = Recintos.find({ownerId: Meteor.userId()});
		return id._id;
	},
});

 