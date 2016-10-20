AutoForm.addHooks(
   'uploadRecinto',
  {
  after:{
    insert: function (error, result) {
      if(! error)
        Calificaciones.insert({
            
            id_recinto:result,
            upvotes :[],
            votes:[],
        });
          alert("Recinto creado correctamente");
                var reci = Recintos.findOne({_id:result});
                var nombreR = reci.nombre_recinto;

        
                Router.go('cargarCancha', {_id:result});
      
    },
  }  
});

Template.uploadRecinto.events({
  'click #cancelar': function (event){

        event.preventDefault; 
    Router.go('ownerRecintos', {_id: Meteor.userId()});
    }
});