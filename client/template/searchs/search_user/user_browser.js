/*Template.userBrowser.events({
  'submit form': function(e) {
    e.preventDefault();

     userBrowser = {
      name: $(e.target).find('[name= browser]').val(),
      firstName: $(e.target).find('[name= browser]').val(),
      lastName: $(e.target).find('[name= browser]').val(),
      //emails.address : $(e.target).find('[name: browser]').val(),
    };
  },
    'click #search': function (event){
      console.log(userBrowser)
      userName = Meteor.users.find({profile.name : userBrowser.name});
      userfirstName = Meteor.users.find({firstName : userBrowser.firstName})
      userlastName = Meteor.users.find({lastName: userBrowser.lastName})
      console.log("con nombre de usuario",userName.fetch().name, "primer nombre",userfirstName.fetch().name,"apellido",userlastName.fetch().name)
      }
});

Template.userBrowser.helpers({

  userBrowse: function() {
      if (userName.count()!=0) {
        return userName
      };

      if (userfirstName.count()!=0) {
        return userfirstName
      };

      if(userlastName.count()!=0) {
        return userlastName
      };
  }
});*/
    