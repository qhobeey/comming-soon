;(function($){

	'use strict';

	var $doc = $(document),
	path = 'assets/css/',
	speed = 300,
	layouts = ['bc382a', '32465b', '8b43a9', '159c81'],
	spanel = document.createElement('div'),
	$spanel = $(spanel),
	settingsIcon,
	isHidden = false,
	iconSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAEn0lEQVRIS6VWe2xTVRg/59zb1+YiDzfQTZnDgC/2aDNct9sOCWGOPqKJaMRAmFGj4D+GDAxKjKKoCxj+QBMHGuMjJiwmuHZlQCSzXQcB+1gRl7EtTuLmpsLmHqXrvfccv9OtS7tsw2z9oz093/ed3/2+3+/7zsVo6mMymTJYxt1ehsgqmSrVv/g9Pydt/Ndk2nQfMxi8jGA6Lo9Zrl0435dqX1duNwsicmNEeoauR6y9vb0xbsdJp8KyKqNGpw/w/5SpB0Je93upB5RItheIIH6esKt0R6jV9XWqvchif1ckwgG+F4/LhVcueK6kAXCwEovzMEJsVTw2+trVyy0DqQcUWxwvCoQc53sqpTVhn+vLVPsa88bcDDHzGEG4K+hr3Ju0TWeQ6jzb+nYAc8UnANaurcjS5yytFRDaAhzoMWOX1Lj6Yfslz7Vk4HwAj5bZHtJphX0MoVJEUZQi6u4bMhz5+2rDGF4n2ZaKWPABUj7D6HvE0AgAOBDGd1EkV4V9p/0cZC6AEoujEnw9DLEBAHCLCN9JEdoKpe4ZGhm1YqPVeQwQn6OqUh7xN3fyw/LyzIacguxmRlkukLmG8zoHgGiUHN0M6h4a+NWOursneDzPSKshbSpGXwGAYxAQj4e9rrdS68hlp9UIbROKXMolOxtA0keeiJkiF88E01QlOT4gGO/kypExI7uDrafqZ6oiS5v1hyKrVe1t7rOzARRbbDaBiO7hoVsreiJn/0pTneTYhQk7ikskewhq2BPyuZ6eqXtMhBNj8ti9vKlmA3iw7In8TJ3uN4Wy7e2+xm9S441WeyPweQ8urrBvE0ThW4WqB/tvGuqA+WhRhe1JkZAvgDRX0OfaPh/JpkrnScbQJqaqO0P+JjcoMlOfvWy/KJA3gOhnEjItkRz7EGEHEcMEI6zAt45S9gOJ9m0LBALRSQB7rUCEuqlGex0a7WhS4oac5d8JBNsgBsYD02CMVEbx/lBr45HpRoNMtkAmTTyIMfpp0OvaPZUyV0o9FkjN5AEIEYL14FO/eoV+V0NDg8r3jJITfPBLiQdQ5M1hv+ccX08DmCSHhATi45uU0Y9CXhekCNlZnIcwZntUyl5pb3Un5g9kUwNP+Qmj6P1wq/sdvldkdRwWMdnD17ISN0f8py/+D4CtWqMldgO4+BhE8HYqiUUgQxGjVwtW6pfzLBYE8LC56gGDVt8lK4o14m9KZJf8FJZXb9RotD9GZTm/o83z+4IA+BjREOGGytCOmTIskuw1QOyJ8cGbSzo7/aMLAkjU2+o4AyP4/n+HY1KymR4p3bBSY8jyg+o6wr5G+yI4QAiyKIAsfIwxHUjiFOgC+EVPgYrGYyqVeHkWBcCDVxduzrljiW6vwNiGSQ7IeRwdqQsEWv5JcrLgEqUSO9960QD8UsrIXvYZI4z9OXz95cFIZDxNtrfrg2KzrVzQionLhVF6CGbQm6kHQKc/D52eGGiKQp9t97tOptqNFmcdjJhavqfKE+vDbc2X0xsNXltoZm4LhktficerZ873wseq84hO/IkweG0Zu1XZGTrXn5aB2b6eiKQJur4r2N/xePLy+Q+MbrYWKjHKpQAAAABJRU5ErkJggg==',
	borderRadius = {
		'-moz-border-radius': '3px',
		'-webkit-border-radius': '3px',
		'border-radius': '3px'
	},
	borderRightRadius = {
		'-moz-border-radius-topright': '4px',
		'-webkit-border-top-right-radius': '4px',
		'border-top-right-radius': '4px',
		'-moz-border-radius-bottomright': '4px',
		'-webkit-border-bottom-right-radius': '4px',
		'border-bottom-right-radius': '4px'
	},
	createItem = function(color, cls)
	{
		var el = document.createElement('div'),
		$el = $(el);

		$el.css($.extend({
			display: 'block',
			overflow: 'hidden',
			width: '40px',
			height: '40px',
			float: 'left',
			lineHeight: '40px',
			cursor: 'pointer',
			margin: '5px',
			backgroundColor: '#' + color
		}, borderRadius));

		$el.addClass(cls);
		$el.attr('data-sp-item', color);

		return {
			'el': el,
			'$el': $el
		};
	},
	showHideIcon = function()
	{
		var calc = layouts.length * 50;

		$spanel.animate({
			left: isHidden ? 0 : (0 - calc)
		}, speed, function(){
			isHidden = !isHidden;
		});
	},
	changeTheme = function(color)
	{

		var styleElement = $('*[data-theme]'),
			c = styleElement.clone();

		c.attr('href', path + 'core-' + color + '.css?v=1.2');
		c.appendTo($('head'));

		setTimeout(function(){
			styleElement.remove();
		}, 500);

		$('.settings-icon').trigger('click');

	};

	$spanel.css($.extend({
		position: 'absolute',
		height: '52px',
		background: '#fafafa',
		top: '40px',
		left: 0,
		border: '1px solid #898989',
		borderLeft: 0,
		zIndex: 9000,
		padding: 0,
		visibility: 'hidden'
	}, borderRightRadius));

	$spanel.addClass('settings-panel');

	document.body.appendChild(spanel);

	for(var i = 0; i < layouts.length; i++)
		spanel.appendChild(createItem(layouts[i],  'sp-item').el);

	settingsIcon = createItem('fafafa', 'settings-icon');

	var img = new Image();
	img.src = iconSrc;

	settingsIcon.el.appendChild(img);
	settingsIcon.el.style.textAlign = 'center';

	spanel.appendChild(settingsIcon.el);

	$doc.on('click', '.settings-icon', function(){
		showHideIcon();
	});

	$doc.on('click', '.sp-item', function(e){
		var $el = $(this),
		color = $el.attr('data-sp-item');

		changeTheme(color);
	});

	showHideIcon();

	setTimeout(function(){
		$spanel.css({
			display: 'none',
			visibility: 'visible'
		});

		$spanel.fadeIn(speed);
	}, speed * 4);

})(jQuery);