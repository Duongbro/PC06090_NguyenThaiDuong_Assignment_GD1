let admin_layout = "admin_layout";

class Admin_Controller {
    index(req, res) {
        res.render("./admin_home", { layout: admin_layout });
    }

    categories(req, res) {

        const API_URL = "http://localhost:3000/categories";
        let html = "";

        //load ra dữ liệu của categories
        fetch(API_URL)
            .then(function (response) {
                response.json().then(function (data) {
                    data.map(item => {

                        html += `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            
                            <td><a href="?page=category_update&category_id=<?= $row['category_id'] ?>"><button
                                        type="button"
                                        class="btn btn-gradient-primary btn-sm">Sửa</button></a></td>
                            <td><a href="?page=delete_category&category_id=<?= $row['category_id'] ?>"><button
                                        type="button" class="btn btn-gradient-primary btn-sm" name="delete"
                                        onclick="return confirm('Bạn có muốn xóa danh mục này không?')">Xóa</button></a>
                            </td>
                        </tr>        
                        `;
                    });
                    res.render("./admin_categories", { layout: admin_layout, load_categories: html });
                })

            })
            .catch(function (error) {
                console.log("Error: \n" + error);
            })
    }

    products(req, res) {

        const API_URL = "http://localhost:3000/products";
        let html = "";

        //load ra dữ liệu của categories
        fetch(API_URL)
            .then(function (response) {
                response.json().then(function (data) {
                    data.map(item => {

                        html += `
                        <tr>
                            <td>${item.id}</td>
                            <td>
                                <p
                                    style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;white-space:none;">
                                    ${item.name}
                                </p>
                            </td>
                            <td>${item.price}</td>
                            <td><img src="${item.image}"></td>
                            <td><a href="?page=product_update&product_id=<?= $row['product_id'] ?>"><button
                                        type="button"
                                        class="btn btn-gradient-primary btn-sm">Sửa</button></a></td>
                            <td><a href="?page=delete_product&product_id=<?= $row['product_id']; ?>"><button
                                        type="button" class="btn btn-gradient-primary btn-sm"
                                        onclick="return confirm('Bạn có muốn xóa sản phẩm này không?')">Xóa</button>
                            </td>
                        </tr>
                        `;
                    });
                    res.render("./admin_products", { layout: admin_layout, load_products: html });
                })

            })
            .catch(function (error) {
                console.log("Error: \n" + error);
            })
    }

    orders(req, res) {

        const API_URL = "http://localhost:3000/orders";
        let html = "";

        //load ra dữ liệu của categories
        fetch(API_URL)
            .then(function (response) {
                response.json().then(function (data) {
                    data.map(item => {
                        html += `
                        <tr>
                            <td>
                                ${item.id}
                            </td>
                            <td>
                                ${item.customer_name}
                            </td>
                            <td>
                                ${item.created}
                            </td>
                            <td>
                                ${item.status}
                            </td>
                            <td>
                                <a href="?page=order_detail&orders_id=<?= $row['orders_id']?>"><button
                                        type="button" class="btn btn-gradient-primary btn-sm">Xem chi
                                        tiết</button></a>
                                <a href="?page=order_processing&orders_id=<?=$row['orders_id']?>"><button
                                        type="button" class="btn btn-gradient-primary btn-sm">Xử lý đơn
                                        hàng</button></a>
                            </td>
                        </tr>
                        `;
                    });
                    res.render("./admin_orders", { layout: admin_layout, load_orders: html });
                })

            })
            .catch(function (error) {
                console.log("Error: \n" + error);
            })
    }
}

module.exports = new Admin_Controller;