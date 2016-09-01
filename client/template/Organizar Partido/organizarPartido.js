Template.organizarPartido.onRendered(function () {
  this.$('#datetimepicker').datetimepicker({
    locale: 'es',
    format: 'L',
    minDate: moment(),
    showClear: true
  });

  this.$('#datetimepicker3').datetimepicker({
    locale: 'es',
    format:'H',
    disabledHours: [ 2 , 3 , 4 , 5 , 6 , 7 , 8 ],
    showClear: true
  });
});

Template.organizarPartido.events({
  'click [data-picker-handle]': function (event) {
    var datetimepicker = $(event.currentTarget).data('pickerHandle');

    $(datetimepicker).data('DateTimePicker').toggle();
  }, 
    'click obtenerNombre': function(event) {
    nombreRecinto= this.nombre_recinto;
  }
});

Template.organizarPartido.helpers({
	
  canchas: function () {
    return Canchas.find();
  },
  
  recinto: function () {
    return Recintos.find();
  }
});
