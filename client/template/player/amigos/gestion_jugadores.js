Template.gestionJugadores.helpers({
	jugadores: function () {
		var user = Meteor.users.findOne({_id:Meteor.userId()});
		var arrayFriend = user.profile.friends;
		var arrayFriendUser = [];
		if(arrayFriend){			
			arrayFriend.forEach(function(e){
				var usu = Meteor.users.findOne({_id:e.id});
				arrayFriendUser.push(usu);
			})
			return arrayFriendUser;
		}else{
			return false;
		}

	}
});

Template.gestionJugadores.events({
	'click #eliminarJugador': function () {
		
		Meteor.users.update(Meteor.userId(),{ $pull: { friends: { id: this.id}}});
		alert('Ya lo eliminaste de tu lista de jugadores');
        
		
	}
});