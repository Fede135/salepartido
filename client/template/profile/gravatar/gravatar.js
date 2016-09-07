Template.gravatar.helpers({
  url: function () {
    var user = Meteor.user();
    if (! user.emails){
      var grav = Gravatar.imageUrl("salepartido2016@gmail.com");
    } else {
      var grav = Gravatar.imageUrl(_.first(user.emails).address, {
      default : Gravatar.imageUrl("salepartido2016@gmail.com")
      });    
    }    
    return grav;
  }

})
