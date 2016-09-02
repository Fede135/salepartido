Template.pruebaCalificar.events({
  'click .reset': function() {
    $('#rating').trigger('reset');
  },

  'click .rating': function() {
  	var rating = $('#rating').data('userrating');
  }

});








Template.pruebaCalificar.helpers({

	rati: function(){
		
		return rating;
	},
});
