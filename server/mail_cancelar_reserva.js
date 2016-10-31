Meteor.methods({
	mailCancelar: function(arrayIdJugadores,hora,dia,recinto,cancha){
		check(arrayIdJugadores, Array);		
		check(dia, String);
		check(hora, Number);
		check(recinto, String);	
		check(cancha, Number);			
		//check(organizador, String);
		//var nombreUsuario = Meteor.users.findOne({_id:organizador}).profile.name;
		arrayMail=[];
		arrayIdJugadores.forEach(function (id) {
			var mail = Meteor.users.findOne({_id:id}).emails[0].address ;
			arrayMail.push(mail)
		});
		
			Email.send({
				from: "salepartido2016@gmail.com",
				to: arrayMail,
				subject: "NO Sale partido!!. Se CANCELO el partido del "+dia+" a las "+hora+" hs. en "+recinto+' cancha n°'+cancha+'.',
				html: '<template><div style="width:100%;padding:24px 0 16px 0;background-color:#f5f5f5;text-align:justify"><div style="padding:24px 32px 24px 32px;background:#fff;border-right:1px solid #eaeaea;border-left:1px solid #eaeaea" dir="ltr"><h1><font color="#1bb3af">SALE PARTIDO</span></font><font color="#FF0000"><h2>PARTIDO CANCELADO</h2></font><li><b>Dia:</b>'+dia+'</li><li><b>Hora:</b>'+hora+'</li><li><b>Recinto:</b>'+recinto+'</li><li><b>Cancha:</b>'+cancha+'</li></font></div><table style="padding:14px 10px 0 10px" role="presentation" dir="ltr"><tbody><tr><td style="width:100%;font-size:11px;font-family:Roboto,Arial,Helvetica,sans-serif;color:#646464;line-height:20px;min-height:40px;vertical-align:middle">Sale Partido 2016, Mendoza, Argentina</td></tr></tbody></table></div></template>',
			});
		
	}

});

