$(function() {
	
	var mySwiper = new Swiper ('.swiper-container', {
		// Optional parameters
		direction: 'horizontal',
		simulateTouch: false,
		loopedSlides: 6,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
			hideOnClick: true,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		autoplay: {
			delay: 5000,
		},
			  
	});



	$('.swiper-slide, .swiper-navigation').hover(function(e){
		if( this == e.currentTarget  ){
			mySwiper.autoplay.stop();
		}			
	},function(){
		mySwiper.autoplay.stop();		
	});

	function peek_in(){
		mySwiper.setTransition(200);		
		mySwiper.setTranslate(mySwiper.translate + 100);
	}

	function peek_out(){
		mySwiper.setTransition(200);	
		mySwiper.setTranslate(mySwiper.translate - 100);
	}
	

	$( ".swiper-button-prev" ).on( "mouseenter", peek_in );
	$( ".swiper-button-prev" ).on( "mouseleave", peek_out );	


	$( ".swiper-button-prev" ).click(function(){
		$( ".swiper-button-prev" ).off("mouseleave", peek_out);
	}).mouseout(function(){
		if( $( ".swiper-button-prev" ).off("mouseleave", peek_out) ){
			$( ".swiper-button-prev" ).on("mouseleave", peek_out);
		}
	});

	$( ".swiper-button-next" ).on( "mouseenter", peek_out );
	$( ".swiper-button-next" ).on( "mouseleave", peek_in );


	$( ".swiper-button-next" ).click(function(){
		$( ".swiper-button-next" ).off("mouseleave", peek_in);
	}).mouseout(function(){
		if( $( ".swiper-button-next" ).off("mouseleave", peek_in) ){
			$( ".swiper-button-next" ).on("mouseleave", peek_in);
		}
	});





	$(document).scroll(function(){
		var y = $(document).scrollTop(),
			nav = $('.navigation');
		if( y < 100 ){
			nav.css({position: 'absolute', display: 'block', 'border-bottom': ''});
		}		
		if ( y > 100 && y < 200){
			nav.css({display: 'none'});
		}
		if( y > 200){
			nav.css({position: 'fixed', 'border-bottom': '1px solid #444444'});	
			setTimeout(function(){
				nav.slideDown(200);
			}, 300);
			$('.drop-down').removeClass('active');
			$('.sub-nav').slideUp(200);
			$('.search-nav i').removeClass('fa-times').addClass('fa-search');
			$('.lang-nav i').removeClass('fa-angle-down').addClass('fa-angle-right');
		}
	});
	
	$('.main-nav li').click(function(){
		$(this).toggleClass('active');
		$(this).siblings().removeClass('active');
	});
	
	$('.drop-down').click(function(e){
		e.preventDefault();

		$(this).toggleClass('active');	
		$(this).find('.sub-nav').slideToggle(200);
		$(this).find('.sub-nav').find('input').focus();

		if( $(this).parent().siblings().find('li').hasClass('active') ){
			$(this).parent().siblings().find('li').removeClass('active');
			$(this).parent().siblings().find('.sub-nav').slideUp(200);
			
		}

		if ( $(this).parent().hasClass('lang-nav') ){
			$(this).find('i').toggleClass('fa-angle-right, fa-angle-down');
			$('.search-nav i').removeClass('fa-times').addClass('fa-search');
		}else{
			$('.sub-nav input').val('');
			$(this).find('i').toggleClass('fa-search, fa-times');
			$('.lang-nav i').removeClass('fa-angle-down').addClass('fa-angle-right');
		}				
	});


	$('.sub-nav a, input').click(function(e){
		e.stopPropagation();	
	});


	$(document).mouseup(function (e){ // событие клика по веб-документу
		if (!$('.drop-down').is(e.target) // если клик был не по нашему блоку
		    && $('.drop-down').has(e.target).length === 0) { // и не по его дочерним элементам
				$('.sub-nav').slideUp(200);
				$('.sub-nav input').val('');
				$('.drop-down').removeClass('active');
				$('.search-nav i').removeClass('fa-times').addClass('fa-search');
				$('.lang-nav i').removeClass('fa-angle-down').addClass('fa-angle-right');

		}
	});
	$('#search-form').submit(function(e){
		e.preventDefault();
	});
	$('#search-form').keyup(function(){

		var item = $('.search-item'),
			value = $('#search-form input').val().toUpperCase(),
			text,
			a = "";

			

		for ( var i = 0; i < item.length; i++ ){
			text = item.eq(i).find('p').eq(0);

			console.log(text.text().toUpperCase().indexOf(value))
			
			if ( text.html().length > 100 ){				
				var cut = text.html().slice(0, 100);
				text.text(cut + '...');


			}

			if ( text.text().toUpperCase().indexOf(value) > -1){
				item.eq(i).css({display: 'block'});
			}else{
				item.eq(i).css({display: 'none'});
			}
		}


		// var item = $('.search-item'),
		// 	value = $('#search-form').find('input').val();

		// for ( var i = 0, len = item.length;  i < len; i++){

		// 	var text = item.eq(i).find('p').html();

		// 	if ( text.length > 100 ){
				
		// 		text = text.slice(0, 100);

		// 		item.eq(i).find('p').text(text + '...');

		// 	}
			
		// 	var result = item.eq(i).find('p').html().match(value);

		// 	console.log(result.toString());	

		// 	if ( result && value != "" ){
		// 		item.eq(i).css({display: 'block'});				
		// 	}else{
		// 		item.eq(i).css({display: 'none'});
		// 	}
			
			
		// }
		




	});
	$('.products').isotope({
		// options
		itemSelector: '.product',
		layoutMode: 'fitRows',
		filter: '.main',
	});
	$('.products').on( 'click', 'div', function() {
		var filterValue = $(this).attr('data-filter');
		$('.products').isotope({ filter: filterValue });
		console.log(filterValue);
	});



});
