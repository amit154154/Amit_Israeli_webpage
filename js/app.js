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
                const imageContainer = document.createElement('div');
                imageContainer.className = 'image-container';

                // Loop through each image and append to the image container
                project.images.forEach(image => {
                    const imageLink = document.createElement('a');
                    imageLink.href = project.githubLink;
                    imageLink.innerHTML = `<img src="${image}" alt="${project.title}" class="project-img">`;
                    imageContainer.appendChild(imageLink);
                });

                // Construct slide HTML
                slide.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                `;
                slide.appendChild(imageContainer); // Append image container to slide
                container.appendChild(slide);
            });
            // Set the initial slide to show
            showSlide(0);
        })
        .catch(error => console.error('Error loading or processing project data:', error));
});
