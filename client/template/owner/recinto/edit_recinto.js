Template.editRecinto.helpers({

	recinto : function(){
		return Recintos.findOne({_id: this._id});
	},
	
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

	updateRecinto: function () {
            return "updateOrgForm-" + this._id;

        },

});

Template.editRecinto.events({
  'click #cancelar': function (event){

        event.preventDefault; 
    Router.go('ownerRecintos', {_id: Meteor.userId()});
    }
});
AutoForm.addHooks(
   'updateRecinto',
  {
  after:{
    update: function (error, result) {    	
      if(! error)
       Session.set('alertRecintoEditado', true);
       Router.go('ownerRecintos', {_id:Meteor.userId()});
       
    }
  }
},
);
