Template.gestionarCanchas.events({
	
	'click [data-for-recinto]': function(event){
	    
	    var $item=$(event.currentTarget);
	    var $target=$($item.data('forRecinto'));
	    
	    $target.val($item.text()); 
	    
	  },

	  'click #cargarCancha': function(event){
	  		
	  		var nom_recinto=$('input[name=nombreRecinto]').val();
	        var recinto=Recintos.findOne({'nombre_recinto':nom_recinto});
	        var recinto_id=recinto._id;	 
	        
	  	Router.go('cargarCancha',{_id:recinto_id});
	  }
});

Template.gestionarCanchas.helpers({
	
  recinto: function () {
    return Recintos.find();
  }
});