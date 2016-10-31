Tracker.autorun(function () {
  if (! Meteor.user() && ! Meteor.loggingIn()) {
    Router.go('/')
  };
})
Meteor.startup(function () {
	moment.locale('es');
});