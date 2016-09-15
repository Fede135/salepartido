Template.updateRecinto.helpers({
	recinto: function () {
		return Recintos.find({ownerId: Meteor.userId()});
	},
/*
	recintoSeleccionado:function(){
		 return Session.get('recintoSelect');
	},
*/
	servEstacionamiento: function(){
		return ["SI","NO"].map((el) => ({label: el, value: el}));
	},

	servBaños : function(){
		return ["SI","NO"].map((al) => ({label: al, value: al}));
	},

	servCamarines : function(){
		return ["SI","NO"].map((ol) => ({label: ol, value: ol}));
	},

	servCantina : function(){
		return ["SI","NO"].map((ol) => ({label: ol, value: ol}));
	},

	updateFormName: function () {
            return "updateOrgForm-" + this._id;
        },
/*
	countRecintos: function (){
		return Recintos.find({ownerId: Meteor.userId()}).count();
	},
*/
	onSuccess: function () {
      return function (result) { 
      	alert("Recinto actualizado"); console.log(result);
      	 };
      },
});
/*
Template.updateRecinto.events({

	'click [data-for-recinto]': function(event){

	    var $item = $(event.currentTarget);
	    var $target = $($item.data('forRecinto'));
	    
	    $target.val($item.text());    
	    
	   
	    var idRecinto = $item.data('recintoId');
	   
	    var recintoSelect = Recintos.findOne({_id:idRecinto});
	    console.log(recintoSelect);
	    Session.set('recintoSelect', recintoSelect);
	    },

    

});

Template.confirmarPartido.onDestroyed( function(){

    Session.set('recintoSelect', null);

});
*/