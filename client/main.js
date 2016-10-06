Tracker.autorun(function () {
  if (! Meteor.user()) Router.go('/')
})
