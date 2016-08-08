Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'index'});
Router.route('/editProfile', {   //preguntar al franco como hacer para tener la edicion de perfiles x usuario
name : 'editProfile',  
data : function () {
  return Meteor.users.findOne(this.params._id);
 }
 });