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
        // probandoooo
       /* reci=Recintos.findOne({_id: result});
        image1 = reci.imagen1_id;
        image2 = reci.imagen2_id;
        image3 = reci.imagen3_id;
        image4 = reci.imagen4_id;

        ima1 = Images.findOne({_id: image1});
        ima2 = Images.findOne({_id: image2});
        ima3 = Images.findOne({_id: image3});
        ima4 = Images.findOne({_id: image4});

        if(ima1.original.size > (2 * 1024)){
          return alert('Tamaño invalido imagen 1')
        }else
        if(ima2.original.size > (2 * 1024)){
          return alert('Tamaño invalido imagen 2')
        }else
        if(ima3.original.size > (2 * 1024)){
          return alert('Tamaño invalido imagen 3')
        }else
        if(ima4.original.size > (2 * 1024)){
          return alert('Tamaño invalido imagen 4')
        }else */
          alert("Recinto creado correctamente");
                var reci = Recintos.findOne({_id:result});
                var nombreR = reci.nombre_recinto;
                Router.go('cargarCancha',);
      
    },
  }  
});

//Router.go('showRecinto',{nombre_recinto:nombreR});
