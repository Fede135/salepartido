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

Meteor.publish('imagenes', function(){

	return Images.find();
});

Meteor.publish('usersPlayer', function(){
	
	return Meteor.users.find({'roles.__global_roles__': ['player']});
});

Meteor.publish('user', function(){
	
	return Meteor.users.find();
});