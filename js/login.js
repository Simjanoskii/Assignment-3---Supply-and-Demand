document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("users.json") 
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch users.json");
            }
            return response.json();
        })
        .then(users => {
            
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
               
                localStorage.setItem("loggedInUser", JSON.stringify(user));

                
                alert(`Welcome back, ${user.name}!`);
                window.location.href = "index.html";
            } else {
                
                const errorMessage = document.getElementById("error-message");
                errorMessage.style.display = "block";
                errorMessage.textContent = "Invalid email or password. Please try again.";
            }
        })
        .catch(error => {
            console.error("Error fetching users.json:", error);

            const errorMessage = document.getElementById("error-message");
            errorMessage.style.display = "block";
            errorMessage.textContent = "Failed to load user data. Please try again later.";
        });
});
