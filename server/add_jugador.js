Meteor.methods({
	addJugadores: function(elqueagrega,elagregado){
		check(elqueagrega, String);// id del usuario que esta agregando
		check(elagregado, String);//id del usuarios q quiere como amigo
		
		var agregado = Meteor.users.findOne({_id: elagregado});
		var correo = agregado.emails[0].address ;
		console.log(correo);
		console.log(elagregado);
		Meteor.users.update(elqueagrega,{
			$addToSet: {friends:{id: elagregado}}
		});
		
		
	},

});

//_.pluck (http://underscorejs.org/)
