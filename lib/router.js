Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', 
{
  name: 'Home',  
}); 


Router.route('/showProfile/:_id',{
  
  name : 'showProfile',
    data: function() {
      return Meteor.users.findOne(this.params._id);
  }

});

//tincho
Router.route('/showRecinto/:nombre_recinto',{
      name :'showRecinto',
      data: function() {
        return Recintos.findOne({nombre_recinto :this.params.nombre_recinto});
     }
  });
//tincho
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
    this.redirect('showProfile', {_id: Meteor.userId()})
  } else {
    this.next();
  }
};

 //Router.onBeforeAction('dataNotFound', {only: 'editProfile'});
 Router.onBeforeAction(requireLogin, {except: 'Home'});
 Router.onBeforeAction(inicio, {only: 'Home'});

