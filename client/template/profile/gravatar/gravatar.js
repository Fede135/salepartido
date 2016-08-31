Template.gravatar.helpers({
  url: function () {
    var user = Meteor.user();
    var grav = user.emails && Gravatar.imageUrl(_.first(user.emails).address);
    return grav;
  }

})
