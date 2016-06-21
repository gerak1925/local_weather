$(document).ready(function()
{

	var latitude, longitude;

	function convertion()
	{

	}

	function processJSON(url)
	{
		$.getJSON(url, function(jsonObj)
		{
			var temper = parseFloat(jsonObj.main.temp) - 273.15;

			$('#content').html("<p>" + temper.toString() + " <span id="unit" onclick="conversion()">Celsius</span></p>");
			$('#content').append("<p>" + jsonObj.weather[0].description + "</p>");
			$('#content').append("<p>" + jsonObj.main.humidity + " humidity</p>");
		}
	}

	function geoFind() 
	{
		var output = document.getElementById("content");

		if (!navigator.geolocation) 
		{
	    	output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
	    	return;
		}

		function success(position) 
		{
	    	lat  = position.coords.latitude;
	    	lon = position.coords.longitude;

	    	var url = 'api.openweathermap.org/data/2.5/weather?lat=' + lat.toString() + '&lon=' + lon.toString() + '&APPID=5b1a0c598f588ad14577a6cfc89433b2';

	    	processJSON(url);
		};

		function error() 
		{
	    	output.innerHTML = "Unable to retrieve your location";
	    };

	    output.innerHTML = "<p>Locating…</p>";

	    navigator.geolocation.getCurrentPosition(success, error);
	}
});