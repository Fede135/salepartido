Meteor.methods({
	
calif: function(userId,rating,tipo) {	
	check(userId, String);
	check(rating, Number);
	check(tipo, String);
	console.log(tipo);
	switch(tipo){
		case "resistencia":
			var cali = Calificacion_resistencia.findOne({id_user: userId});
			if (_.include(cali.upvotes, this.userId)) 
				throw new Meteor.Error('invalid', 'El usuario ya ha calificado');	  

			Calificacion_resistencia.update(cali._id, {      
				$addToSet: {upvotes: this.userId},      
				$push: {votes: rating}   
			});  
			break;

		case "fairplay":
			var cali = Calificacion_fairplay.findOne({id_user: userId});
			if (_.include(cali.upvotes, this.userId)) 
				throw new Meteor.Error('invalid', 'El usuario ya ha calificado');	  

			Calificacion_fairplay.update(cali._id, {      
				$addToSet: {upvotes: this.userId},      
				$push: {votes: rating}   
			});  
			break;

		case "puntualidad":
				var cali = Calificacion_puntualidad.findOne({id_user: userId});
				if (_.include(cali.upvotes, this.userId)) 
					throw new Meteor.Error('invalid', 'El usuario ya ha calificado');	  

				Calificacion_puntualidad.update(cali._id, {      
					$addToSet: {upvotes: this.userId},      
					$push: {votes: rating}   
				});  
				break;

		case "burradas":
				var cali = Calificacion_burradas.findOne({id_user: userId});
				if (_.include(cali.upvotes, this.userId)) 
					throw new Meteor.Error('invalid', 'El usuario ya ha calificado');	  

				Calificacion_burradas.update(cali._id, {      
					$addToSet: {upvotes: this.userId},      
					$push: {votes: rating}   
				});  
				break

			//arquero
		case "reflejos":
			var cali = Calificacion_reflejo.findOne({id_user: userId});
			if (_.include(cali.upvotes, this.userId)) 
				throw new Meteor.Error('invalid', 'El usuario ya ha calificado');	  

			Calificacion_reflejo.update(cali._id, {      
				$addToSet: {upvotes: this.userId},      
				$push: {votes: rating}   
			});  
			break;

		case "atajadas":
			var cali = Calificacion_atajadas.findOne({id_user: userId});
			if (_.include(cali.upvotes, this.userId)) 
				throw new Meteor.Error('invalid', 'El usuario ya ha calificado');	  

			Calificacion_atajadas.update(cali._id, {      
				$addToSet: {upvotes: this.userId},      
				$push: {votes: rating}   
			});  
			break;
			//OTROS
			//
		case "pase":
			var cali = Calificacion_pase.findOne({id_user: userId});
			if (_.include(cali.upvotes, this.userId)) 
				throw new Meteor.Error('invalid', 'El usuario ya ha calificado');	  

			Calificacion_pase.update(cali._id, {      
				$addToSet: {upvotes: this.userId},      
				$push: {votes: rating}   
			});  
			break

		case "defensa":
			var cali = Calificacion_defensa.findOne({id_user: userId});
			if (_.include(cali.upvotes, this.userId)) 
				throw new Meteor.Error('invalid', 'El usuario ya ha calificado');	  

			Calificacion_defensa.update(cali._id, {      
				$addToSet: {upvotes: this.userId},      
				$push: {votes: rating}   
			});  
			break

		case "gambeta":
			var cali = Calificacion_gambeta.findOne({id_user: userId});
			if (_.include(cali.upvotes, this.userId)) 
				throw new Meteor.Error('invalid', 'El usuario ya ha calificado');	  

			Calificacion_gambeta.update(cali._id, {      
				$addToSet: {upvotes: this.userId},      
				$push: {votes: rating}   
			});  
			break

		case "remate":
			var cali = Calificacion_tiroalarco.findOne({id_user: userId});
			if (_.include(cali.upvotes, this.userId)) 
				throw new Meteor.Error('invalid', 'El usuario ya ha calificado');	  

			Calificacion_tiroalarco.update(cali._id, {      
				$addToSet: {upvotes: this.userId},      
				$push: {votes: rating}   
			});  
			break

		case "velocidad":
			var cali = Calificacion_velocidad.findOne({id_user: userId});
			if (_.include(cali.upvotes, this.userId)) 
				throw new Meteor.Error('invalid', 'El usuario ya ha calificado');	  

			Calificacion_velocidad.update(cali._id, {      
				$addToSet: {upvotes: this.userId},      
				$push: {votes: rating}   
			});  
			break

		default:
			alert("Error")

	};

}
});