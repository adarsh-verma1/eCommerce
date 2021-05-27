$(() => {
    const url = "http://localhost:5555/products/myproducts";
    const user_info = "http://localhost:5555/user/info";

    //Getting User Data to display the name
    $.get(user_info).done((data) => {
        let name = $('.navbar-brand');
        name.text(`Hello, ${data}!`);
    });

    //Getting the list of products user has added to display them in Card format
    $.get(url).done((data) => { populateData(data) });

    //Creating card of all the products to display
    function createCard(product) {
        let div = $(`<div class="card"></div>`);
        let img = $(`<img class="card-img-top" src=${product.image_url} alt="Card image cap"></img>`);
        let cardBody = $(`<div class="card-body"></div>`);
        let cardDetails = $(`<h6 class="card-title">${product.name}</h6>
                           <p class="card-text">Price: <b>₹ ${product.price}</p>
                        `);

        let buttons = $(`<div id = "buttons" ></div>`);
        let editButton = $(`<a href = "/user/edit_product/${product._id}" class="btn btn-primary" > Edit</a>`);
        let deleteButton = $(`<button type = "button" id = "${product._id}" class="btn btn-danger" > Delete</button>`);

        buttons.append(editButton);
        buttons.append(deleteButton);
        cardBody.append(cardDetails);
        div.append(img);
        div.append(cardBody);
        div.append(buttons);

        deleteButton.click((event) => {
            event.preventDefault();

            swal({
                title: "Are you sure to delete this product?",
                icon: "warning",
                buttons: ['NO', 'YES'],
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    $.ajax({
                        url: "http://localhost:5555/products/" + product._id,
                        method: 'DELETE',
                    }).done(() => window.location.replace("http://localhost:5555/user/my_product"));
                }
            });
        });
        return div;
    }


    function populateData(res) {
        let productList = $(".cards");
        productList.empty();

        for (let i = 0; i < res.length; i++) {
            let newItem = createCard(res[i]);
            productList.append(newItem);
        }
    }
});
