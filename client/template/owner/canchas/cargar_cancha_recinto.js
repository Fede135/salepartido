Template.cargarCancha.onRendered( function () {
  if (Session.get('alertRecintoCreado')) {
    $('#alertRecintoCreado').show();
  } else {
    $('#alertRecintoCreado').hide();
  }
});

Template.cargarCancha.onDestroyed( function() {
  Session.set('alertRecintoCreado', undefined);
});

AutoForm.addHooks(
   'cargarCancha',
  {
  after:{
    insert: function (error, result) {
      if(! error){
        Session.set("alertCanchaCreada", true);
        var cancha = Canchas.findOne({_id: result});
        Router.go('gestionCancha',{_id:cancha.recintoId});
      }
    }
  }
},
);
	
