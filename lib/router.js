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

Router.route('/showRecinto/:nombre_recinto',{
      name :'showRecinto',
      data: function() {
        return Recintos.findOne({nombre_recinto :this.params.nombre_recinto});
     }
  });

Router.route('/gestionrecinto/actualizarRecinto/:_id',{
    name: 'editRecinto',
    data : function () {
      return Recintos.findOne({_id : this.params._id});
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
    return Meteor.user();
  }
 });

Router.route('/imagen', {
	name:'uploadImages',
	
});

Router.route('/gestionrecinto/', {name: 'gestionRecinto'});

Router.route('/gestioncancha/crearcancha/', {
	name:'cargarCancha'}
	
);

Router.route('/gestioncancha/modificarcancha', {
	name:'modificarCancha',
	
});

Router.route('/gestioncancha/eliminarcancha', {
	name:'eliminarCancha'	

});

Router.route('/eliminarpartido/', {name:'eliminarPartido'});
Router.route('/gestionarreserva/eliminarreserva', {name:'eliminarReserva'});
Router.route('/gestionarreserva/crearreserva', {name:'crearReserva'});
Router.route('/gestionarreserva/', {name:'gestionarReserva'});
Router.route('/organizarpartido/', {name:'organizarPartido'});
Router.route('/tuspartidos/', {name:'partido'});

Router.route('/confirmarpartido/:_id', 
  {name: 'confirmarPartido',
      data: function() {
      return Partido.findOne(this.params._id);
     },
  });  
    

Router.route('/gestionarrecintos/', {
 name: 'gestionarRecintos',
  
});
Router.route('/gestionarrecintos/cargarRecinto', {
  name: 'uploadRecinto',
  
});


Router.route('/gestionarrecintos/actualizarRecinto', {

  name: 'updateRecinto',
  
});

Router.route('/gestionarrecintos/eliminarRecinto', {
  name: 'deleteRecinto',
  
});


Router.route('/calificar', {
  name: 'pruebaCalificar',
  
});

Router.route('/search', {name:'search'});

Router.route('/dashboard/:_id',{ 
  name : 'dashboard',
  data: function() {
      return Meteor.users.findOne(this.params._id);
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
          this.redirect('editProfile', {_id: Meteor.userId()})
        } else { 
        this.redirect('showProfile', {_id: Meteor.userId()})
        }
      } else {
        this.redirect('dashboard', {_id:Meteor.userId()})
      }  
    } else {
    this.next();
    }
};

Router.onBeforeAction('dataNotFound', {only: 'showProfile'}, {only: 'showRecinto'});
Router.onBeforeAction(requireLogin, {except: 'Home'});
Router.onBeforeAction(inicio, {only: 'Home'});


