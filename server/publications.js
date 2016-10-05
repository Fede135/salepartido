Meteor.publish('reservas', function(){

	return Reserva.find();
});

Meteor.publish('recintos', function(){
	
	return Recintos.find();
});

Meteor.publish('canchas', function(){
	
	return Canchas.find();
});

Meteor.publish('partidos', function(){
	
	return Partido.find();
});