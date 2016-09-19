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
  /*amigos: function () {  //este es el metodo que va realmente. falta ver porque no se crea el array usuarios
    friends= Friends && Friends.find();
    var j = friends.count()-1; //uso esto xq el .length me da undefined
    var amigos = []; 
    for (var i=0; j; i++) {
      var fbid = friends.fetch()[i].id; //guardo el atributo id de lo que me manda fb de cada usuario para despues buscar en mi bd, ya que este id es unico
      var usuarios = Meteor.users.findOne({'services.facebook.id' : fbid});
      console.log("usuarios bd", usuarios);
      console.log("amigos antes", amigos);
      var amigos = amigos.push(usuarios);
      console.log("amigos despues", amigos);
    };
    return amigos;
  },*/
  amigos: function (){ //esto esta puesto para mostrarlo en clases, pero redirige a cualquier id
    friends= Friends && Friends.find();
    return friends;
  }
});


Template.showProfile.events({
  'click #login-buttons-edit-profile': function(event) {
		Router.go('editProfile', {_id: Meteor.userId()});
	}
});