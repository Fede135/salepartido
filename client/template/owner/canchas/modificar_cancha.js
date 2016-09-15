Template.modificarCancha.helpers({

	recinto: function () {
		recinto = Recintos.find({ownerId:Meteor.userId()});
			return recinto;
		
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

//mostrar canchas que le pertenecen al recinto, del usuario logeado

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

    

});