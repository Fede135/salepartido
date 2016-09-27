Template.allNotifications.helpers({
  notifications: function() {
    return Notifications.find({toUserId: Meteor.userId()});
  },
  // fecha : function() {
  //   var monthNames = [
  //     "Enero", "Febrero", "Marzo",
  //     "Abril", "Mayo", "Junio", "Julio",
  //     "Agosto", "Septiembre", "Octubre",
  //     "Noviembre", "Diciembre"
  //     ];
  //     notif = [Notifications.find({toUserId: Meteor.userId()})];
  //     var fecha =[];
  //     for (i=0; notif.count()-1; i++){
  //       var date = notif[i].createAt; 
  //       console.log('date',date);
  //       var day = date.getDate();
  //       var monthIndex = date.getMonth();
  //       var year = date.getFullYear();
  //       var fecha = fecha.push(day+' '+monthIndex+' '+' '+year)
  //       console.log('fecha dentro del for', fecha);
  //     }
  //       console.log('fecha fuera del for', fecha);
  //       return fecha;
    
  // },
  notificationCount: function(){
    console.log(Notifications.find({toUserId: Meteor.userId()}).count())
    return Notifications.find({toUserId: Meteor.userId()}).count();
  },

});
  
Template.allNotificationItem.helpers({
  notificationUserPathComment: function() {
    return Router.routes.showProfile.path({_id: this.toUserId});
  }
});