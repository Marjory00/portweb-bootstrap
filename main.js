
(function() {
    "use strict";


  //    // navbarDropdown
//	if ($(window).width() < 992) {
//		$('#navbarNav .dropdown-toggle').on('click', function () {
//			$(this).siblings('.dropdown-menu').animate({
	//			height: 'toggle'
	//		}, 300);
//		});
 // }


/* Easy on scroll event listener */
const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
}


/* Navbar links active state on scroll */

let navbarlinks = select('#navbar .scrollto', true)
const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
            navbarlink.classlist.add('active')
        } else {
            navbarlink.classlist.remove('active')
        }
        })
    }

    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /* Scrolls to an element with header offset */

    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
        offset -= 16

    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
    })
    }

    /* Toggle .header-scrolled class to #header when page is scrolled */

    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
            }

            window.addEventListener('load', headerScrolled)
            onscroll(document, headerScrolled)
        }



        /* Back-to-top button */

        $(document).ready(function() {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 200) {
                    $('.back-to-tp').addClass('show');
                } else {
                    $('.back-to-top').removeClass('show');
                }
            });
            $('.back-to-top').click(function() {
                $('html, body').animate({scrollTop : 0}, 800);
                return false;
            });
        });

        
        /* Mobile Nav Toggle */

        on('click', '.mobile-nav-toggle', function(e) {
            select('#navbar').classList.toggle('navbar-mobile')
            this.classList.toggle('bi-list')
            this.classList.toggle('bi-x')
        })

        /* Mobile Nav Dropdowns Activate */

        on('click', '.navbar .dropdown > a', function(e) {
            if (select('#navbar').classList.contains('navbar-mobile')) {
                e.preventDefault()
                this.nextElementSibling.classList.toggle('dropdown-active')

            }
        }, true)
    
        /* Scroll with offset on links with a class name .scrollto */

        on('click', '.scrollto', function(e) {
            if (select(this.hash)) {
                e.preventDefault()

                let navbar = select('#navbar')
                if (navbar,classList.contains('navbar-mobile')) {
                    navbar.classList.remove('navbar-mobile')
                    let navbarToggle = select('.mobile-nav-toggle')
                    navbarToggle.classList.toggle('bi-list')
                    navbarToggle.classList.toggle('bi-x')

                }
                scrollto(this.hash)
            }
        }, true)
        
        /* Scroll with offset on page load with hash links in the url*/

        window.addEventListener('load', () => {
            if (window.location.has) {
                if (select(window.location.hash)) {
                    scrollto(window.location.hash)
                }
            }
        });


        /* Preloader */
$(window).on('load', function() {
    // When the page has loaded
    $('.preloader').fadeOut(); // Fade Out the preloader

});


})


/* Portfolio isotope and filter */

window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item'
        });

        let portfolioFilters = select('#portfolio-filters li', true);

        on('click', '#portfolio-filters li', function(e) {
            e.preventDefault();
            portfolioFilters.forEach(function(el) {
                el.classList.remove('filter-active');

            });
            this.classList.add('filter-active');

            portfolioIsotope.arrange({
                filter: this.getAttribute('data-filter')
            
            });
            portfolioIsotope.on('arrangeComplete', function() {
                AOS.refresh()
            });
        }, true);
        }
    
});


    /* Initiate Portfolio Lightbox */

    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    
    /* Portfolio details slider */

    new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    }
    });



    /* Portfolio Shuffle JS Filter and Masonry */

    var Shuffle = window.Shuffle;
    var jQuery = window.jQuery;

    var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
        itemSelector: '.shuffle-item',
        buffer: 1
    });

    jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
        var input = evt.currentTarget;
        if (input.checked) {
            myShuffle.filter(input.value);
        }
    });

    $('.portfolio-gallery').each(function () {
        $(this).find('popup-gallery').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    });



    /* Google Maps */

    let map;

    async function initMap() {
        //@ts-ignore
        const { Map } = await google.maps.importLibrary("maps");

        map = new Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });

    }

    initMap();


    
  function initMap() {
    var myLatLng = {lat: 37.7749, lng: -122.4194};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'San Francisco'
    });

    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.google.com/maps/embed/v1/place?q=San+Francisco&key=YOUR_API_KEY';
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '100%');
    document.getElementById('map').appendChild(iframe);
  }
