document.getElementById('decodeButton').addEventListener('click', function() {
    const tokenInput = document.getElementById('tokenInput').value.trim();
    const headerOutput = document.getElementById('headerOutput');
    const payloadOutput = document.getElementById('payloadOutput');
    const signatureOutput = document.getElementById('signatureOutput');

    if (!tokenInput) {
        alert('Please enter a JWT token.');
        return;
    }

    const parts = tokenInput.split('.');
    if (parts.length !== 3) {
        alert('Invalid JWT token format.');
        return;
    }

    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const signature = parts[2];

    headerOutput.textContent = JSON.stringify(header, null, 2);
    payloadOutput.textContent = JSON.stringify(payload, null, 2);
    signatureOutput.textContent = signature;
});

function base64UrlDecode(base64Url) {
    // Replace URL-specific characters with standard Base64 characters
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Pad with '=' to make it a multiple of 4
    while (base64.length % 4 !== 0) {
        base64 += '=';
    }
    // Decode Base64 to UTF-8 string
    return atob(base64);
}