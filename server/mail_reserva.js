Meteor.methods({
	mailReserva: function(arrayAmigos,partidoId,dia,hora,recinto,organizador){
		check(arrayAmigos, Array);
		check(partidoId, String);
		check(dia, String);
		check(hora, Number);
		check(recinto, String);		
		check(organizador, String);	
		var direccionRecinto = Recintos.findOne({nombre_recinto:recinto}).direccion_recinto;
			Email.send({
				from: "salepartido2016@gmail.com",
				to: arrayAmigos,
				subject: "Sale partido!! el "+dia+" a las "+hora+" horas en "+recinto+'.Organiza:'+organizador,
				html: '<template><div style="width:100%;padding:24px 0 16px 0;background-color:#f5f5f5;text-align:justify"><div style="padding:24px 32px 24px 32px;background:#fff;border-right:1px solid #eaeaea;border-left:1px solid #eaeaea" dir="ltr"><h1><font color="#1bb3af">SALE PARTIDO</span></font><h2>Nueva reserva!!</h2><font color="#1bb3af"><li><b>Dia:</b>'+dia+'</li><li><b>Hora:</b>'+hora+'</li><li><b>Recinto:</b>'+recinto+'</li><li><b>Dirección:</b>'+direccionRecinto+'<li><b>Organizador:</b>'+organizador+'</li></font><h3>Si querés jugar visita este enlace:http://localhost:3000/confirmarpartido/'+partidoId+'</h3></div><table style="padding:14px 10px 0 10px" role="presentation" dir="ltr"><tbody><tr><td style="width:100%;font-size:11px;font-family:Roboto,Arial,Helvetica,sans-serif;color:#646464;line-height:20px;min-height:40px;vertical-align:middle">Sale Partido 2016, Mendoza, Argentina</td></tr></tbody></table></div></template>',
			});
		
	}

});
