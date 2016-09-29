Template.allNotifications.helpers({
  notifications: function() {
    return Notifications.find({toUserId: Meteor.userId()}, {sort: {createAt:-1}});
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