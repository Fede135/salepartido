Template.modificarCancha.helpers({

	recinto: function () {
		var recin = Recintos.findOne({ownerId: Meteor.userId()});
			var p = recin._id;
			return recin;
		
	},
	
	canchasRecinto : function(){
		return Session.get('canchas');

	},

	recintoSeleccionado:function(){
		 
			return Session.get('recintoSelect');
	},

/*
	countCanchas: function (){
		var p = Session.get('canchas1');
		var count = p.count();
		return count;
	},
*/	
	//Todo esto es para mostrar los valores guardados en cancha
	cantJugadores: function(){
		return ["5 vs 5","6 vs 6","7 vs 7","11 vs 11"].map((el) => ({label: el, value: el}));
	},

	tipoCancha : function(){
		return ["Césped Sintético","Césped Natural","Baldosa","Tierra","Parquet"].map((al) => ({label: al, value: al}));
	},

	estadoCancha : function(){
		return ["Habilitada","No Habilitada","Mantenimiento"].map((ol) => ({label: ol, value: ol}));
	},

	updateFormName: function () {
            return "updateOrgForm-" + this._id;
        },


});


Template.modificarCancha.events({

	'click [data-for-recinto]': function(event){

    var $item = $(event.currentTarget);
    var $target = $($item.data('forRecinto'));
    
    $target.val($item.text());    
    //var nombreRecinto =$item.data('forRecinto');
   
    var idRecinto = $item.data('recintoId');
   
    var canchas = Canchas.find({recintoId:idRecinto}).fetch();
  
    //console.log(canchas);
    Session.set('canchas', canchas);
    ;     
    //Session.set('nombreRecinto', nombreRecinto);
    var recintoSelect = Recintos.findOne({_id:idRecinto});
    console.log(recintoSelect);
    Session.set('recintoSelect', recintoSelect);
    },

    'click #actualizarCancha': function(){
    	alert("Cancha actualizada correctamente");
    }

  
});

Template.modificarCancha.onDestroyed( function(){

    Session.set('recintoSelect', null);
    Session.set('canchas', null);

});



//Falta mostrar mensaje cuando se modifica la cancha.
	//Router.go('editRecinto', {_id:this._id});
