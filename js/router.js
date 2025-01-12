document.addEventListener("DOMContentLoaded", () => {
    const routes = {
        "/": "/index.html",
        "/gallery": "/gallery.html",
        "/contact": "/contact.html",
        "/login": "/login.html"
    };

    const main = document.querySelector("main");

    async function navigateTo(url) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser && url !== "/login") {
        history.pushState(null, null, "/login");
        await loadPage("/login");
        return;
    }

    if (!routes[url]) {
        console.error(`Route "${url}" not defined.`);
        return;
    }

    await loadPage(url);
}

    async function loadPage(url) {
        try {
            const response = await fetch(routes[url]);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${routes[url]}: ${response.statusText}`);
            }
            const html = await response.text();

         
            main.innerHTML = "";

            
            main.innerHTML = html;

            
            document.querySelectorAll("nav .nav-link").forEach(link => {
                link.classList.toggle("active", link.getAttribute("href") === url);
            });

            
            if (url === "/gallery") {
                loadScript("js/gallery.js");
            } else if (url === "/contact") {
                loadScript("js/contact.js");
            } else if (url === "/login") {
                loadScript("js/login.js");
            }
        } catch (error) {
            console.error(error.message);
            main.innerHTML = "<h1>Error loading the page. Please try again later.</h1>";
        }
    }

    function loadScript(src) {
        const script = document.createElement("script");
        script.src = src;
        script.defer = true;
        document.body.appendChild(script);
    }

   
    window.onpopstate = () => {
        navigateTo(location.pathname);
    };

    document.querySelectorAll("nav .nav-link").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const url = link.getAttribute("href");

            
            history.pushState(null, null, url);
            navigateTo(url);
        });
    });

 
    navigateTo(location.pathname || "/");
});
