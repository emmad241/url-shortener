document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullUrl = document.getElementById('fullUrl').value;

    fetch('/shortUrls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullUrl })
    })
    .then(response => response.json())
    .then(data => {
        const shortUrl = `http://localhost:5000/${data.short}`;
        document.getElementById('shortenedLink').href = shortUrl;
        document.getElementById('shortenedLink').innerText = shortUrl;
        document.getElementById('shortUrlDisplay').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while shortening the URL.');
    });
});

function copyToClipboard() {
    const shortUrl = document.getElementById('shortenedLink').href;
    navigator.clipboard.writeText(shortUrl)
        .then(() => {
            alert('Shortened URL copied to clipboard!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while copying the shortened URL to clipboard.');
        });
}
