var divs = $(".slider div");
var i = 0;

function iterate() {
    if (i >= divs.length) {
        i = 0;
    }

    $(".image").removeClass("active");
    $(divs[i]).addClass("active");

    i++;
}

setInterval(iterate, 5000);


/*Counter Increment and Decrement Input Field Section*/

function increaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
}

function decreaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('number').value = value;
}