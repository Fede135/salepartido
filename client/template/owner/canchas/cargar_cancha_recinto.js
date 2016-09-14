Template.cargarCancha.helpers({
	recinto: function () {
		//Me busca los recintos del usuario(dueño)logueado.
		var recinto = Recintos.find({ownerId:Meteor.userId()})
			return recinto;
		
	},

	recintoSeleccionado:function(){
		 
			return Session.get('recintoSelect');
	},

	
		
	countCanchas: function(){
		//la idea es que el usuario tenga varios recintos...pero al tener varios

		var recinto = Recintos.findOne({ownerId:Meteor.userId()})
		var p = recinto._id
		var count = Canchas.find({recintoId:p}).count();
			return count
	},

});	


Template.cargarCancha.events({

	'click [data-for-recinto]': function(event){

    var $item = $(event.currentTarget);
    var $target = $($item.data('forRecinto'));
    
    $target.val($item.text());    
    //var nombreRecinto =$item.data('forRecinto');
   
    var idRecinto = $item.data('recintoId');
   // console.log(idRecinto);
    //var canchas = Canchas.find({recintoId:idRecinto}).fetch();
    //console.log(canchas);
    //Session.set('canchas', canchas);    
    //Session.set('nombreRecinto', nombreRecinto);
    var recintoSelect = Recintos.findOne({_id:idRecinto});
    console.log(recintoSelect);
    Session.set('recintoSelect', recintoSelect);
    },

    

});

 