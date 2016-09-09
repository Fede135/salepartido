Calificaciones = new Mongo.Collection('calificaciones');


Meteor.methods({

upvote: function(recintoId,rating) {	
	check(recintoId, String);
	check(rating, Number);
	var cali = Calificaciones.findOne({id_recinto: recintoId});
	if (_.include(cali.upvotes, this.userId)) 
		alert("Error: Ya ha calificado")   
		//explota cuando entra a este if..  
	Calificaciones.update(cali._id, {      
		$addToSet: {upvotes: this.userId},      
		$push: {votes: rating}   
	});  
}
});
//falta:sacar un promedio del array votes