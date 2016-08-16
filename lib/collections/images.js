Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "/home/tincho/Documentos/FEDE_GIT/salepartido/lib/uploads"})], // ruta donde se guardan los archivos, no tendria que ser una carpeta del proyecto


	filter : {
		maxSize: 2097152, //Tamaño maximo de la imagen: 2mb
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
  			extensions: ['png','jpg']
  		}

  	}
});
