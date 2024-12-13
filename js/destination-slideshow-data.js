jQuery(document).ready(function ($) {
  $(".planets__slideshow.owl-carousel").owlCarousel({
    smartSpeed: 1200,
    items: 1,
    nav: false,
    dots: true,
    dotsData: true,
    margin: 50,
  });

  fetch("./data.json").then((response) => {
    response.json().then((datas) => {
      datas.destinations.map((destination) => {
        $(".owl-carousel")
          .trigger("add.owl.carousel", [
            `
                <div class="planets__slideshow__item" data-dot="<button>${destination.name}</button>">
                    <div class="planets__slideshow__item__img">
                        <img src="${destination.images.png}" alt="Image Moon">
                    </div>
                    <div class="planets__slideshow__item__text">
                        <h2 class="planets__slideshow__item__text__title">
                            ${destination.name}
                        </h2>
                        <p class="planets__slideshow__item__text__paragraph paragraph">
                            ${destination.description}
                        </p>
                        <div class="planets__slideshow__item__text__more">
                            <div class="planets__slideshow__item__text__more__avg-distance">
                                <span>Avg. distance</span>
                                <p>${destination.distance}</p>
                            </div>
                            <div class="planets__slideshow__item__text__more__travel-time">
                                <span>Est. travel time</span>
                                <p>${destination.travel}</p>
                            </div>
                            <div class="planets__slideshow__item__text__more__travel-time">
                                <span>Est. cost</span>
                                <p>${destination.cost}</p>
                            </div>
                        </div>
                    </div>
                </div>`,
          ])
          .trigger("refresh.owl.carousel");
      });
    });
  });
});
