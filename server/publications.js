Meteor.publish('reservasUsuario', function(idUsuario){

	check(idUsuario,String);
	return Reserva.find({'usuarioId':idUsuario, 'estado': "Reservada"});
});

Meteor.publish('reservasDueno', function(idRecinto){

	check(idRecinto,String);
	
	var recintoId = idRecinto;
	var recinto = recintoId && Recintos.findOne({'_id': recintoId});
	var nombRecinto = recinto && recinto.nombre_recinto;
	var reservas = nombRecinto && Reserva.find({'nom_recinto':nombRecinto, 'estado': "Reservada"});	
		
	return reservas;
});

Meteor.publish('reserva', function(reservaId){

	check(reservaId,String);
	return Reserva.find({'_id':reservaId});
});

Meteor.publish('reservas', function(){

	return Reserva.find();
});

Meteor.publish('partido', function(idPartido){

	check(idPartido,String);
	return Partido.find({'_id':idPartido});
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