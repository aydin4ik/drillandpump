$(function() {
    
        
    
        var nav_li = $('.main-nav li'),
            nav_a = $('main-nav a'),
            cover = $('.cover');
    
    
        for ( var i = 0, len = nav_li.length;  i < len; i++){
            nav_li.eq( i ).on('click', function(event){
                var position = $(this).position();
                cover.animate({left: position.left, width: $(this).width(), opacity:"1"}, 500);
                cover.css({height: $(this).height()});
                $(this).children().addClass('active');
                $(this).siblings().children().removeClass('active');	
                
                var items = $(".sub-nav li"),
                lis = $(this).find(items);
                lis.css({width: $(this).width()})
    
                if( $(this).hasClass('drop-down') ){
                    $(this).find($('.sub-nav')).show();
                    $(this).find($('i')).removeClass('fa-angle-right').addClass('fa-angle-down');
    
                    for ( var i = 0, len = lis.length;  i < len; i++){
                        lis.eq(i).delay(i * 150).animate({opacity: 1}, 300);
                    }				
                }else{
                    $('.drop-down').find($('i')).removeClass('fa-angle-down').addClass('fa-angle-right');
                    $('.sub-nav').hide();
                    items.css({opacity: 0});
                }
            });
        }
    
        $(document).scroll(function(){
            var y = $(document).scrollTop(),
                nav = $('.navigation');
            console.log(y);
            if( y < 200 ){
                nav.css({position: 'static', display: 'block', });
                nav.find('a').css({padding: '18px 20px'});
                nav.find('.logo a').css({padding: '15px'});
                nav.find('img').css({width: '40px', top: '18%'});
            }
            
            if ( y > 200 && y < 250){
                nav.css({display: 'none'});
            }
    
            if( y > 250){
                nav.css({position: 'fixed'});
                nav.find('a').css({padding: '8px 20px'});
                nav.find('.cover').css({height: nav.find('li').height()});
                nav.find('.logo a').css({padding: '5px'});
                nav.find('img').css({width: '30px', top: '11%'});
                
                setTimeout(function(){
                    nav.slideDown(200);
                }, 500);
            }
        });
    
        // $('.drop-down').click(function(e) {
        // 	var items = $(".sub-nav li"),
        // 		lis = $(this).find(items);
        // 		lis.css({width: $(this).width()})
        // 	for ( var i = 0, len = lis.length;  i < len; i++){
        // 		$(lis).eq(i).delay(i * 150).animate({opacity: 1}, 300);
        // 	}
            
        // });
    
        // $(document).mouseup(function (e){ // событие клика по веб-документу
        // 	if (!$(".sub-nav li").is(e.target) // если клик был не по нашему блоку
        // 	    && $(".sub-nav li").has(e.target).length === 0) { // и не по его дочерним элементам
        // 			$('.sub-nav li').animate({opacity: "0"}, 500);
        // 	}
        // });
    
    
    });
    