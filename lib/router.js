Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'index'});

Router.route('/editProfile/:_id', {   
  name : 'editProfile',  
  data : function () {
    return Meteor.user();
   }
 });