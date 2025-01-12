const draggableItems = document.querySelectorAll(".draggable");
const cartContainer = document.getElementById("cart");


draggableItems.forEach((item) => {
    item.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text", e.target.id);
    });
});

cartContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
});

cartContainer.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const draggedItem = document.getElementById(id);
    cartContainer.appendChild(draggedItem.cloneNode(true));
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    const email = document.getElementById("email").value;
    if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        e.preventDefault();
    }
});


function loadProducts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
            const productContainer = document.getElementById("product-list");
            data.slice(0, 5).forEach((post) => {
                const product = document.createElement("div");
                product.classList.add("card");
                product.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.body}</p>
                    </div>
                `;
                productContainer.appendChild(product);
            });
        });
}

function updateNetworkStatus() {
    const notification = document.getElementById("network-status");
    if (!navigator.onLine) {
        notification.textContent = "No internet connection. Please check your network.";
        notification.style.display = "block";
    } else {
        notification.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {

    displayLocation();
    loadProducts();

  
    updateNetworkStatus();
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
});
document.querySelectorAll('a').forEach(link => {
    link.setAttribute('target', '_blank');
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
document.addEventListener("DOMContentLoaded", () => {
    const dataUrl = "path-to-your-json-file.json"; 
    const tableBody = document.getElementById("table-body"); 
    const successMessage = document.getElementById("success-message"); 

    
    function loadData() {
        fetch(dataUrl)
            .then(response => response.json())
            .then(data => {
                renderTable(data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function renderTable(data) {
        tableBody.innerHTML = ""; 
        data.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.stock}</td>
                <td>
                    <button class="btn btn-warning edit-btn" data-index="${index}">Edit</button>
                    <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                editItem(index);
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                deleteItem(index);
            });
        });
    }

   
    function editItem(index) {
        
        const newName = prompt("Enter new name for the product:");
        const newPrice = prompt("Enter new price for the product:");
        const newStock = prompt("Enter new stock for the product:");

        if (newName && newPrice && newStock) {
            
            const row = document.querySelector(`.edit-btn[data-index="${index}"]`).closest("tr");
            row.cells[0].textContent = newName;
            row.cells[1].textContent = newPrice;
            row.cells[2].textContent = newStock;

           
            showSuccessMessage("Item edited successfully!");
        } else {
            alert("All fields are required to edit the item.");
        }
    }

    
    function deleteItem(index) {
        const confirmed = confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            
            const row = document.querySelector(`.delete-btn[data-index="${index}"]`).closest("tr");
            row.remove();

            
            showSuccessMessage("Item deleted successfully!");
        }
    }

  
    function showSuccessMessage(message) {
        successMessage.textContent = message;
        successMessage.style.display = "block";

        setTimeout(() => {
            successMessage.style.display = "none";
        }, 2000); 
    }

    
    loadData();
});
const apiKey = '3b83f9374583438f980416b983e36e5e';  
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

function getNews() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);  
            if (data && data.articles) {
                const articles = data.articles;
                const newsContainer = document.getElementById("news-container");
                newsContainer.innerHTML = '';  

                if (articles.length > 0) {
                    articles.forEach(article => {
                        const articleDiv = document.createElement("div");
                        articleDiv.classList.add("article");

                        articleDiv.innerHTML = `
                            <h4><a href="${article.url}" target="_blank">${article.title}</a></h4>
                            <p>${article.description}</p>
                            <small>Published on: ${article.publishedAt}</small>
                        `;
                        newsContainer.appendChild(articleDiv);
                    });
                } else {
                    newsContainer.innerHTML = '<p>No news available at the moment.</p>';
                }
            } else {
                const newsContainer = document.getElementById("news-container");
                newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            const newsContainer = document.getElementById("news-container");
            newsContainer.innerHTML = '<p>Could not fetch news. Please try again later.</p>';
        });
}


document.addEventListener("DOMContentLoaded", getNews);


document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        
        window.location.href = "login.html";
        return;
    }


    const welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.textContent = `Hello, ${loggedInUser.name}!`;
});
