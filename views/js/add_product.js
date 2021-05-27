$(() => {
    const user_info = "http://localhost:5555/user/info";

    //Getting User Data to display the name
    $.get(user_info).done((data) => {
        let name = $('.navbar-brand');
        name.text(`Hello, ${data}!`);
    });
});