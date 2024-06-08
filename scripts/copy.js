document.addEventListener('DOMContentLoaded', function() {
    const copyLink = document.getElementById('copyLink');
    copyLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
        copyToClipboard('wzsk2023@gmail.com');
    });
});

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