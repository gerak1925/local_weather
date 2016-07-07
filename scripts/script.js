var latitude, longitude;

function convertion()
{

}

function processJSON(url)
{
	$.getJSON(url, function(jsonObj)
	{
		var data = JSON.parse(jsonObj);
		var temper = parseFloat(data.main.temp) - 273.15;

		$('#content').html('<p>' + temper.toString() + ' <span id="unit">Celsius</span></p>');
		$('#content').append("<p>" + data.weather[0].description + "</p>");
		$('#content').append("<p>" + data.main.humidity + " humidity</p>");
	});
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

	    var url = "api.openweathermap.org/data/2.5/weather?lat=" + lat.toString() + "&lon=" + lon.toString() + "&APPID=5b1a0c598f588ad14577a6cfc89433b2";
	    // $('#content').html('<p>' + url + '</p>'); This line is just to check if the API link is ok.

	    processJSON(url);
	};

	function error() 
	{
	    output.innerHTML = "Unable to retrieve your location";
	};

	output.innerHTML = "<p>Locating…</p>";

	navigator.geolocation.getCurrentPosition(success, error);
}

$('button').on('click', geoFind());