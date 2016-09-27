Template.allNotifications.helpers({
  notifications: function() {
    return Notifications.find({toUserId: Meteor.userId()});
  },

  notificationCount: function(){
    return Notifications.find({toUserId: Meteor.userId()}).count();
  },

});
  
Template.allNotificationItem.helpers({
  notificationUserPathComment: function() {
    return Router.routes.showProfile.path({_id: this.toUserId});
  }
});