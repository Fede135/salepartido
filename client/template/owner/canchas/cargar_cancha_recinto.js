AutoForm.addHooks(
   'cargarCancha',
  {
  before:{
    insert: function(doc,result){
      if(Canchas.findOne({'recintoId':doc.recintoId, 'numero':doc.numero}))
        return alert("Actualice la pagina y asigne otro numero para la cancha");
      else
        return doc;
    }
  },
  after:{
    insert: function (error, result) {
      if(! error)
      
        var cancha = Canchas.findOne({_id: result})
        alert("Cancha creada correctamente");
        Router.go('dashboard',{_id:cancha.recintoId});
        
    }
  }
},
);
