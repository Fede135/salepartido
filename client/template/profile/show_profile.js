Template.showProfile.helpers({
  user : function(){
    return Meteor.users.findOne({_id: this._id});
  },

  place : function() {
    var user = Meteor.users.findOne({_id: this._id});
    var profile = user && user.profile;
    var locality = profile && profile.country && profile.country.locality;
    var province = profile && profile.country && profile.country.province;
    var country = profile && profile.country && profile.country.country;
    var place = country && (locality + ", " + province + ", " + country + ".");

    return place;
  },

  age : function(){
    var user = Meteor.users.findOne({_id: this._id});
    var profile = user && user.profile;
    var birth = profile && profile.birthday;
    var today = new Date();
    var diffMs = birth && Math.abs(today.getTime() - birth.getTime());
    var diffDays = diffMs && Math.ceil(diffMs / (1000*3600*24));
    var age = diffDays && ("Edad: " + Math.floor(diffDays / 361));

    return age;
  },

  ownProfile: function () {
    return this._id === Meteor.userId();    
  },
  amigos: function () {
    friends= Friends && Friends.find();
/*    a= Meteor.users.findOne({'services.facebook.id': friends.id});
    console.log(a._id); hacer cn el fb del tch*/
    return friends;
  }
});

Template.showProfile.events({
  'click #login-buttons-edit-profile': function(event) {
		Router.go('editProfile', {_id: Meteor.userId()});
	}
});