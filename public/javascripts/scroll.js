window.onload = function () {
    const buttonRights = document.getElementsByClassName('slideRight');
    const buttonLefts = document.getElementsByClassName('slideLeft');


    for (var i = 0; i < buttonRights.length; i++) {

        buttonRights[i].onclick = function () {
            buttonRights[i].nextElementSibling.scrollLeft += 20;
        };

    }

    for (var i = 0; i < buttonLefts.length; i++) {
        buttonLefts[i].onclick = function () {
            buttonLefts[i].nextElementSibling.nextElementSibling.scrollLeft -= 20;
        };
    }



}


