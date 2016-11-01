Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({toUserId: Meteor.userId(), read: false}, {sort:{createAt:-1}, limit:10});
  },
  notificationCount: function() {
    return Notifications.find({toUserId: Meteor.userId(), read: false}).count();
  },
});


Template.notifications.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  },
  'click #verTodas': function () {
    Router.go('allNotifications',{_id: Meteor.userId()});
  }
});


