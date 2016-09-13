Template.eliminarReserva.helpers({
  reserva: function () {
    return Reserva.find();
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
        }
      };
    }
});