Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/',{name: 'index'});


Router.route('/:_id',{
  name : 'showProfile',
  data: function() {
    //idfromuser = this.params._id
    return Meteor.users.findOne(this.params._id);
  }
})

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

Router.route('/gestionrecinto/crearcancha', {
	name: 'cargarCancha',
	
});

Router.route('/gestionrecinto/modificarcancha', {
	name: 'modificarCancha',
	
});

Router.route('/gestionrecinto/eliminarcancha', {
	name: 'eliminarCancha',
	
});

Router.route('/organizarpartido/', {name: 'organizarPartido'});
Router.route('/confirmarpartido/', {name: 'confirmarPartido'});



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

