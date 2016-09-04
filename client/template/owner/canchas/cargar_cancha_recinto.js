Template.cargarCancha.helpers({
	recinto: function () {
		if (this._id === Recintos.ownerId) {
			recintoz = Recintos.find({ownerId: Meteor.userId()})
			return recintoz;
		}
	},

		
		
});
/*
	countCanchas: function(){
		recintoz = Recintos.find({ownerId: Meteor.userId()})
			return Canchas.find({recintoId : recintoz._id}).count();
	}
	

no puedo hacer q me busque las canchas con el recintoId que yo quiero..

*/

 