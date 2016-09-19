AutoForm.addHooks(
   'uploadRecinto',
  {
  after:{
    insert: function (error, result) {
      if(! error)
        console.log(result);
        Calificaciones.insert({
            
            id_recinto:result,
            upvotes :[],
            votes:[],
        });
        alert("Recinto creado correctamente");
        var reci = Recintos.findOne({_id:result});
        var nombreR = reci.nombre_recinto;
        Router.go('showRecinto',{nombre_recinto:nombreR});
    }
  }
},
);

//ver error al cargar imagenes

