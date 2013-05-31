var app = function() {
	var dataset = {
		circles: [
			{'cx': '20', 'cy': '100', 'r': 12 },
			{'cx': '60', 'cy': '100', 'r': 12 },
			{'cx': '100', 'cy': '100', 'r': 12 }
		],
		rects: [
			{'x': '20', 'y':'120', 'width': 50, 'height': 30, 'fill': 'green', 'stroke-width': 1},
			{'x': '20', 'y':'160', 'width': 50, 'height': 30, 'fill': 'blue', 'stroke-width': 3, 'stroke': 'pink', 'opacity': 0.5}
		]
	};

	var svg, circles, rects;

	return {
		init: function() {			
			//this.circles = this.svg.selectAll('circle');
			//create an svg container			
			svg = d3.select('body .svg').append('svg');		

			this.createCirecles();
			this.createRects();
		},
		createCirecles: function(callback) {
			/*
				This is a wrong way of creating object in d3
				Take a look at: http://bost.ocks.org/mike/join/
				"Here’s the deal: instead of telling D3 how to do something, 
				tell D3 what you want. In this case, you want the circle elements to correspond to data"
			 */
				
			// $.each(dataset.circles, function(i, el) {
			// 	svg.append('circle').attr(el);				
			// });
			
			circles = svg.selectAll('circle')
				.data(dataset.circles)
			
			circles.enter().append('circle')
				.attr('cx', function(d){ return d.cx; })
				.attr('cy', function(d){ return d.cy; })
				.attr('r', function(d){ return d.r; });

			//cirecles.exit().remove();

		},

		createRects: function(callback) {
			rects = svg.selectAll('rect')
						.data(dataset.rects)
					.enter().append('rect')
						.attr('x', function(d){ return d.x; })
						.attr('y', function(d){ return d.y; })
						.attr('width', function(d){ return d.width; })
						.attr('height', function(d){ return d.height; })
						.attr('fill', function(d){ return d.fill; })
						.attr('strokewidth', function(d){ 
							return d['stroke-width']; }) // very interesting, d.stroke-width doesn't work here
						.attr('stroke', function(d){ return d.stroke; })
						.attr('opacity', function(d){ return d.opacity; });
		},
		
		// random move cirecles and resize circles
		randomAct: function() {
			circles.transition()
				.duration(function(d, i){
					return i * 1000;
				})
				.style("fill", "steelblue")
				.attr('cy', function(d, i){
					return Math.random() * 100;
				})
				.attr('r', function(d) {
					return Math.random() * 10;
				})
				.attr('cx', function(d){
					return Math.random() * 100;
				});
		},

		reset: function() {
			// remove svg 
			$('svg').remove();
			this.init();
		}
	}
}();


document.ready = function() {
	'use strict';
	app.init();
	
	var $buttons = $('.actions button');

	$.each($buttons, function(){
		var action = this.getAttribute('data-click');
		$(this).click(function(e){
			// this is not recommended, but for demo, i use it here
			eval('app.' + action + '()');
		});
	});

};