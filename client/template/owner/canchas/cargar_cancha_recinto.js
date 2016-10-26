Template.cargarCancha.onRendered( function () {
  if (Session.get('alertRecintoCreado')) {
    $('#alertRecintoCreado').show();
  } else {
    $('#alertRecintoCreado').hide();
  }
});

Template.cargarCancha.events({
  
  'click #cancelar': function (event){

        event.preventDefault;
        Router.go('dashboard', {_id: this._id});
    },
});

Template.cargarCancha.onDestroyed( function() {
  Session.set('alertRecintoCreado', undefined);
});

AutoForm.addHooks(
   'cargarCancha',
  {
  before:{
    insert: function(doc,result){
      if(Canchas.findOne({'recintoId':doc.recintoId, 'numero':doc.numero})){
        $('#alertCanchaExistente').show();
        return false 
      } else {
        return doc;
        }
    }
  },
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
