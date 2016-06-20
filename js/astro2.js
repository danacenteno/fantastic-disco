// establish global variable / empty object

// might have to call api a third time to figure out geolookup feature

var astroApp = {};

astroApp.apiUrl1 = 'http://api.wunderground.com/api/dc2a2af30433fc78/geolookup/astronomy/q/';

astroApp.apiUrl2 = 'http://api.wunderground.com/api/dc2a2af30433fc78/geolookup/conditions/q/';

// initializing function!
astroApp.init = function(){
	// need to call function for when postal code is submitted by user
	// will give you results based on location!
	$('form').on('submit',function(e){
	    e.preventDefault();

	    var postal = $('input').val();
	    astroApp.getInfo(postal);
	    console.log(postal);
	    // reveals astromony info once users' postal code is submitted

	    // if postal code info is not submitted, you'll get an alert and .astroInfo won't show!
	    if( $('#postalInfo').val().length === 0 ) {
	            alert('Sorry, that is not a valid postal code!');
	            // console.log('DENIEEEDDD!!!')
	        }
	        else {
	        	// when postal code entered, .astroInfo will show up!
	        	$('.astroInfo').removeClass('hideMe').addClass('showMe');
	        	// console.log('IT WOOOORKSSS!!!');
	        }
	});

	var easter_egg = new Konami('easterEgg.html');
	console.log(easter_egg);
};

// retrieving astronomy and weather info thru ajax calls
astroApp.getInfo = function(postalCode) {
	var astronomy = $.ajax({
		// concatenates url so user can input their postal code and that will give you different results based on their location!
		url: astroApp.apiUrl1 + postalCode + '.json',
		method: 'GET',
		dataType: 'jsonp'
		});

	var weather = $.ajax({
		url: astroApp.apiUrl2 + postalCode + '.json',
		method: 'GET',
		dataType: 'jsonp'
	});

	$.when(astronomy,weather)
	.then(function(astroData,weatherData){
		var astroStuff = astroData[0].moon_phase;
		// console.log(astroData);

		var weatherStuff = weatherData[0].current_observation;
		// console.log(weatherData);

		// var observation = weatherData
		// astroApp.displayInfo(observation);

		astroApp.displayInfo(astroStuff,weatherStuff);
	});
};

// display information obtained from previous function!
// dynamically display date, moonphases
// app will randomly add pick-up lines along with moon phases

// you want things hidden UNTIL you enter the postal code!
// you can ADD CLASS, and make that display: none or visibility: hidden
astroApp.displayInfo = function(moon,skycon){
	console.log(moon,skycon);

	var location1 = skycon.display_location.city;
	$('.city').text(location1 + ', ');

	var location2 = skycon.display_location.state;
	$('.province').text(location2);

	// COLUMN 1
	var conditions = skycon.temp_c;
	$('.temp_c').text(skycon.temp_c);

	var moonrise1 = moon.moonrise.hour;
	$('.hours').text(moonrise1 + ':');

	var moonrise2 = moon.moonrise.minute;
	$('.minutes').text(moonrise2);

	// COLUMN 2
	var phases = moon.phaseofMoon;
	$('.moonPhase').text(phases);

	// COLUMN 3
	var illuminate = moon.percentIlluminated;
	$('.illumination').text(illuminate + '%');

	var conditions = skycon.weather;
	$('.skyCon').text(skycon.weather);

	// ************** ADDING PICKUPS ************** 
	
	// put pickup lines into an array
	// assign random value to pickups
	
	var pickUps = [
		'You must be a star. Because I can\'t seem to stop myself from orbiting around you.',
		'All the stars in the sky will never compare to the twinkle in your eyes.',
		'I love you to the *points at the moon* and back.',
		'You must be the North Star, because the light around you guided me here.',
		'Are you the moon? Because even when it’s dark outside you still seem to shine.',
		'If stars would fall everytime I would think of you, the midnight sky would soon be empty.', 
		'Are you made up of dark matter? Cuz you’re indescribable.',
		'Until I met you, love was as elusive as mini blackholes.',
		'I must be the Sun and you must be Earth, cause the closer we get, the hotter you become',
		'Every time I look at you I feel like an astronaut...your beauty makes me float.',
		'Were you born in an open cluster? Because baby you shine like a young star.'
	];
	
	// create new variable for pickup lines
	// the variable will now be a random number
	var randomPickUps = (Math.floor(Math.random() * pickUps.length));
	console.log(pickUps[randomPickUps]);

	// when .pickUpButton clicks, shows up random pick up line at the bottom
	$('.pickUps p').text(pickUps[randomPickUps]);

	// will randomly generate a pick up line when button is clicked
	$('.pickUpButton').on('click', function(e){
		e.preventDefault();
		$('.pickUps').removeClass('hideMe').addClass("showMe");
		$.smoothScroll({
			scrollTarget: "#pickUpLines"
		});
	});
};

//document ready!
$(function(){

	// will call initializing function!
	astroApp.init();

	// smoothscroll
	$('a button.start').on('click', function(e){
		e.preventDefault();
		$.smoothScroll({
			scrollTarget: "#location"
		});
	});

	// When postal code submitted, it will smoothscroll to astronomy info!
	$('form').on('submit', function(e){
		e.preventDefault();
		$.smoothScroll({
			scrollTarget: "#astronomyStuff"
		});
	});

	//when user wants another pick up line!
	$('button.restart').on('click', function(){
		$.smoothScroll({
		scrollTarget: "body"
		});
	});
});