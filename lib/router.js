Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    if (Roles.userIsInRole(Meteor.userId(),'admin')) {
      return [
      Meteor.subscribe('reservas'),
      Meteor.subscribe('recintosAll'),
      Meteor.subscribe('commentsForEnclosure'),
      Meteor.subscribe('commentsForPlayers'),
      Meteor.subscribe('canchas'),
      Meteor.subscribe('partidos'),
      Meteor.subscribe('user'),
      Meteor.subscribe('imagenes'),
      Meteor.subscribe('calificacion_resistencia'),
      Meteor.subscribe('calificacion_fairplay'),
      Meteor.subscribe('calificacion_puntualidad'),
      Meteor.subscribe('calificacion_burradas'),
      Meteor.subscribe('calificacion_reflejo'),
      Meteor.subscribe('calificacion_atajadas'),
      Meteor.subscribe('calificacion_pase'),
      Meteor.subscribe('calificacion_defensa'),
      Meteor.subscribe('calificacion_gambeta'),
      Meteor.subscribe('calificacion_tiroalarco'),
      Meteor.subscribe('calificacion_velocidad'),
      Meteor.subscribe('calificacion_conducta'),
      Meteor.subscribe('calificaciones')
    ];
      }  
    return [
      Meteor.subscribe('reservas'),
      Meteor.subscribe('recintos'),
      Meteor.subscribe('commentsForEnclosure'),
      Meteor.subscribe('commentsForPlayers'),
      Meteor.subscribe('canchas'),
      Meteor.subscribe('partidos'),
      Meteor.subscribe('usersPlayer'),      
      Meteor.subscribe('imagenes'),
      Meteor.subscribe('notifications'),
      Meteor.subscribe('calificacion_resistencia'),
      Meteor.subscribe('calificacion_fairplay'),
      Meteor.subscribe('calificacion_puntualidad'),
      Meteor.subscribe('calificacion_burradas'),
      Meteor.subscribe('calificacion_reflejo'),
      Meteor.subscribe('calificacion_atajadas'),
      Meteor.subscribe('calificacion_pase'),
      Meteor.subscribe('calificacion_defensa'),
      Meteor.subscribe('calificacion_gambeta'),
      Meteor.subscribe('calificacion_tiroalarco'),
      Meteor.subscribe('calificacion_velocidad'),
      Meteor.subscribe('calificacion_conducta'),
      Meteor.subscribe('calificaciones')
    ];
  }
});

Router.route('/', {name: 'Home'});
Router.route('/TerminosDeUso', {name: 'terminosYCondiciones'}); 


Router.route('/showProfile/:_id',{ 
  name : 'showProfile',
  
  data: function() {
      return Meteor.users.findOne(this.params._id);
  }  
});


Router.route('/verificacion',{
  name:'verificacion',
  
});

Router.route('/editProfile/:_id',{   
  name : 'editProfile',  
  data : function () {
    return Meteor.user();
   }
 });

Router.route('/imagen', {
  name:'uploadImages',
  
});


Router.route('/organizarpartido/', {name:'organizarPartido'});
// Router.route('/tuspartidos/', {name:'partido'});  esta no se si va, sino va hay q borrarla

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
  }  
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
// dueño principal
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

Router.route('/allNotifications/:_id', {
  name: 'allNotifications',
  data: function() {
    return Meteor.users.findOne({_id: this.params._id})
  }
});

//para jugador todos los partidos
Router.route('/tuspartidos/:_id', {
  name : 'partidos',
  data: function() {
    return Meteor.user();
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
        var user = Meteor.users.findOne({_id: Meteor.userId(), 'emails.0.verified': false});
        if (user){
          this.render('verificacion');
        }
        else{  
            if  (Meteor.user().estado_usuario == "suspendido"){
              this.render('usuarioSuspendido');         
            }
            else{
                if (! Meteor.user().profile.birthday) { 
                  this.redirect('editProfile', {_id: Meteor.userId()});
                } 
                else { 
                this.redirect('showProfile', {_id: Meteor.userId()});
                }
            }
        }            
        
      };
      if (Roles.userIsInRole(Meteor.userId(),'owner')) {

        var user = Meteor.users.findOne({_id: Meteor.userId(), 'emails.0.verified': false});
        if (user){
          this.render('verificacion');
        }
        else{ 
            if  (Meteor.user().estado_usuario == "suspendido"){
              this.render('usuarioSuspendido');         
            } 
            else{
                var recinto= Recintos.findOne({ownerId: Meteor.userId()});
                if (recinto) {
                    this.redirect('ownerRecintos', {_id:Meteor.userId()})
                      
                } 
                else {
                this.redirect('uploadRecinto', {_id: Meteor.userId()});  
                }
            }
        }  
      };
      if (Roles.userIsInRole(Meteor.userId(),'admin')) {
        this.render('dashboardAdmin');
      }  
    }   
    else {
        this.next();
      }  
};

var mailVerified = function() {
  if (Meteor.users.findOne({_id: Meteor.userId(), 'emails.0.verified': false})) {
      this.render('verificacion');
  } else {
    this.next();
  }
};

var owner = function () {
  if(Roles.userIsInRole(Meteor.userId(),'owner', Roles.GLOBAL_ROLES)) {
    this.render('notFound');
  } else {
    this.next();
  }
};

var player = function () {
  if(Roles.userIsInRole(Meteor.userId(),'player', Roles.GLOBAL_ROLES)) {
    this.render('notFound');
  } else {
    this.next();
  }
};

Router.onBeforeAction('dataNotFound', {except: ['terminosYCondiciones', 'Home', 'verificacion', 'uploadImages', 'organizarPartido', 'search' ]});
Router.onBeforeAction(requireLogin, {except: ['Home', 'terminosYCondiciones']});
Router.onBeforeAction(inicio, {only: 'Home'});
Router.onBeforeAction(mailVerified);
Router.onBeforeAction(owner, {only: ['organizarPartido', 'modificarReservaPlayer','editProfile', 'confirmarPartido', 'partidos', 'dashboardAdmin']});
Router.onBeforeAction(player, {only: ['modificarReserva', 'uploadRecinto', 'ownerRecintos', 'editRecinto', 'dashboard', 'gestionCancha', 'editCancha', 'cargarCancha', 'dashboardAdmin']});