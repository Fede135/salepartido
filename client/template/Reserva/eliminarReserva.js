Template.eliminarReserva.helpers({
  
  reservadueno: function () {
    var aaa = Reservadueno.find();
    
    return aaa;
  },
    onError: function () {
      return function (error) { alert("Error"); console.log(error); };
    },
    onSuccess: function () {
      return function (result) { alert("Reserva eliminada"); console.log(result); };
    },
    beforeRemove: function () {
      return function (collection, id) {
        var doc = Reserva.findOne(id);
        if (confirm('Realmente quiere eliminar la reserva de  "' + doc.nom_usario + '"?')) {
          this.remove();
        };
      };  
    },  
    beforeRemovee: function () {
      return function (collection, id) {
        var doc = Reservadueno.findOne(id);
        if (confirm('Realmente quiere eliminar la reserva de  "' + doc.nom_usario + '"?')) {
          this.remove();
        }
      };  
    } 
});