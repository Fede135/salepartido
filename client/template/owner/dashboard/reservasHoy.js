Template.reservasHoy.onRendered(function() {

    var recinto_Id = this.data._id;
    var canchasRecinto = recinto_Id && Canchas.find({'recintoId':recinto_Id, 'estado_cancha.estado_de_cancha': "Habilitada"});
    var canchasArray = canchasRecinto.fetch();
    var canchasNumero = _.pluck(canchasArray, 'numero');
    var canchas = canchasRecinto.count();
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
                td.id = primerElemento+"Hora";
                }else{
                  if(i <= filas && j == 0){
                    var rest =_.rest(horas)
                    var rest1 = _.first(rest)
                    td.appendChild(document.createTextNode(rest1));
                    td.id = rest1+"Hora";
                    horas.splice(1,1);
                  }
                  else{
                    var horass = [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1];
                    var x= horass[i];
                    var y= canchasNumero[(j-1)];
                    var xString = x.toString();
                    var yString = y.toString();
                    var idHora = x+"Hora";
                    var idCancha = y+"Cancha";
                    var id = idHora+idCancha;
                    td.appendChild(document.createTextNode(""));
                    td.id= id;
                  }
                }
                td.style.border = '1px solid black';
                
        }
    }
    Session.set('tabla', tabla);
});

Template.reservasHoy.helpers({
    canchas: function(){

      var recintoId = this._id;
      var canchas = recintoId && Canchas.find({'recintoId':recintoId, 'estado_cancha.estado_de_cancha': "Habilitada"});
      return canchas;
    }   

});