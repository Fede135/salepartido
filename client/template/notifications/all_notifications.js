Template.allNotifications.helpers({
  notifications: function() {
    return Notifications.find({toUserId: Meteor.userId()}, {sort: {createAt:-1}});
  },

  notificationCount: function(){
    return Notifications.find({toUserId: Meteor.userId()}).count();
  },

});
