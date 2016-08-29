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
    disabledTimeIntervals: [[moment({ h: 1 }), moment({ h: 9 })]],
    showClear: true,
  });
});

Template.organizarPartido.events({

          
});
Template.organizarPartido.helpers({
	
  canchas: function () {
    return Canchas.find();
  },
  
  recinto: function () {
    return Recinto.find();
  }

  nombreRecinto: document.getElementsByName("getNombreRecinto")[0].value;

});