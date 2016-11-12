Meteor.publish('reservas', function(){

	return Reserva.find();
});

Meteor.publish('recintos', function(){
	
	return Recintos.find({'estado_recinto': "Habilitado"});
});

Meteor.publish('recintosAll', function(){
	
	return Recintos.find();
});

Meteor.publish('commentsForEnclosure', function(){
	
	return CommentsForEnclosure.find();
});
Meteor.publish('commentsForPlayers', function(){
	
	return CommentsForPlayers.find();
});

Meteor.publish('canchas', function(){
	
	return Canchas.find({'estado_cancha.estado_de_cancha': {$ne: "Eliminada"}});
});

Meteor.publish('partidos', function(){
	
	return Partido.find();
});

Meteor.publish('user', function(){	
	return Meteor.users.find();
});

Meteor.publish('usersPlayer', function(){
	
	return Meteor.users.find({'roles.__global_roles__': ['player']});
});

Meteor.publish('imagenes', function(){

	return Images.find();
});

Meteor.publish('notifications', function() {
	return Notifications.find();
});

Meteor.publish('calificacion_resistencia', function(){
	return Calificacion_resistencia.find();
});

Meteor.publish('calificacion_fairplay', function(){

	return Calificacion_fairplay.find();
});

Meteor.publish('calificacion_puntualidad', function(){

	return Calificacion_puntualidad.find();
});

Meteor.publish('calificacion_burradas', function(){

	return Calificacion_burradas.find();
});

Meteor.publish('calificacion_reflejo', function(){

	return Calificacion_reflejo.find();
});

Meteor.publish('calificacion_atajadas', function(){

	return Calificacion_atajadas.find();
});

Meteor.publish('calificacion_pase', function(){

	return Calificacion_pase.find();
});

Meteor.publish('calificacion_defensa', function(){

	return Calificacion_defensa.find();
});

Meteor.publish('calificacion_gambeta', function(){

	return Calificacion_gambeta.find();
});


Meteor.publish('calificacion_tiroalarco', function(){

	return Calificacion_tiroalarco.find();
});

Meteor.publish('calificacion_velocidad', function(){

	return Calificacion_velocidad.find();
});

Meteor.publish('calificacion_conducta', function(){

	return Calificacion_conducta.find();
});
//recinto
Meteor.publish('calificaciones', function(){

	return Calificaciones.find();
});