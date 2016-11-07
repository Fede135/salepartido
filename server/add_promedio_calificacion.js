Meteor.methods({
	addPromedio: function(promedio,IdUser){
		check(promedio, Number);
		check(IdUser, String);
		var promedioString = promedio.toFixed(2);  
		Meteor.setTimeout(function () {
			Meteor.users.update(IdUser,{
				$set: {'profile.promedioGeneral':promedioString}
			});
			//console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADENTROOOOO')
		},15000);
		
		
	},

});
