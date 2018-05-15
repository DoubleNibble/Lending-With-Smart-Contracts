
export async function getProof(url) {
    var myHeaders = new Headers({
    })
    url = "https://tlsproof.bastien.tech/proofgen.py?proof_type=2&url=" + url
    var fetchData = {
	method: 'GET',
	headers: myHeaders,
    };
    console.log(url)
    var myReq = new Request(url, fetchData)
    var response = await fetch(url)
    var buf = await response.arrayBuffer()
    // Converts proof to expected hex format
    var proof = buf2hex(buf)
    proof = "0x"+proof.split("\\x").join("")
    console.log(proof)
    return proof
}

export async function fetchInterestRate() {
    var myHeaders = new Headers({
    })

    var url = "https://quandl.glitch.me"

    var fetchData = {
	method: 'GET',
	headers: myHeaders,
    };

    var myRequest = new Request(url, fetchData);
    //myRequest.responseType = 'text'; //;
    var results = await fetch(myRequest);
    var obj = await results.json();
    console.log(url, obj)
    var proof = await getProof(url)
    return {proof:proof, data:obj}
}


function buf2hex(buffer) {
    // create a byte array (Uint8Array) that we can read the array buffer
    const byteArray = new Uint8Array(buffer);
    
    // for each element, we want to get itsa two-digit hexadecimal representation
    const hexParts = [];
    for (let i = 0; i < byteArray.length; i++) {
	// convert value to hex
	const hex = byteArray[i].toString(16);
	// and add \x in front of every hex
	const paddedHex = ('\\x') + ('00' + hex).slice(-2);
	hexParts.push(paddedHex);
    }
    // join the parts
    return hexParts.join('');
}

// Need bastien to fix html in proof
