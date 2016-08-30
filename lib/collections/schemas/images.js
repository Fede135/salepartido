var imageStore = new FS.Store.GridFS("images", {
  chunkSize: 100 * 1024,
})

Images = new FS.Collection("images", {
  stores: [imageStore],

  filter: {
    maxSize: 2 * 1024 * 1024, //Tamaño maximo de la imagen: 2mb

    allow: {
      insert: function (userId) {
        return !!userId;
      },

      update: function (userId) {
        return !!userId;
      },

      remove: function () {
        // TODO: Create a method that checks if the photo is still used by other events
        return false;
      },

      download: function () {
        return true;
      },

      contentTypes: ['image/*'],

      extensions: ['png', 'jpg']
    }
  }
});
