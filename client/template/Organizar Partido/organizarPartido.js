Template.organizarPartido.onRendered(function () {
  this.$('#datetimepicker').datetimepicker({
    locale: 'es',
    format: 'L',
    minDate: moment(),
    showClear: true,
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

  'click [data-for-recinto]': function(event){
    
    var $item = $(event.currentTarget);
    var $target = $($item.data('forRecinto'));
    /*
    x = $item.text()
    console.log(x);*/
    
    $target.val($item.text());        
    
  },

  'click [data-for-cancha]': function(event){
    var $item = $(event.currentTarget);
    var $target = $($item.data('forCancha'));

    $target.val($item.text());    
  },

  'click #cargarReserva': function(event){

  nomRecinto = $('input:button[name=recinto]').val();
    
  }
  
});

Template.organizarPartido.helpers({
	
  recinto: function () {
    return Recintos.find();
  },

  cancha: function () {
    return Canchas.find();
  }/*,
    xx: function(){
    nom_recinto.$('input:button[name=recinto]').val());
    num_cancha.$('input:button[name=cancha]').val());
    hora_de_juego.$('input:button[name=datetimepicker3]').val());
    fecha_de_juego.$('input:button[name=datetimepicker]').val());
  }*/
});
/*
$('input:button[name=datetimepicker]').val());
$('input:button[name=datetimepicker3]').val());
$('input:button[name=recinto]').val());
$('input:button[name=cancha]').val());
*/
