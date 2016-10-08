

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

Meteor.publish('users', function(){
	
	return Meteor.users.find({'roles.__global_roles__': ['player']});
});

Meteor.publish('notifications', function() {
	return Notifications.find();
});

Meteor.publish('commentsForPlayers', function() {
	return CommentsForPlayers.find();
})