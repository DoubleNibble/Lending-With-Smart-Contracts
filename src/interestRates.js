

function fetchInterestRate() {
    var myHeaders = new Headers({
	'X-Auth-Token': football.authToken,
	'X-Response-Control': 'minified'
    })

    var url = "" + "/fixtures/" + id + "/" + '?head2head=0';

    var fetchData = {
	method: 'GET',
	headers: myHeaders,
    };


    var myRequest = new Request(url, fetchData);
    myRequest.responseType = 'text'; //;
    var results = await fetch(myRequest);
    return results.text();
}
