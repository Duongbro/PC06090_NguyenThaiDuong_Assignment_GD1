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
const categories = require("../module/categories");

class product {
  constructor() {
    this.product = [];
  }
  get_All(catetype, priceRange) {
    return new Promise((resolve, reject) => {
      onValue(ref(db, "products"), (snapshot) => {
        const data = snapshot.val();
        for (let id in data) {
          if (data[id].status == 1) {
            let category = new categories();
            category.get_one(data[id].cate_id).then((dataCate) => {
              if (catetype == dataCate.id) {
                this.product.push(data[id]);
              } else if (priceRange) {
                if (Number(priceRange) >= Number(data[id].price)) {
                  this.product.push(data[id]);
                  console.log(data[id]);
                }
              } else if (catetype == undefined && priceRange == undefined) {
                this.product.push(data[id]);
              }
            });
          }
        }
        resolve(this.product);
      });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      onValue(ref(db, "products"), (snapshot) => {
        const data = snapshot.val();
        for (let id in data) {
          if (data[id].status === 1) {
            this.product.push(data[id]);
          }
        }
        resolve(this.product);
      });
    });
  }

  get_one(id) {
    return new Promise((resolve, reject) => {

      // get(child(ref(db), `products/` + id)).then((snapshot) => {
      //   if (snapshot.exists()) {
      //     resolve(snapshot.val());
      //   } else {
      //     console.log("No data available");
      //   }
      // }).catch((error) => {
      //   console.error(error);
      // });

      onValue(ref(db, "products/" + id), (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      });
    });
  }
  get_new_limit(limit) {
    return new Promise(async (resolve, reject) => {
      await onValue(ref(db, "products"), (snapshot) => {
        const data = snapshot.val();
        let product = [];
        for (let index = 1; index <= limit; index++) {
          product.push(data[index]);
        }
        resolve(product);
      });
    });
  }
  add(data) {
    return new Promise((resolve, reject) => {
      function writeUserData(data) {
        set(ref(db, "products/" + data.id), data);
      }
      writeUserData(data);
      resolve("Thêm thành công!");
    });
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      set(ref(db, "products/" + id + "/status"), 0);
      resolve("Xóa thành công!");
    });
  }
}

module.exports = product;
