Template.gravatar.helpers({
  url: function () {
    var user = Meteor.user();
    return Gravatar.imageUrl(_.first(user.emails).address);
  }

})
