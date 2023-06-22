/**
 * Trigger Youtube Video
 *
 * @param {Node} div Container div element for Youtube video
 */
function initVideo(div) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/' + div.dataset.embed + '?rel=0&showinfo=0&autoplay=1');
    // Clear Content of DIV
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    // Add iFrame element, loads immediately
    div.appendChild(iframe);
}
/**
 * Initialize Intersection Observer for Youtube Lazyloading
 *
 * Preview image is not needed
 */
function initYoutubeIntersectionObserver() {
    const videos = document.querySelectorAll('.youtube');
    const config = { rootMargin: '100px' };
    let observer = new IntersectionObserver(function (entries, self) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stop watching and load the video
                self.unobserve(entry.target);
                initVideo(entry.target);
            }
        });
    }, config);
    // Start Observer
    videos.forEach(video => {
        observer.observe(video);
    });
}
// Load as late as possible
window.addEventListener('load', initYoutubeIntersectionObserver);
