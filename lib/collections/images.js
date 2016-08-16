Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "/home/tincho/Documentos/FEDE_GIT/salepartido/lib/uploads"})]
});

Images.allow({
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
  }
});