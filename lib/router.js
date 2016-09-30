Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'Home',}); 


Router.route('/showProfile/:_id',{ 
  name : 'showProfile',
  data: function() {
      return Meteor.users.findOne(this.params._id);
  }
});

Router.route('/editProfile/:_id',{   
  name : 'editProfile',  
  data : function () {
    return Meteor.user();
   }
 });
 Router.route('/successEditProfile/:_id', {   
  name : 'successEditProfile',
  data : function () {
    return Meteor.user()
  }
 });

Router.route('/imagen', {
	name:'uploadImages',
	
});


Router.route('/eliminarpartido/', {name:'eliminarPartido'});
Router.route('/gestionarreserva/eliminarreserva', {name:'eliminarReserva'});
Router.route('/gestionarreserva/crearreserva', {name:'crearReserva'});

Router.route('/gestionarreserva/', {name:'gestionarReserva'});
Router.route('/organizarpartido/', {name:'organizarPartido'});
Router.route('/tuspartidos/', {name:'partido'});

Router.route('/modificarReservaJugador/:_id', {
  name: 'modificarReservaPlayer',
  data: function(){
    return Reserva.findOne(this.params._id);
  }  
});

Router.route('/modificarReserva/:_id', {
  name: 'modificarReserva',
  data: function(){
    return Reserva.findOne(this.params._id);
  }  
});

Router.route('/confirmarpartido/:_id', {
    name: 'confirmarPartido',
    data: function() {
      return Partido.findOne(this.params._id);
     },
  });  
//----------------DUEÑO-----------------
//AMBOS : Muestra info del recinto a jugadores
Router.route('/showRecinto/:_id',{
      name :'showRecinto',
      data: function() {
        return Recintos.findOne({_id:this.params._id});
     }
  });
//Dueño cargar recinto
Router.route('/cargarRecinto/:_id', {
  name: 'uploadRecinto',
  data: function(){
    return Meteor.users.findOne(this.params._id);
  }  
});
// dueño
Router.route('/ownerRecintos/:_id',{ 
  name : 'ownerRecintos',
  data: function() {
      return Meteor.users.findOne(this.params._id);
  }
});
//Dueño editar recinto
Router.route('/ownerRecintos/editarRecinto/:_id',{
    name: 'editRecinto',
    data : function () {
      return Recintos.findOne({_id : this.params._id});
   }
      
});
// dueño princial
Router.route('/dashboard/:_id', {
  name: 'dashboard',
  data: function() { 
    return Recintos.findOne({_id: this.params._id})
  }
});
// dueño gestion canchas
Router.route('/dashboard/gestioncancha/:_id', {
  name: 'gestionCancha',
  data: function() { 
    return Recintos.findOne({_id: this.params._id})
  }
});
//dueño gestion canchas editar canchas
Router.route('/dashboard/gestioncancha/editcancha/:_id', {
  name: 'editCancha',
  data: function() { 
    return Canchas.findOne({_id: this.params._id})
  }
});
//dueño gestion canchas cargar cancha
Router.route('/dashboard/gestioncancha/cargarcancha/:_id', {
  name:'cargarCancha',
  data: function () {
    return Recintos.findOne(this.params._id);
  },
});

Router.route('/search', {name:'search'});

Router.route('allNotifications/:_id', {
  name: 'allNotifications',
  data: function() {
    return Meteor.users.findOne({_id: this.params._id})
  }
});


var requireLogin = function() {
  if (! Meteor.userId()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

var inicio= function() {
    if (Meteor.userId()) {
      if (Roles.userIsInRole(Meteor.userId(), 'player')) {
        if (! Meteor.user().profile.birthday) { 
          this.redirect('editProfile', {_id: Meteor.userId()});
        } else { 
        this.redirect('showProfile', {_id: Meteor.userId()});
        }
      };
      if (Roles.userIsInRole(Meteor.userId(),'owner')) {
        var recinto= Recintos.findOne({ownerId: Meteor.userId()});
        if (recinto) {
          //if(Canchas.findOne({recintoId: recinto_id})) {  //preguntar porque tira error a Franco
            this.redirect('ownerRecintos', {_id:Meteor.userId()})
          //} else {
            //this.redirect('cargarCancha', {_id: recinto_id});
          //};
        } else {
          this.redirect('uploadRecinto');  
        }
      };  
    } else {
    this.next();
    }
};

Router.onBeforeAction('dataNotFound', {only: 'showProfile'}, {only: 'showRecinto'});
Router.onBeforeAction(requireLogin, {except: 'Home'});
Router.onBeforeAction(inicio, {only: 'Home'});


