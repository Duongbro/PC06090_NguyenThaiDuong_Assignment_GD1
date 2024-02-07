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
  push,
} = require("../../../firebase");

const product = require("./product");
const cart = require("./cart");
const user = require("./user");

class orders {
  constructor() {
    this.order = [];
  }
  get_all() {
    return new Promise(async (resolve, reject) => {
      const snapshot = await get(ref(db, "orders"));
      const data = snapshot.val();
      for (let id in data) {
        this.order.push(data[id]);
      }
      resolve(this.order);
    });
  }
  add(address, email, name, phone, id_user) {
    return new Promise(async (resolve, reject) => {
      let check = false;
      this.get_all().then((data) => {
        let id = data.length + 1;
        data.push({
          created_date: new Date().toISOString(),
          customer_address: address,
          customer_email: email,
          customer_name: name,
          customer_phone: phone,
          status: "Chờ xác nhận",
          id: id,
        });
        set(ref(db, "orders"), data)
          .then(() => {
            const cartclass = new cart();
            let datadetail = [];
            cartclass.getall(id_user).then((data) => {
              console.log(data);
              data.forEach((element) => {
                datadetail.push({
                  product_id: element.id,
                  quantity: element.quantity,
                  price: element.price,
                });
              });
              console.log(datadetail);
              this.add_detail(id, datadetail).then(() => {
                resolve("Dữ liệu đã được lưu thành công!");
              });
            });
          })
          .catch((error) => {});
      });
    });
  }
  getAllDetails() {
    return new Promise(async (resolve, reject) => {
      let details = [];
      const snapshot = await get(ref(db, "order_detail"));
      const data = snapshot.val();
      for (let id in data) {
        details.push(data[id]);
      }
      resolve(details);
    });
  }
  async add_detail(idOrder, dataDetails) {
    try {
      console.log(dataDetails);
      const allDetails = await this.getAllDetails();

      const newDetails = dataDetails.map((element) => ({
        id: allDetails.length,
        order_id: idOrder,
        product_id: element.product_id,
        quantity: element.quantity,
        price: element.price,
      }));
      allDetails.push(...newDetails);
      await set(ref(db, "order_detail"), allDetails);

      return "Data saved successfully.";
    } catch (error) {
      return "Data could not be saved." + error;
    }
  }
  get_all_by_id(id_order) {
    return new Promise(async (resolve, reject) => {
      let all_Details = await this.getAllDetails();
      let orders_detail = [];
      let detailsid = all_Details.filter((element) => {
        if (element.order_id == id_order) {
          orders_detail.push(element);
        }
      });
      resolve(orders_detail);
    });
  }
  order_accept(id) {
    return new Promise(async (resolve, reject) => {
      let allOders = await this.get_all();
      allOders.forEach((element) => {
        if (element.id == id) {
          element.status = "Đã xác nhận";
        }
      });
      set(ref(db, "orders"), allOders)
        .then(() => {
          resolve("Dữ liệu đã được lưu thành công!");
        })
        .catch((error) => {
          reject("Data could not be saved." + error);
        });
    });
  }
}
module.exports = orders;
