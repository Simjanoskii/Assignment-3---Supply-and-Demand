
const images = [
    { id: 1, src: "pictures/3.jpg", title: "Beautiful Landscape" },
    { id: 2, src: "pictures/4.jpg", title: "Sunset Over the Ocean" },
    { id: 3, src: "pictures/1.jpg", title: "Mountain Adventure" },
    { id: 4, src: "pictures/2.jpg", title: "Great Wall" },
	{ id: 5, src: "pictures/5.jpg", title: "Beautiful Beach" },
	{ id: 6, src: "pictures/6.jpg", title: "Sea down deep" },
];


const gallerySection = document.getElementById("gallery");
images.forEach(image => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
        <img src="${image.src}" alt="${image.title}" class="img-fluid" data-id="${image.id}">
    `;
    gallerySection.appendChild(col);
});

const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
gallerySection.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        const imgId = e.target.dataset.id;
        const imgData = images.find(img => img.id === parseInt(imgId));
        const modalImage = document.getElementById('modalImage');
        document.getElementById('modalTitle').innerText = imgData.title;


        modalImage.style.opacity = '0';
        modalImage.src = imgData.src;
        setTimeout(() => {
            modalImage.style.opacity = '1';
        }, 100);

        imageModal.show();
    }
});
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

function toggleFontSize() {
    document.body.classList.toggle('large-font');
}


document.body.classList.add(localStorage.getItem('theme') || 'light-theme');
document.body.classList.add(localStorage.getItem('font-size') || 'normal-font');


function savePreferences() {
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme');
    localStorage.setItem('font-size', document.body.classList.contains('large-font') ? 'large-font' : 'normal-font');
}

document.body.addEventListener('classlistchange', savePreferences);
