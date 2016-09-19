Template.cargarCancha.helpers({
	
	recinto: function () {
		//Me busca los recintos del usuario(dueño)logueado.
		var recinto = Recintos.find({ownerId:Meteor.userId()})		
	return recinto;
		
	},

	recintoSeleccionado:function(){
		 
		return Session.get('recintoSelect');
	}/*,
		
	countCanchas: function(){
		//la idea es que el usuario tenga varios recintos...pero al tener varios
		var usuarioId = Meteor.userId();
		var recinto = usuarioId && Recintos.findOne({ownerId:usuarioId})
		var p = recinto && recinto._id
		var count = p && Canchas.find({recintoId:p}).count();
			return count
	},*/

});	


Template.cargarCancha.events({

	'click [data-for-recinto]': function(event){

    var $item = $(event.currentTarget);
    var $target = $($item.data('forRecinto'));
    
    $target.val($item.text());    
    
   
    var idRecinto = $item.data('recintoId');
  
    var recintoSelect = Recintos.findOne({_id:idRecinto});
   
    Session.set('recintoSelect', recintoSelect);
    },
});

Template.cargarCancha.onDestroyed( function(){

    Session.set('recintoSelect', null);

});

AutoForm.addHooks(
   'cargarCancha',
  {
  after:{
    insert: function (error, result) {
      if(! error)
        console.log(result);
        alert("Cancha creada correctamente");
        
        
    }
  }
},
);
	
  //--------------------------------------------------
 //falta mostrar un mensaje una vez que se crea la cancha
/*
 AutoForm.addHooks(
   'cargarCancha',
  {

 after:{
	onError: function () {
      return function (error) { alert("Error, recargue la página"); console.log(error); };
    },
	
	onSuccess: function (insert,result) {
		var cancha = Canchas.findOne({_id:result});
		var numero = cancha.numero;
		var estado = cancha.estado_cancha.estado_de_cancha;

      return alert("cancha creada correctamente"numero,estado);
    },
   
  }
},
);
*/

