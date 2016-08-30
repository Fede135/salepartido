Template.showProfile.helpers({
  user : function(){
    return Meteor.user();
  },

  place : function() {
    var user = Meteor.user();
    var profile = user && user.profile;
    var locality = profile && profile.country && profile.country.locality;
    var province = profile && profile.country && profile.country.province;
    var country = profile && profile.country && profile.country.country;
    var place = country && (locality + ", " + province + ", " + country + ".");

    return place;
  },

  age : function(){
    var user = Meteor.user();
    var profile = user && user.profile;
    var birth = profile && profile.birthday;
    var today = new Date();
    var diffMs = birth && Math.abs(today.getTime() - birth.getTime());
    var diffDays = diffMs && Math.ceil(diffMs / (1000*3600*24));
    var age = diffDays && ("Edad: " + Math.floor(diffDays / 361));

    return age;
  }

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
