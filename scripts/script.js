var latitude, longitude;

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
    	latitude  = position.coords.latitude;
    	longitude = position.coords.longitude;

    	output.innerHTML = '<p>api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=5b1a0c598f588ad14577a6cfc89433b2</p>';
	};

	function error() 
	{
    	output.innerHTML = "Unable to retrieve your location";
    };

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
}