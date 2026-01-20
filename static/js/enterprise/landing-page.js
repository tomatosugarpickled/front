const button = document.querySelector("button");

button.addEventListener("mouseover", (e) => {
    e.target.style = "background-color : lightgray";
    button.addEventListener("mouseleave", (e) => {
        e.target.style = "background-color : oklch(.922 0 0)";
    });
});
