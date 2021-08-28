window.onload = function () {
    const buttonRights = document.getElementsByClassName('slideRight');
    const buttonLefts = document.getElementsByClassName('slideLeft');

    console.log(buttonRights)

    for (var i = 0; i < buttonRights.length; i++) {
        buttonRights[i].addEventListener("click", e => {
            const slide = e.target.parentElement;
            slide.scrollLeft += (slide.clientWidth / 4);
        })
    }



    for (var i = 0; i < buttonLefts.length; i++) {
        buttonLefts[i].addEventListener("click", e => {
            const slide = e.target.parentElement;
            slide.scrollLeft -= (slide.clientWidth / 4);
        })
    }

}

