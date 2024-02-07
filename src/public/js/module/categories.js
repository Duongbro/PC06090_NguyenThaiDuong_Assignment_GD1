const {
  db,
  ref,
  set,
  get,
  child,
  onValue,
  getStorage,
  storageRef,
  getDownloadURL,
  listAll,
} = require("../../../firebase");
class categories {
  constructor() {
    this.categories = [];
  }
  get_all() {
    return new Promise((resolve, reject) => {
      onValue(ref(db, "categories"), (snapshot) => {
        const data = snapshot.val();
        for (let id in data) {
          if(data[id].status === 1 ){
            this.categories.push(data[id]);
          }
        }
        resolve(this.categories);
      });
    });
  }
  get_one(id) {
    return new Promise((resolve, reject) => {
      onValue(ref(db, "categories/" + id), (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      });
    });
  }
  add(data) {
    return new Promise((resolve, reject) => {
      set(ref(db, "categories/" + data.id), data, (error) => {
        if (error) {
          reject("Data could not be saved." + error);
        } else {
          resolve("Data saved successfully.");
        }
      });
    });
  }
  getlimitnew(limit) {
    return new Promise(async (resolve, reject) => {
      await onValue(ref(db, "Categories"), (snapshot) => {
        const data = snapshot.val();
        let categories = [];
        for (let index = 1; index <= limit; index++) {
          categories.push(data[index]);
        }
        resolve(categories);
      });
    });
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      set(ref(db, "categories/" + id + "/status"), 0);
      resolve("Xóa thành công!");
    });
  }
  update(id, data) {
    return new Promise(async (resolve, reject) => {
      await set(ref(db, "categories/" + id), data, (error) => {
        if (error) {
          reject("Data could not be saved." + error);
        } else {
          resolve("Data saved successfully.");
        }
      });
    });
  }
}

module.exports = categories;
