AutoForm.addHooks(
   'cargarCancha',
  {
  after:{
    insert: function (error, result) {
      if(! error)
        console.log(result);
        var cancha = Canchas.findOne({_id: result})
        alert("Cancha creada correctamente");
        Router.go('gestionCancha',{_id:cancha.recintoId});
        
    }
  }
},
);
	
