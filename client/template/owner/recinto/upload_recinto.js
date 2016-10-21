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
    Session.set('alertRecintoCreado', true);
    var reci = Recintos.findOne({_id:result});
    var nombreR = reci.nombre_recinto;
    Router.go('cargarCancha', {_id:result});
    },
  }  
});