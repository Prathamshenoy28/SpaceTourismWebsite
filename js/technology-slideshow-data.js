jQuery(document).ready(function($) {
    $('.technology__slideshow.owl-carousel').owlCarousel({
        smartSpeed: 1200,
        items: 1,
        nav: false,
        dots: true,
        dotsData: true,
        margin: 50
    });
    
    fetch("./data.json").then((response) => {
        response.json().then((datas) => {
            datas.technology.map((vehicle) => {
                $(".owl-carousel").trigger('add.owl.carousel', [`
                <div class="technology__slideshow__item" data-dot="<button>${vehicle.number}</button>">
                    <div class="technology__slideshow__item__text">
                        <h3 class="technology__slideshow__item__text__subtitle">The terminology...</h3>
                        <h2 class="technology__slideshow__item__text__title">${vehicle.name}</h2>
                        <p class="technology__slideshow__item__text__paragraph paragraph">
                            ${vehicle.description}
                        </p>
                    </div>
                    <picture class="technology__slideshow__item__img">
                        <source media="(min-width: 1280px)" srcset="${vehicle.images.portrait}">
                        <source media="(min-width: 320px)" srcset="${vehicle.images.landscape}">
                        <img src="https://www.shopvita.com.br/images/image-404.png" alt="Image Vehicle - ${vehicle.name}">
                    </picture>
                </div>`]).trigger("refresh.owl.carousel");
            })
        }); 
    });
});