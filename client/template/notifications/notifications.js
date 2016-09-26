Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({toUserId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
    return Notifications.find({toUserId: Meteor.userId(), read: false}).count();
  }
});

Template.notificationItem.helpers({
  notificationUserPathComment: function() {
    console.log()
    return Router.routes.showProfile.path({_id: this.toUserId});
  },
});

Template.notificationItem.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});