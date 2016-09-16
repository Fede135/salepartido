Template.eliminarCancha.helpers({

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

	onError: function () {
      return function (error) { alert("BOO!"); console.log(error); };
    },

  onSuccess: function () {
      return function (result) { alert("YAY!"); console.log(result); };
    },

  beforeRemove: function () {
      return function (collection, id) {
        var doc = Canchas.findOne(id);
        if (confirm('Realmente quiere eliminar la cancha numero  "' + doc.numero + '"?')) {
          this.remove();
        }
      };
    }
});

Template.eliminarCancha.events({

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

Template.eliminarCancha.onDestroyed( function(){

    Session.set('recintoSelect', null);
    Session.set('canchas', null);

});