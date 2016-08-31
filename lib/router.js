Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});


Router.route('/', {name: 'index'});


Router.route('/editProfile/:_id', {   
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
	name: 'uploadImages',
	
});

Router.route('/gestionrecinto', {
	name: 'gestionRecinto',
	
});

Router.route('/gestioncancha/crearcancha', {
	name: 'cargarCancha',
	
});

Router.route('/gestioncancha/modificarcancha', {
	name: 'modificarCancha',
	
});

Router.route('/gestioncancha/eliminarcancha', {
	name: 'eliminarCancha',
	
});


Router.route('/organizarpartido/', {name: 'organizarPartido'});
Router.route('/confirmarpartido/', {name: 'confirmarPartido'});
Router.route('/gestionarrecinto/', {name: 'gestionarRecintos'});


Router.route('/gestionrecinto/cargarRecinto', {
  name: 'uploadRecinto',
  
});

Router.route('/gestionrecinto/actualizarRecinto', {
  name: 'updateRecinto',
  
});

Router.route('/gestionrecinto/eliminarRecinto', {
  name: 'deleteRecinto',
  
});


Router.route('/calificar', {
  name: 'pruebaCalificar',
  
});

 



var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

 //Router.onBeforeAction('dataNotFound', {only: 'editProfile'});
 Router.onBeforeAction(requireLogin, {only: '/'});

