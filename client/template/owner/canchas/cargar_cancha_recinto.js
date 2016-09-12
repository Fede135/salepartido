
Template.cargarCancha.events({

	'submit form': function(e) {

		e.preventDefault();

    	Router.go('gestionRecinto', );
    }
});
   

Template.cargarCancha.helpers({
	recinto: function () {
		//Me busca los recintos del usuario logueado.
		recinto = Recintos.find({ownerId: Meteor.userId()})
			return recinto;
		
	},

		
		


	countCanchas: function(){
		//busca las canchas de un determinado recinto(del user logueado)
		//si hago esto explota, creo q es porq recinto = Recintos.find({ownerId: Meteor.userId()})
		// puede traer mas de un recinto, y es la idea de que pueda tener mas de un recinte un usuario.
		//count = Canchas.find({recintoId : recinto._id}).count();
		// "HnA3G5Fqf532eyFpd"
		count = Canchas.find({recintoId : "HnA3G5Fqf532eyFpd"}).count();
			return count
	}

});	

//no puedo hacer q me busque las canchas con el recintoId que yo quiero..


 

