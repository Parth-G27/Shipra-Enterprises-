function openPopup(videoId) {
    var popupContainer = document.getElementById('popup-container');
    var youtubeIframe = document.getElementById('youtube-iframe');

    youtubeIframe.src = "https://www.youtube.com/embed/" + videoId;
    popupContainer.classList.add('show');
}

function closePopup() {
    var popupContainer = document.getElementById('popup-container');
    var youtubeIframe = document.getElementById('youtube-iframe');

    youtubeIframe.src = "";
    popupContainer.classList.remove('show');
}

var popupButtons = document.querySelectorAll('.play-button');
popupButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var videoId = this.getAttribute('data-video-id');
        openPopup(videoId);
    });
});