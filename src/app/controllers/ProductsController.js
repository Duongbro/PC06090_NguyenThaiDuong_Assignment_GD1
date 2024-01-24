class ProductsController {
    //Get trang sản phẩm
    index(req, res) {
        const API_URL = "http://localhost:3000/products";

        const CATEGORIES_URL = "http://localhost:3000/categories";
        let html = "";
        let html1 = "";

        // Load ra dữ liệu của product
        fetch(API_URL)
            .then(function (response) {
                response.json().then(function (productData) {
                    //load ra dữ liệu của categories
                    fetch(CATEGORIES_URL)
                        .then(function (response) {
                            response.json().then(function (categoryData) {
                                categoryData.map(item1 => {
                                    html1 += `
                                    <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".${item1.id}"> ${item1.name} </button>
                                    `
                                })
                                productData.map(item => {

                                    html += `
                                        <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${item.cate_id}">
                                            <!-- Block2 -->
                                            <div class="block2" id="load_all_product">
                                                <div class="block2-pic hov-img0">
                                                    <img src="${item.image}" alt="IMG-PRODUCT">
                
                                                    <a href="#"
                                                        class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                                        Xem Nhanh
                                                    </a>
                                                </div>
                
                                                <div class="block2-txt flex-w flex-t p-t-14">
                                                    <div class="block2-txt-child1 flex-col-l ">
                                                        <a href="/product/product_detail?id=${item.id}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                                        ${item.name}
                                                        </a>
                
                                                        <span class="stext-105 cl3">
                                                        ${item.price}VNĐ
                                                        </span>
                                                    </div>
                
                                                    <div class="block2-txt-child2 flex-r p-t-3">
                                                        <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                                            <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png"
                                                                alt="ICON">
                                                            <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png"
                                                                alt="ICON">
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        `;
                                });
                                res.render('product', { load_all_product: html, categories: html1 });
                            })

                        })
                        .catch(function (error) {
                            console.log("Error: \n" + error);
                        })

                })

            })
            .catch(function (error) {
                console.log("Error: \n" + error);
            })

    }

    //Get trang chi tiết sản phẩm
    product_detail(req, res) {
        const id_product = req.query.id;

        const API_URL = "http://localhost:3000/products/";

        fetch(API_URL + id_product)
            .then(function (response) {
                response.json().then(function (data) {
                    console.log(data.name);
                    res.render('product_detail', {
                        product_detail_id: data.id,
                        product_detail_name: data.name,
                        product_detail_image: data.image,
                        product_detail_price: data.price
                    });
                })

            })
            .catch(function (error) {
                console.log("Error: \n" + error);
            })
    }

}
module.exports = new ProductsController;