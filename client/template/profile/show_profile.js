Template.showProfile.helpers({   //se busca el usuario del cual se esta viendo el perfil
  user : function(){
    return Meteor.users.findOne({_id: this._id});
  },

  place : function() {  // se buscan datos del usuario del cual se esta viendo el perfil
    var user = Meteor.users.findOne({_id: this._id});
    var profile = user && user.profile;
    var locality = profile && profile.country && profile.country.locality;
    var province = profile && profile.country && profile.country.province;
    var country = profile && profile.country && profile.country.country;
    var place = country && (locality + ", " + province + ", " + country + ".");

    return place;
  },

  age : function(){ //se calcula la edad del usuario del cual se esta viendo el perfil
    var user = Meteor.users.findOne({_id: this._id});
    var profile = user && user.profile;
    var birth = profile && profile.birthday;
    var today = new Date();
    var diffMs = birth && Math.abs(today.getTime() - birth.getTime());
    var diffDays = diffMs && Math.ceil(diffMs / (1000*3600*24));
    var age = diffDays && ("Edad: " + Math.floor(diffDays / 361));

    return age;
  },

  ownProfile: function () { //devuelve verdadero si el perfil es del usuario logeado, o falso sino lo es
    return this._id === Meteor.userId();
  },
  amigos: function () {  //este es el metodo que va realmente. falta ver porque no se crea el array usuarios
    var appFriends = FacebookFriends && FacebookFriends.find();
    var amigos = [];

    appFriends && appFriends.forEach(function (amigo) {
      var fbid = amigo.id; //guardo el atributo id de lo que me manda fb de cada usuario para despues buscar en mi bd, ya que este id es unico
      var usuario = Meteor.users.findOne({'services.facebook.id' : fbid});
      console.log("usuarios bd", usuario);
      console.log("amigos antes", amigos);
      amigos.push(usuario);
      console.log("amigos despues", amigos);
    });

    return amigos;
  },
  // amigos: function (){ //esto esta puesto para mostrarlo en clases, pero redirige a cualquier id
  //   friends= FacebookFriends && FacebookFriends.find();
  //   return friends;
  // }
});


Template.showProfile.events({  //al hacer click en el boton editar se redirige al template editProfile y se le pasa el _id del usuario del cual quiere editar su perfil
  'click #login-buttons-edit-profile': function(event) {
		Router.go('editProfile', {_id: Meteor.userId()});
   },
   'click #sendFriendRequest' : function(event) {
     Meteor.user({_id:this._id}).requestFriendship;
	 },
});

