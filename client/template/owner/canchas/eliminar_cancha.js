Template.eliminarCancha.helpers({

   
	canchas: function () {
    recinto = Recintos.findOne({ownerId:Meteor.userId()});
    p = recinto._id;
		  return Canchas.find({recintoId:p});
	},

	  onError: function () {
      return function (error) { alert("BOO!"); console.log(error); };
    },
    onSuccess: function () {
      return function (result) { alert("YAY!"); console.log(result); };
    },
    beforeRemove: function () {
      return function (collection, id) {
        var doc = Canchas.findOne(id);
        if (confirm('Realmente quiere eliminar la cancha numero  "' + doc.numero + '"?')) {
          this.remove();
        }
      };
    }
});