Template.cargarCancha.helpers({
	recinto: function () {
		if (this._id === Recintos.ownerId) {
			recintoz = Recintos.find({ownerId: Meteor.userId()})
			return recintoz;
		}
	},

		
		
/*

	countCanchas: function(){
		count = Canchas.find({recintoId : recintoz._id}).count();
			return count
	}
*/
});	

//no puedo hacer q me busque las canchas con el recintoId que yo quiero..


 