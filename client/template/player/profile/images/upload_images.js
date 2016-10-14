Template.uploadImages.helpers({
	images: function () {
		return Images.find(); // Where Images is an FS.Collection instance
	},
  countImages: function(){
    return Images.find().count();
  }
});

	/*Template.uploadImages.events({
		'change .myFileInput': function(event, template) {
			var files = event.target.files;
			for (var i = 0, ln = files.length; i < ln; i++) {
				Images.insert(files[i], function (err, fileObj) {
					// Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
				});
			}
		}

	}); */


	Template.uploadImages.events({
    'click input[type="submit"]': function () {
      var file = $('#file').get(0).files[0];
      var result = Images.insert(file);
      console.log('Upload result: ', result);
    }
  });