Template.showProfile.helpers({
  user : function() {
		return Meteor.user();
	},
	age : function(){
		 var birth = Meteor.user().profile.birthday;
		 var today = new Date();
		 var diffMs = Math.abs (today.getTime() - birth.getTime());
		 var diffDays = Math.ceil(diffMs / (1000*3600*24));
		 var age =  Math.ceil(diffDays / 360)
		return age;
	},

	today : function (){
		return new Date(); 
	},
});


Template.showProfile.events({
	'click #login-buttons-edit-profile': function(event) {
		Router.go('editProfile', {_id: Meteor.userId()});
	}
});
