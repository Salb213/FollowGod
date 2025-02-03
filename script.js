const religions = ["Agnostic", "Atheist", "Muslim", "Jewish", "Buddhist", "Hindu", "Catholic"];
let index = 0;

// Update religion display
function updateReligion() {
    document.getElementById("selected-religion").textContent = religions[index];
}

// Previous religion
document.getElementById("prev").addEventListener("click", () => {
    index = (index - 1 + religions.length) % religions.length;
    updateReligion();
});

// Next religion
document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % religions.length;
    updateReligion();
});

// Start button action
document.getElementById("start-btn").addEventListener("click", () => {
    alert(`You selected: ${religions[index]}. Let's begin!`);
});
