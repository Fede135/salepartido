Template.dashboard.helpers({

  tablaReserva: function(){

    var tabla = Session.get(tabla);
    return tabla;
},


/*		var recintoId = this._id;
		var recinto = recintoId && Recintos.findOne({'_id': recintoId});
		var nombRecinto = recinto && recinto.nombre_recinto;    
		var reservas = nombRecinto && Reserva.find({'nom_recinto':nombRecinto, 'estado': "Reservada"});	
		return reservas;*/
	

    abrirReserva: function(){

    	var reservaGet = Session.get('abrirReserva') && true;
      return reservaGet;

    },

    abrirCanchas: function(){

    	var recinto_Id = Session.get('canchas') && this._id;
      var canchas = recinto_Id && Canchas.find({'recintoId':recinto_Id, 'estado_cancha.estado_de_cancha': "Habilitada"});
    	return canchas;

    },

    canchas: function(){

      var recintoId = this._id;
      var canchas = recintoId && Canchas.find({'recintoId':recintoId, 'estado_cancha.estado_de_cancha': "Habilitada"});
      return canchas;
    }   

});

Template.dashboard.events({

	'click #modificarReserva': function (event) {
		Router.go('modificarReserva', {_id: this._id});
	},
  
  'click #gestionCanchas': function(event){

     Session.clear();
     var canchas = true;

     Session.set('canchas', canchas);
  },

  'click #reservasHoy': function(event){

    Session.clear();
    Session.get(tabla);
  },

	'click #crearReserva': function(event){

    Session.clear();
		var abrirReserva = true;
		Session.set('abrirReserva', abrirReserva);
  },

  	'click #partidoJugado': function (event) {
		
		Reserva.update({_id: this._id}, {$set: {'estado': "Jugada"}});
		alert("Reserva jugada");
	},

	'click #cancelarReserva': function(event){

		Reserva.update({_id: this._id}, {$set: {'estado': "Cancelada"}});
		alert("Reserva cancelada");

  	}
  	 
  	 
});

Template.dashboard.onRendered(function() {

    var recinto_Id = this.data._id;
    var canchas = recinto_Id && Canchas.find({'recintoId':recinto_Id, 'estado_cancha.estado_de_cancha': "Habilitada"}).count();
    var horas = [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1];
    var filas = horas.length;
    var tabla =document.getElementById('tabla').getElementsByTagName('tbody')[0];
  
    for(var i = 0; i < filas; i++){
        var tr = tabla.insertRow();
        for(var j = 0; j <= canchas; j++){
            
                var td = tr.insertCell();
                var primerElemento = _.first(horas, [1])
                if(i == 0 && j == 0 ){
                td.appendChild(document.createTextNode(primerElemento));
                }else{
                  if(i <= filas && j == 0){
                    var rest =_.rest(horas)
                    var rest1 = _.first(rest)
                    td.appendChild(document.createTextNode(rest1));
                    horas.splice(1,1);
                  }
                  else{
                  td.appendChild(document.createTextNode(""));  
                  }
                }
                td.style.border = '1px solid black';
                
        }
    }
    Session.set('tabla', tabla);
/*
    var recinto_Id = this._id;
    var canchas = recinto_Id && Canchas.find({'recintoId':recinto_Id, 'estado_cancha.estado_de_cancha': "Habilitada"}).count();
    var horas = [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1];
    var filas = horas.length;
    var tabla =document.getElementById('tabla').getElementsByTagName('tbody')[0];
    console.log(tabla)
    for(var i = 1; i <= filas; i++){
      var tr = tabla.insertRow();
        for(var j = 1; j <= canchas; j++){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode('Cell'));
                td.style.border = '1px solid black';
                
            }
        }
        tabla.appendChild(tr);*/
});
/*
function tableCreate(filas,canchas){ 
    console.log(tabla)
    var filas=filas;
    var columnas=canchas;
    var body = document.body;
    console.log(tabla)
    for(var i = 0; i < filas; i++){
        var tr = tabla.insertRow();
        for(var j = 0; j < columnas; j++){
            
                var td = tr.insertCell();
                td.appendChild(document.createTextNode('Cell'));
                td.style.border = '1px solid black';
                
            }
        }
        body.appendChild(tbl);

}



/*Meteor.setInterval(function () {
  var now = moment()
  console.log(now.format('dddd D MMMM'));
  console.log(now.format('LT'));
 
  Session.set('time',      now.format('LT'))
  Session.set('date',      now.format('dddd D MMMM'))
  Session.set('timeTitle', now.format('L LT ([GMT]Z)'))
}, 90000)*/




