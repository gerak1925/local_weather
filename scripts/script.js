var lat, lon, celsius, fahren;
var url = "";

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function processJSON(url)
{
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		success: function (obj) {
			celsius = Math.floor(parseFloat(obj.main.temp) - 273.15);
			fahren = Math.floor((celsius * 1.8) + 32);
			var weatherIcon = 'http://openweathermap.org/img/w/' + obj.weather[0].icon + '.png';

			$('#celsius').html('<p>' + celsius.toString() + '° Celsius</p>');
			$('#fahrenheit').html('<p>' + fahren.toString() + '° Fahrenheit</p>');
			$('#fahrenheit').hide();
			$('#description').text(obj.weather[0].description.capitalize());
			$('#humidity').text(obj.main.humidity + '% Humidity');
			$('#weatherIcon').append('<img src="' + weatherIcon + '" />');
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert("Error: " + errorThrown);
		}
	});
}

function geoFind()
{
	var output = document.getElementById("content");

	$('button').hide();

	if (!navigator.geolocation) 
	{
	    $('#celsius').innerHTML = "<p>Geolocation is not supported by your browser</p>";
	    return;
	}

	function success(position) 
	{
	    lat  = position.coords.latitude;
	    lon = position.coords.longitude;

	    url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat.toString() + "&lon=" + lon.toString() + "&APPID=5b1a0c598f588ad14577a6cfc89433b2";

	    processJSON(url);
	};

	function error() 
	{
	    $('#celsius').innerHTML = "Unable to retrieve your location";
	};

	$('#celsius').innerHTML = "<p>Locating…</p>";

	navigator.geolocation.getCurrentPosition(success, error);
}

$('button').on('click',geoFind);

$('#celsius').click(function(){
	$('#celsius').hide();
	$('#fahrenheit').show();
});
$('#fahrenheit').click(function(){
	$('#fahrenheit').hide();
	$('#celsius').show();
});