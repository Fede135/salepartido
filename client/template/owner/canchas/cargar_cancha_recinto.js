Template.cargarCancha.onRendered( function () {
  if (Session.get('alertRecintoCreado')) {
    $('#alertRecintoCreado').show();
  } else {
    $('#alertRecintoCreado').hide();
  }
});

Template.cargarCancha.helpers({
  ocupada : function(){
     return _.pluck(Canchas.find({'recintoId':this._id}).fetch(), 'numero');
  },

  
  options : function(){
    return [{label: "Habilitada", value: "Habilitada"},
      {label: "No Habilitada", value: "No Habilitada"},
       {label: "Mantenimiento", value: "Mantenimiento"}];
     
}
});


Template.cargarCancha.events({
  
  'click #cancelar': function (event){

        event.preventDefault;
        Router.go('dashboard', {_id: this._id});
    },
    'keyup [name="numero"]' : function (event, template) {
      AutoForm.removeStickyValidationError('cargarCancha', 'numero');
    }
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
        AutoForm.addStickyValidationError('cargarCancha', 'numero', 'notUnique', doc.numero);
      } else {
        return doc;
        }
    }
  },
  beginSubmit: function () {
     AutoForm.removeStickyValidationError('cargarCancha', 'numero');
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
