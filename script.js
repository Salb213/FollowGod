const religions = ["Agnostic", "Atheist", "Muslim", "Jewish", "Buddhist", "Hindu", "Catholic", "Protestant", "Mormon", "Jehovah's Witness", "Deist", "Spiritual but not religious"];
let index = 0;

function updateReligion() {
    const religionText = document.getElementById("selected-religion");
    
    // Add fade-out effect
    religionText.style.opacity = 0;
    
    setTimeout(() => {
        religionText.textContent = religions[index];
        religionText.style.opacity = 1; // Fade-in effect
    }, 300); 
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
