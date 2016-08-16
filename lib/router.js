Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/',  {name: 'index'});
Router.route('/OrganizarPartido/', {name: 'organizarPartido'});
Router.route('/ConfirmarPartido/', {name: 'confirmarPartido'});