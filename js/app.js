let currentSlide = 0;

function showSlide(index) {
    const sliderContainer = document.querySelector('#slide-container');
    currentSlide = index;
    // Adjust the transform to move the slide into view correctly
    sliderContainer.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    const sliderContainer = document.querySelector('#slide-container');
    // Ensure we count only the direct children slides
    if (currentSlide < sliderContainer.children.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function previousSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('data/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(projects => {
            const container = document.getElementById('slide-container');
            projects.forEach(project => {
                const slide = document.createElement('div');
                slide.className = 'slide';

                // Create an image container
                const mediaContainer = document.createElement('div');
                mediaContainer.className = 'media-container';

                // Loop through each media item and append to the media container
                project.images.forEach(media => {
                    const mediaLink = document.createElement('a');
                    mediaLink.href = project.githubLink;

                    // Check if the media item is an MP4 video
                    if (media.endsWith('.mp4')) {
                        mediaLink.innerHTML = `<video autoplay controls loop class="project-media"><source src="${media}" type="video/mp4"></video>`;
                    } else { // Assume it's an image
                        mediaLink.innerHTML = `<img src="${media}" alt="${project.title}" class="project-media">`;
                    }

                    mediaContainer.appendChild(mediaLink);
                });

                // Construct slide HTML
                slide.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                `;
                slide.appendChild(mediaContainer); // Append media container to slide
                container.appendChild(slide);
            });
            // Set the initial slide to show
            showSlide(0);
        })
        .catch(error => console.error('Error loading or processing project data:', error));
});
