/* -----------------------------------------------------------------------------



File:           JS Core
Version:        1.0
Last change:    00/00/00 
-------------------------------------------------------------------------------- */
(function() {

	"use strict";

	var Bixol = {
		init: function() {
			this.Basic.init();  
		},

		Basic: {
			init: function() {
				this.preloader();
				this.BackgroundImage();
				this.ScrollTopBtn();
				this.Animation();
				this.HeaderSticky(); 
				this.MobileMenu();
                this.Carousel();
                this.CustomCompareSlider();
				this.PortfolioFilter(); 
				this.Accordion(); 
				this.CircleProgress(); 
				this.H4HeaderSearch();
				this.ServicesHover(); 
				this.BixolPopup();
				this.BixolCounterUp(); 
				this.GridMassonry();
				this.CountDown();
			},

			preloader: function (){
				$(window).on('load', function() {
					$("#ct-loadding").fadeOut();
				});
			},

			BackgroundImage: function (){
				$('[data-background]').each(function() {
					$(this).css('background-image', 'url('+ $(this).attr('data-background') + ')');
				});
			},

			ScrollTopBtn: function (){
				$(window).on("scroll", function(){
					var ScrollBar = $(this).scrollTop(); 
					if( ScrollBar > 200 ) {
						$(".scrolltop-btn").addClass("visible");
					} else {
						$(".scrolltop-btn").removeClass("visible");
					}
				});

				$(".scrolltop-btn").on("click", function(e){
					e.preventDefault();
					$("body,html").animate({
						scrollTop: 0, 
					}, 'easeInOutExpo');
				});
			},

            Animation: function (){
				$(window).on("load", function(){
					if($('.wow').length){
						new WOW({
							offset: 100,
							mobile: true
						}).init()
					}
				});
			},

			HeaderSticky: function (){
				$(window).on("scroll", function(){
					var ScrollBar = $(this).scrollTop();
					if (ScrollBar > 150 ) {
						$(".bixol-header").addClass("header-sticky"); 
					} else {
						$(".bixol-header").removeClass("header-sticky");
					}
				});
			},

			MobileMenu: function (){

				$(".bixol-mobile-hamburger").on("click", function(){
					$(".bixol-mobile-menu").toggleClass("mobile-menu-active"); 
					$(this).toggleClass("active");
				});

				$(".bixol-mobile-menu ul li.has-submenu a").each(function(){
					$(this).on("click", function(){
						$(this).siblings('ul').slideToggle();
					});
				});
			},

            Carousel: function (){

                $(".bixol-service-slider").slick({
                    slidesToShow: 3,
                    autoplay: true,
                    prevArrow: '<button type="button" class="prev-arrow"><i class="fas fa-angle-left"></i></button>',
                    nextArrow: '<button type="button" class="next-arrow"><i class="fas fa-angle-right"></i></button>',
					responsive: [
						{
							breakpoint: 960, 
							settings: {
								slidesToShow: 2,
							}
						}, 
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 1,
							}
						}
					]
				});

				$(".bixol-team-slider").slick({
					slidesToShow: 4, 
					autoplay: true,
					dots: true,
					arrows: false,
					responsive: [
						{
							breakpoint: 1000, 
							settings: {
								slidesToShow: 3,
							}
						},
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 2,
							}
						},
						{
							breakpoint: 576, 
							settings: {
								slidesToShow: 1,
							}
						}
					]
				}); 

				$(".bixol-feedback-slider").slick({
					slidesToShow: 3, 
					autoplay: true, 
					dots: true,
					arrows: false,
					responsive: [
						{
							breakpoint: 992, 
							settings: {
								slidesToShow: 2, 
							}
						}, 
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 1,
							}
						}
					]
				}); 

				$(".bixol-blog-slider").slick({
					slidesToShow: 2, 
					autoplay: true,
					arrows: false, 
					dots: true,
					responsive: [
						{
							breakpoint: 1200, 
							settings: {
								slidesToShow: 1, 
							}
						}
					]
				});

				$(".ab-service-slider").slick({
					slidesToShow: 3, 
					autoplay: true, 
					arrows: false, 
					dots: true, 
					responsive: [
						{
							breakpoint: 992, 
							settings: {
								slidesToShow: 2,
							}
						}, 
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 1,
							}
						}
					]
				}); 

				$(".abv2-sr-slider").slick({
					slidesToShow: 3, 
					autoplay: true, 
					arrows: false, 
					dots: true,
					responsive: [
						{
							breakpoint: 1100, 
							settings: {
								slidesToShow: 2, 
							}
						}, 
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 1,
							}
						}
					]
				}); 

				$(".abv2-feedback-wrapper").slick({
					slidesToShow: 3,
					slidesToScroll: 3,
					dots: true, 
					arrows: false,
					responsive: [
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2,
							}
						}, 
						{
							breakpoint: 576, 
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
							}
						}
					]
				});

				$(".srv2-feedback-slider").slick({
					slidesToShow: 3,
					slidesToScroll: 2,
					autoplay: true,
					arrows: false, 
					dots: true,
					responsive: [
						{
							breakpoint: 992, 
							settings: {
								slidesToShow: 2,
							}
						}, 
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 1,
							}
						}
					]
				});

				$(".sr-details-slider").slick({
					slidesToShow: 2, 
					autoplay: true,
					prevArrow: '<button type="button" class="prev-btn"><i class="fas fa-angle-left"></i></button>', 
					nextArrow: '<button type="button" class="next-btn"><i class="fas fa-angle-right"></i></button>', 
					responsive: [
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 1,
							}
						}
					]
				});

				$(".home2-service-slider").slick({
					slidesToShow: 3, 
					autoplay: true,
					prevArrow: '<button type="button" class="prev-btn"><i class="fas fa-angle-left"></i></button>',
					nextArrow: '<button type="button" class="next-btn"><i class="fas fa-angle-right"></i></button>',
					responsive: [
						{
							breakpoint: 992, 
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2,
							}
						},
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
							}
						}
					]
				});

				$(".home2-brand-slider").slick({
					autoplay: true,
					slidesToShow: 4, 
					arrows: false, 
					responsive: [
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 3,
							}
						},
						{
							breakpoint: 460, 
							settings: {
								slidesToShow: 2,
							}
						}
					]
				});

				$(".home2-blog-slider").slick({
					autoplay: true, 
					slidesToShow: 3, 
					arrows: false, 
					dots: true, 
					slidesToScroll: 2,
					responsive: [
						{
							breakpoint: 992, 
							settings: {
								slidesToShow: 2,
							}
						},
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 1,
								sliedesToScroll: 1,
							}
						}
					]
				});

				$(".h4-project-slider").slick({
					autoplay: false, 
					slidesToShow: 4, 
					arrows: false, 
					dots: true,
					slidesToScroll: 3,
					responsive: [
						{
							breakpoint: 992, 
							settings: {
								slidesToShow: 3,
							}
						},
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2,
							}
						},
						{
							breakpoint: 576, 
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
							}
						}
					]
				});
				
				$(".h5-service-slider").slick({
					autoplay: true, 
					infinite: false,
					slidesToShow: 3, 
					arrows: false, 
					dots: true, 
					slidesToScroll: 1,
					responsive: [
						{
							breakpoint: 992, 
							settings: {
								slidesToShow: 2,
							}
						},
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 1,
							}
						}
					]
				});

				$(".home5-feedback-slider").slick({
					autoplay: true, 
					infinite: false, 
					slidesToShow: 3, 
					slidesToScroll: 1,
					prevArrow: '<button type="button" class="prev-btn"><i class="fas fa-arrow-left"></i></button>',
					nextArrow: '<button type="button" class="next-btn"><i class="fas fa-arrow-right"></i></button>',
					responsive: [
						{
							breakpoint: 992, 
							settings: {
								slidesToShow: 2,
							}
						}, 
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 1,
							}
						}
					]
				});

				$(".home5-portfolio-slider").slick({
					autoplay: true, 
					slidesToShow: 3, 
					slidesToScroll: 2,
					prevArrow: '<button type="button" class="prev-btn"><i class="fas fa-arrow-left"></i></button>',
					nextArrow: '<button type="button" class="next-btn"><i class="fas fa-arrow-right"></i></button>',
					responsive: [
						{
							breakpoint: 992, 
							settings: {
								slidesToShow: 2,
							}
						}, 
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 1,
							}
						}
					]
				});

				$(".h5-blog-slider").slick({
					autoplay: true, 
					slidesToShow: 3, 
					slidesToScroll: 1, 
					prevArrow: '<button type="button" class="prev-btn"><i class="fas fa-arrow-left"></i></button>',
					nextArrow: '<button type="button" class="next-btn"><i class="fas fa-arrow-right"></i></button>',
					responsive: [
						{
							breakpoint: 992, 
							settings: {
								slidesToShow: 2,
							}
						}, 
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 1,
							}
						}
					]
				});

				$(".home6-feedback-slider").slick({
					autoplay: true, 
					slidesToShow: 1, 
					slidesToScroll: 1,
					dots: true, 
					arrows: false,
				});

				$(".home7-service-slider").slick({
					autoplay: true, 
					slidesToShow: 3, 
					slidesToScroll: 2,
					dots: true,
					arrows: false,
					responsive: [
						{
							breakpoint: 992, 
							settings: {
								slidesToShow: 2,
							}
						}, 
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 1,
							}
						}, 
					]
				}); 

				$(".home7-feedback-slider").slick({
					autoplay: true, 
					slidesToShow: 2, 
					slidesToScroll: 1,
					dots: true, 
					arrows: false,
					responsive: [
						{
							breakpoint: 768, 
							settings: {
								slidesToShow: 1,
							}
						}
					]
				});

            }, 

            CustomCompareSlider: function (){
                $('.before-after').beforeAfter();
            }, 

			PortfolioFilter: function (){

				var $pfFilter = $(".portfolio-filter .grid");

				var itemLength = $pfFilter.children().length; 
				if( itemLength > 0 ) {
					$pfFilter.isotope({
						itemSelector: '.grid-item',
						masonry: {
						  columnWidth: 1
						},
					});
	
					$('.portfolio-filter .filter-button-group').on( 'click', 'li', function() {
						var filterValue = $(this).attr('data-filter');
						$pfFilter.isotope({ filter: filterValue });
					});
	
					$(".portfolio-filter .filter-button-group li").each(function(){
						$(this).on("click", function(){
							$(this).siblings("li.active").removeClass("active"); 
							$(this).addClass("active");
						});
					});
				}
			}, 

			Accordion: function (){
				var target = $(".accordion .collapse.show"); 
				target.parent().addClass("active");

				$(".accordion .accordion-header a").each(function(){
					$(this).on("click", function(){
						$(this).parents(".accordion").find(".accordion-item.active").removeClass("active");
						$(this).parents(".accordion-item").addClass("active");
					})
				});
			}, 

			CircleProgress: function (){
				if($(".skills-progress").length) {
					$(".skills-progress").appear(); 
					$(document.body).on("appear", ".skills-progress", function(e){
						var skillProgress = $(".skills-progress"); 
						skillProgress.each(function(){

							$(this).pieChart({
								barColor: '#0431b8',
								trackColor: '#cddae6',
								lineWidth: 10,
								size: 130,
								rotate: 0,
								lineCap: '',
								animate: {
								duration: 1500,
								enabled: true
								},
							});
						})
					})
				}
			}, 
			H4HeaderSearch: function (){
				$(".h4-header-search span").on("click", function(){
					$(".h4-header-search-form").addClass("search-form-open");
				}); 

				$(".form-close").on("click", function(){
					$(".h4-header-search-form").removeClass("search-form-open");
				});
			}, 

			ServicesHover: function (){
				$(".home6-service-bottom .services-column").hover(function(){
					$(this).find(".h6-pera-txt").slideToggle();
				});
			}, 
		
			BixolPopup: function (){
				$(".video-popup").magnificPopup({
					type: 'iframe', 
					iframe: {
						patterns: {
						  youtube: {
							index: 'youtube.com/',
							id: 'v=', 
							src: 'https://www.youtube.com/embed/%id%?autoplay=1' 
						  },
						},
					  }
				});



				/* Video Light Box */
				$('.ct-video-button, .btn-video, .slider-video').magnificPopup({
					type: 'iframe',
					mainClass: 'mfp-fade',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false
				});







			},

			BixolCounterUp: function (){
				if($(".odometer").length) {
					$(".odometer").appear(); 
					$(document.body).on("appear", ".odometer", function(e){
						var odometer = $(".odometer"); 
						odometer.each(function(){
							var dataValue = $(this).attr('data-value'); 
							$(this).html(dataValue);
						});
					});
				}
			}, 

			GridMassonry: function (){
				var $pfFilter = $(".grid-massonry .grid");
				var itemLength = $pfFilter.children().length; 
				if( itemLength > 0 ) {
					$pfFilter.isotope({
						itemSelector: '.grid-item',
						masonry: {
							columnWidth: 1,
						},
					});
				}

			}, 
			CountDown: function (){
				if($(".countdown").length) {
					$('.countdown').downCount({
						date: '02/28/2022 12:00:00',
						offset: +6
					}, function () {
						alert('Countdown done!');
					});
				}
				
			}
		}	
	}
	jQuery(document).ready(function (){
		Bixol.init();

	});

})();
