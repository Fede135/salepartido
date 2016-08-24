/*
Segun la documentacion del paquete
AutoForm.addHooks(
  ["uploadRecinto"],
  {
    before   : {
      method: CfsAutoForm.Hooks.beforeInsert
    },
    after    : {
      method: CfsAutoForm.Hooks.afterInsert
    }
  }
);

AutoForm.hooks({
 uploadRecinto: {
   after: {
     insert: function(error, result, template) {
       insertedFile = Recintos.findOne(result).imagenes_id;
       Images.update({_id: insertedFile}, {$set: {'recinto': result}});
     }
   }
 }
});
*/
Template.uploadRecinto.helpers({

  imagenes:  function() {
    return Images.findOne({recinto: this._id});
  }
});