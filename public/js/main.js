 $(document).ready(function(){
  // Grandim https://sarcadass.github.io/granim.js/index.html
var granimInstance = new Granim({
    element: '#canvas-interactive',
    name: 'interactive-gradient',
    elToSetClassOn: '.canvas-interactive-wrapper',
    direction: 'diagonal', // left-right, radial, diagonal
    opacity: [1, 1],
    isPausedWhenNotInView: true,
    stateTransitionSpeed: 500, 
    states : {
        "default-state": {
            gradients: [
                ['#e5e5e5', '#ffefd6'],
                ['#ada996', '#f2f2f2'],
                ['#dbdbdb', '#eaeaea']
            ],
            // set loop to true/false for static/dynamic
            // or transitionSpeed for animation
            transitionSpeed: 5000
        },
        "pink-state": {
            gradients: [
                ['#FF5BB8', '#D60076'],
                ['#AA3E82', '#BA295D'],
                ['#FF76BA', '#FFBBF2']
            ],
            transitionSpeed: 5000
        },
        "violet-state": {
            gradients: [
                ['#9D50BB', '#B300A1'],
                ['#6441a5', '#480048'],
                ['#6E48AA', '#9D50BB']
            ],
            transitionSpeed: 5000
        },
        "blue-state": {
            gradients: [ 
                ['#1A2980', '#bbe4ff'], 
                ['#0098ee', '#c2f7ff'],
               ['#bbe4ff', '#1A2980']
            ],
            transitionSpeed: 5000,
            loop: true
        },
        "green-state": {
            gradients: [ 
                ['#B3FFAB', '#ADD100'],
                ['#38ef7d','#11998e'],
                ['#B3FFAB', '#ADD100']
            ],
            transitionSpeed: 5000,
            loop: true
        },
        "yellow-state": {
            gradients: [ 
                ['#ffeb00', '#ffc200'],
                ['#cac531', '#f3f9a7'],
              ['#ffeb00', '#ffc200']
            ],
            transitionSpeed: 5000,
            loop: true
        },
        "orange-state": {
            gradients: [ 
                ['#FF4E50', '#F9D423'], 
                ['#FE8C00', '#F83600'],
              ['#F9D423', '#FF4E50']
            ],
            transitionSpeed: 5000,
            loop: true
        },
        "teal-state": {
            gradients: [ 
                ['#6FE0ED', '#DAE9F4'], 
                ['#fff', '#5EA8B6'],
              ['#6FE0ED', '#DAE9F4']
            ],
            transitionSpeed: 5000,
            loop: true
        },
        "red-state": {
            gradients: [ 
                ['#6F0003', '#FABFC1'],
                ['#8e0e00', '#ef6f63'],
              ['#FABFC1', '#FF0009']
            ],
            transitionSpeed: 5000,
            loop: true
        }
    }
});


// Default
$('#default-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('default-state');
    setClass('#default-state-cta')
});

// Violet
$('#violet-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('violet-state');
    setClass('#violet-state-cta')
});

// Pink
$('#pink-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('pink-state');
    setClass('#pink-state-cta')
});

// Blue
$('#blue-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('blue-state');
    setClass('#blue-state-cta')
});

// Green
$('#green-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('green-state');
    setClass('#green-state-cta')
});

// Yellow
$('#yellow-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('yellow-state');
    setClass('#yellow-state-cta')
});

// Orange
$('#orange-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('orange-state');
    setClass('#orange-state-cta')
});

// Teal (content)
$('#teal-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('teal-state');
    setClass('#teal-state-cta')
});

// Red (anger)
$('#red-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('red-state');
    setClass('#red-state-cta')
});

function setClass(element) {
    $('.canvas-interactive-wrapper a').removeClass('active');
    $(element).addClass('active');
};

  
  //------------------------------------//
  //Navbar//
  //------------------------------------//
    	var menu = $('.navbar');
    	$(window).bind('scroll', function(e){
    		if($(window).scrollTop() > 140){
    			if(!menu.hasClass('open')){
    				menu.addClass('open');
    			}
    		}else{
    			if(menu.hasClass('open')){
    				menu.removeClass('open');
    			}
    		}
    	});
  
 });
