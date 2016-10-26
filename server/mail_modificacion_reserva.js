Meteor.methods({
	mailModificacion: function(arrayAmigos,partidoId,dia,hora,recinto,organizador,oldHora,oldDia,oldRecinto){
		check(arrayAmigos, Array);
		check(partidoId, String);
		check(dia, String);
		check(hora, Number);
		check(recinto, String);		
		check(oldHora, Number);	
		check(oldDia, String);
		check(oldRecinto, String);
		check(organizador, String);
		var nombreUsuario = Meteor.users.findOne({_id:organizador}).profile.name;
			Email.send({
				from: "salepartido2016@gmail.com",
				to: arrayAmigos,
				subject: "Modificacion de reserva.Sale partido!! el "+dia+" a las "+hora+" horas en "+recinto+'.Organiza: '+organizador,
				html: '<template><div style="width:100%;padding:24px 0 16px 0;background-color:#f5f5f5;text-align:justify"><div style="padding:24px 32px 24px 32px;background:#fff;border-right:1px solid #eaeaea;border-left:1px solid #eaeaea" dir="ltr"><h1><font color="#1bb3af">SALE PARTIDO</span></font><h2>Modificación de reserva</h2><font color="#FF0000"><h3>Reserva cancelada:</h3><li><b>Dia:</b>'+oldDia+'</li><li><b>Hora:</b>'+oldHora+'</li><li><b>Recinto:</b>'+oldRecinto+'</li></font><font color="#1bb3af"><h2>Nueva reserva:</h2><li><b>Dia:</b>'+dia+'</li><li><b>Hora:</b>'+hora+'</li><li><b>Recinto:</b>'+recinto+'</li><li><b>Organizador:</b>'+nombreUsuario+'</li></font><h3>Si querés jugar visita este enlace:http://localhost:3000/confirmarpartido/'+partidoId+'</h3></div><table style="padding:14px 10px 0 10px" role="presentation" dir="ltr"><tbody><tr><td style="width:100%;font-size:11px;font-family:Roboto,Arial,Helvetica,sans-serif;color:#646464;line-height:20px;min-height:40px;vertical-align:middle">Sale Partido 2016, Mendoza, Argentina</td></tr></tbody></table></div></template>',
			});
		
	}

//falta avisarle al dueño de la cancha

});
