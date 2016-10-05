Meteor.publish('reserva', function(){

	return Reserva.find({'usuarioId':this.userId, 'estado': "Reservada"});
});

Meteor.publish('recintoPropio', function(){
	
	return Recintos.find({ownerId: this.userId});
});

Meteor.publish('reservaDueno', function(){
	
	return Reserva.find();
});