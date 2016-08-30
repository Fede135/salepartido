Template.showProfile.helpers({
	user : function(){
		return Meteor.user();
	},
  place : function() {
		var user = Meteor.user();
		var locality = user.profile.country.locality;
		var province = user.profile.country.province;
		var country = user.profile.country.country;  
		var place = locality+", "+province +", "+country+".";
		return place;
	},
	age : function(){
		 var birth = Meteor.user().profile.birthday;
		 var today = new Date();
		 var diffMs = Math.abs (today.getTime() - birth.getTime());
		 var diffDays = Math.ceil(diffMs / (1000*3600*24));
		 var age = "Edad: " + Math.floor(diffDays / 361);
		return age;
	},

	/*today : function (){
		return new Date(); 
	},
	ownProfile: function () {
		return this.userId === Meteor.userId();
	},
	comments: function () {
		return commentsForPlayers.find();
	}*/

});



Template.showProfile.events({
	'click #login-buttons-edit-profile': function(event) {
		Router.go('editProfile', {_id: Meteor.userId()});
	}
});
