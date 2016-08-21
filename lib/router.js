Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'index'});

Router.route('/editProfile'/*:_id*/, {   //preguntar al franco como hacer para tener la edicion de perfiles x usuario
  name : 'editProfile',  
  data : function () {
    return Meteor.users.findOne(this.params._id);
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


