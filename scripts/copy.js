function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            alert('My email address has been copied to your clipboard!');
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    } else {
        console.error('Clipboard API not supported');
    }
}