AutoForm.addHooks(
   'cargarCancha',
  {
  after:{
    insert: function (error, result) {
      if(! error)
      
        var cancha = Canchas.findOne({_id: result})
        alert("Cancha creada correctamente");
        Router.go('gestionCancha',{_id:cancha.recintoId});
        
    }
  }
},
);
	
