Meteor.methods({
	agregarJugadores: function(arrayAmigos,partidoId){
		check(arrayAmigos, Array);
		check(partidoId, String);
		arrayAmigos.forEach(function (jugador) {
			Partido.update(partidoId,{
			$push: {'invitados':jugador}
			});
			
		});	
	}
});