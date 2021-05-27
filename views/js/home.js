$(() => {
    const url = "http://localhost:5555/products";
    const user_info = "http://localhost:5555/user/info";

    //Getting User Data to display the name
    $.get(user_info).done((data) => {
        let name = $('.navbar-brand');
        name.text(`Hello, ${data}!`);
    });

    //Getting the complete list of products to display them in Card format
    $.get(url).done((data) => { populateData(data) });

    //Creating card of all the products to display
    function createCard(product) {
        let div = $(`<div class="card"></div>`);
        let img = $(`<img class="card-img-top" src=${product.image_url} alt="Card image cap"></img>`);
        let cardBody = $(`<div class="card-body"></div>`);
        let cardDetails = $(`<h6 class="card-title">${product.name}</h6>
                           <p class="card-text">Price: <b>₹ ${product.price}</p>
                        `);

        let addtoCartButton = $(`<button type = "button" id = "${product._id}" class="btn btn-primary"> Add to Cart</button>`);

        cardBody.append(cardDetails);
        div.append(img);
        div.append(cardBody);
        div.append(addtoCartButton);

        addtoCartButton.click((event) => {
            event.preventDefault();

            $.ajax({
                url: "http://localhost:5555/user/cart/" + product._id,
                method: 'POST',
            }).done(() => window.location.replace("http://localhost:5555/user/cart"));
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