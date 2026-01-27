const closeBtn = document.getElementById("closeBtn");
const closeWedget = document.getElementById("chat-widget-display");

console.log(closeBtn);
console.log(closeWedget);

closeBtn.addEventListener("click", (e) => {
    console.log(closeBtn);
    console.log(closeWedget);
    closeWedget.style.display = "none";
});
