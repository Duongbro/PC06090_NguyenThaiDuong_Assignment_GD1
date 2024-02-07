const {
    getStorage,
    storageRef,
    getDownloadURL,
    listAll,
    uploadBytes,
  } = require("../../../firebase");
  
  class Storage {
    constructor() {
      this.storage = getStorage();
      this.storageRef = storageRef(this.storage);
    }
  
    async getAllImages() {
      let listRef = await listAll(this.storageRef);
      let list = [];
  
      for (const itemRef of listRef.items) {
        const downloadURL = await getDownloadURL(itemRef);
        list.push(downloadURL);
      }
  
      return list;
    }
  
    async upload_Image(file) {
      try {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let time =
          hours +
          "-" +
          minutes +
          "-" +
          seconds +
          "-" +
          day +
          "-" +
          month +
          "-" +
          year;
  
        file.originalname = time + "-" + file.originalname;
        this.storageRef = storageRef(this.storage, "manga/" + file.originalname);
  
        const snapshot = await uploadBytes(this.storageRef, file.buffer);
        console.log(snapshot);
  
        // Return the download URL after uploading
        return await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
      }
    }
  }
  
  module.exports = Storage;
  