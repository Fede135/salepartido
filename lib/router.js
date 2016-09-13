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
Router.route('/showRecinto/:nombre_recinto',function(){
  this.render('showRecinto',{
      data: function() {
      return Recintos.findOne({nombre_recinto :this.params.nombre_recinto});
     }
  });
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

Router.route('/gestionarreserva/eliminarreserva', {name: 'eliminarReserva'});
Router.route('/gestionarreserva/', {name: 'gestionarReserva'});
Router.route('/organizarpartido/', {name: 'organizarPartido'});
Router.route('/confirmarpartido/', {name: 'confirmarPartido'});
Router.route('/gestionarrecintos/', {name: 'gestionarRecintos'});

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

Router.route('/searchBox', {name:'searchBox'}); 


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
    if (! Meteor.user().editedProfile) { 
      console.log("editedProfile", Meteor.user().editedProfile); //xq devuelve undefined siempre??!!
      this.redirect('editProfile', {_id: Meteor.userId()})
    } else { 
    this.redirect('showProfile', {_id: Meteor.userId()})
  }
} else {
    this.next();
  }
};

//Router.onBeforeAction('dataNotFound', {only: 'editProfile'});
Router.onBeforeAction(requireLogin, {except: 'Home'});
Router.onBeforeAction(inicio, {only: 'Home'});

