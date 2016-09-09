Template.eliminarReserva.helpers({
  reserva: function () {
    return Reserva.find();
  },

    onError: function () {
      return function (error) { alert("BOO!"); console.log(error); };
    },
    onSuccess: function () {
      return function (result) { alert("YAY!"); console.log(result); };
    },
    beforeRemove: function () {
      return function (collection, id) {
        var doc = Reserva.findOne(id);
        if (confirm('Realmente quiere eliminar la reserva numero  "' + doc._id + '"?')) {
          this.remove();
        }
      };
    }
});