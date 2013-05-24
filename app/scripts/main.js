var app = function() {
	
	return {
		init: function() {
			this.svg = d3.select('.svg');
			this.circles = this.svg.selectAll('circle');
		},
		randomAct: function() {
			this.circles.transition()
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
			this.circles.each(function(d, i) {
				d3.select(this).attr({
					'cx': 50 * (i + 1),
					'cy': 100,
					'r': 12,
					'fill': 'green',
					'stroke': 'black'
				})
				.style({
					
				});
			});
		}
	}
}();


document.ready = function() {
	'use strict';
	app.init();

			
	$('#reset').click(function(){
		app.reset();
	});

	d3.select('#random_size').on('click', function(e){
		app.randomAct();
	});
};