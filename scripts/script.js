var latitude, longitude;
var url = "";

function convertion()
{

}

function processJSON(url)
{
	$.getJSON(url, function(obj)
	{
		var temper = parseFloat(obj.main.temp) - 273.15;
		var weatherIcon = 'http://openweathermap.org/img/w/' + obj.weather[0].icon + '.png';

		$('#content').html('<p>' + temper.toString() + ' <span id="unit">Celsius</span></p>');
		$('#content').append("<p>" + obj.weather[0].description + "</p>");
		$('#content').append("<p>" + obj.main.humidity + " humidity</p>");
		$('#content').append('<p><img src="' + weatherIcon + '" /></p>');
	});
}

function geoFind()
{
	var output = document.getElementById("content");

	$('button').hide();

	if (!navigator.geolocation) 
	{
	    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
	    return;
	}

	function success(position) 
	{
	    lat  = position.coords.latitude;
	    lon = position.coords.longitude;

	    url = "api.openweathermap.org/data/2.5/weather?lat=" + lat.toString() + "&lon=" + lon.toString() + "&APPID=5b1a0c598f588ad14577a6cfc89433b2";
	    // $('#content').html('<p>' + url + '</p>'); This line is here just to check if the API link is ok.

	};

	function error() 
	{
	    output.innerHTML = "Unable to retrieve your location";
	};

	output.innerHTML = "<p>Locating…</p>";

	navigator.geolocation.getCurrentPosition(success, error);
}

$('button').on('click',geoFind);
processJSON(url);