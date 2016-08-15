Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', 'index')
Router.route('/OrganizarPartido/', {name: 'organizarPartido'});
Router.route('/ConfirmarPartido/', {name: 'confirmarPartido'});