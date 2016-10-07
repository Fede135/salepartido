Tracker.autorun(function () {
  if (! Meteor.user() && ! Meteor.loggingIn()) Router.go('/')
})
