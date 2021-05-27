$(() => {
    const product_info = "http://localhost:5555/products/" + window.location.href.split('/').pop();
    const user_info = "http://localhost:5555/user/info";

    //Getting User Data to display the name
    $.get(user_info).done((data) => {
        let name = $('.navbar-brand');
        name.text(`Hello, ${data}!`);
    });

    //Putting previous values of the item in the input field so that unedited need not be filled again
    $.get(product_info).done((product) => {
        $('#name').val(product.name);
        $('#image_url').val(product.image_url);
        $('#manufactured_by').val(product.manufactured_by);
        $('#price').val(product.price);
    })

    $('#update_button').click((event) => {
        event.preventDefault();

        let product = {};
        product.name = $('#name').val();
        product.image_url = $('#image_url').val();
        product.manufactured_by = $('#manufactured_by').val();
        product.price = $('#price').val();

        $.post(product_info, product).done(() => window.location.replace("http://localhost:5555/user/my_product"));
    });
});
