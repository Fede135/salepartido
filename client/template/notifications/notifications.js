Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({toUserId: Meteor.userId(), read: false}, {sort:{createAt:-1}, limit:10});
  },
  notificationCount: function(){
    return Notifications.find({toUserId: Meteor.userId(), read: false}).count();
  }
});

Template.notificationItem.helpers({
  notificationUserPathComment: function() {
    return Router.routes.showProfile.path({_id: this.toUserId});
  },
});

Template.notificationItem.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});