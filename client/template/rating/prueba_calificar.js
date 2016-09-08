Template.pruebaCalificar.events({
  'click .reset': function() {
    $('#rating').trigger('reset');
  },
  'click #estrella1': function() {
    var calificacion =  1;
    console.log(calificacion);
  },

  'click #estrella2': function() {
    var calificacion =  2;
    console.log(calificacion);
  },

  'click #estrella3': function() {
    var calificacion =  3;
    console.log(calificacion);
  },

  'click #estrella4': function() {
    var calificacion =  4;
    console.log(calificacion);
  },

  'click #estrella5': function() {
    var calificacion =  5;
    console.log(calificacion);
  },
  'click #rating': function(){
    var rating = $('#rating').data('userrating');
    console.log(rating);
  },

    'click #rating1': function(){
    var rating = $('#rating1').data('userrating');
    console.log(rating);
  },

   'click #rating2': function(){
    var rating = $('#rating2').data('userrating');
    console.log(rating);
  },
});






