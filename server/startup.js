Meteor.startup(function () {
  smtp = {
    username: 'salepartido2016@gmail.com',   // eg: server@gentlenode.com
    password: 'adrigato',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 25
  },

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

	if (Meteor.users.find().count() === 0 ){
		var emails = new Object({'address': 'admin@admin.com', 'verified': true});
		
		var id = Accounts.createUser({
			
			username: 'admin',
			password: 'admin',
        	profile: {
        		firstName: 'administrador',
	            lastName: 'administrador'
	        }    	            
       	});

		Meteor.users.update({_id:id}, {$set: {'emails':[emails]}});
	}	 
});

