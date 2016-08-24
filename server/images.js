Images.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  },
  update: function() {
    return true;
  },
   download: function() {
    return true;
  }
});


/*
Meteor.methods({

  myServerMethod: function(doc) {
    //try {
      check(doc, Recintos);


      var user = Meteor.user();
    //  Recintos.insert(doc);
   // }catch(e){
    //  throw new Meteor.Error(e);
 //   }

    //do some stuff here and throw a new Meteor.Error if there is a problem
  
var actualizacion = (doc,{
	nombre_recinto: doc.nombre_recinto,
	direccion_recinto: doc.direccion_recinto,
	'telefono_recinto.fijo' : doc.telefono_recinto.fijo,
	'telefono_recinto.celular_1' : doc.telefono_recinto.celular_1,
	'telefono_recinto.celular_2' : doc.telefono_recinto.celular_2,
	'servicios.estacionamiento': doc.servicios.estacionamiento,
	'servicios.baños': doc.servicios.baños,
	'servicios.camarines': doc.servicios.camarines,
	'servicios.cantina': doc.servicios.cantina,
	imagenes: doc.imagenes,
});

var userId = Meteor.Recintos.update({_id: user.id}, {$set:{ actualizacion}})

}
  }
);
  */