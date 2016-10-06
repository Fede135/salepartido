Meteor.startup(function () {
  smtp = {
    username: 'salepartido2016@gmail.com',   
    password: 'adrigato',   
    server:   'smtp.gmail.com',  
    port: 25
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

  /*if (Meteor.users.find().count() === 0 ){
  		Roles.addUsersToRoles(id, ['admin'], Roles.GLOBAL_GROUP)
  },*/
//var id = Accounts.createUser({todo lo valido})
});