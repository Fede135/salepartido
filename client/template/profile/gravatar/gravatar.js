Template.gravatar.helpers({
  url: function () {
    var user = Meteor.user();
    if (! user.emails){
      var grav = Gravatar.imageUrl("salepartido2016@gmail.com");
    } else {
      var grav = Gravatar.imageUrl(_.first(user.emails).address, $default='mm');
      //default ="http://s.gravatar.com/avatar/1567b6cae96b44db344754ec6bc57dd0?s=80"
    }    
    return grav;
  }

})
