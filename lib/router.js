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

Router.route('/imagen', {
	name: 'uploadImages',
	
});

Router.route('/gestionrecinto', {
	name: 'gestionRecinto',
	
});

Router.route('/gestionrecinto/crearcancha', {
	name: 'cargarCancha',
	
});

Router.route('/gestionrecinto/modificarcancha', {
	name: 'modificarCancha',
	
});

Router.route('/gestionrecinto/eliminarcancha', {
	name: 'eliminarCancha',
	
});

Router.route('/cargarRecinto', {
  name: 'uploadRecinto',
  
});
 

/*Router.route('/successEditProfile/:_id', {   
  name : 'successEditProfile' });*/

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

