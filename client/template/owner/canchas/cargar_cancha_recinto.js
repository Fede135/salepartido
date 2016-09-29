AutoForm.addHooks(
   'cargarCancha',
  {
  after:{
    insert: function (error, result) {
      if(! error)
        console.log(result);
        alert("Cancha creada correctamente");
        
        
    }
  }
},
);
	
