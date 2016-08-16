Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/',  {name: 'index'});
Router.route('/OrganizarPartido/', {name: 'organizarPartido'});
Router.route('/ConfirmarPartido/', {name: 'confirmarPartido'});
Router.route('/OrganizarPartido/CrearCancha/', {name: 'crearCancha'});
Router.route('/OrganizarPartido/Calendario/', {name: 'calendario'});