const religions = {
    en: ["Agnostic", "Atheist", "Muslim", "Jewish", "Buddhist", "Hindu", "Catholic", "Protestant"],
    de: ["Agnostiker", "Atheist", "Muslim", "Jude", "Buddhist", "Hindu", "Katholik", "Protestant"],
    pl: ["Agnostyk", "Ateista", "Muzułmanin", "Żyd", "Budda", "Hindus", "Katolik", "Protestant"]
};

const translations = {
    en: {
        title: "Follow God",
        subtitle: "Choose your current religion or belief system.",
        start: "Get Started"
    },
    de: {
        title: "Folge Gott",
        subtitle: "Wähle deine aktuelle Religion oder Weltanschauung.",
        start: "Loslegen"
    },
    pl: {
        title: "Podążaj za Bogiem",
        subtitle: "Wybierz swoją obecną religię lub światopogląd.",
        start: "Zacznij"
    }
};

let index = 0;
let currentLang = "en";

// Update text based on language
function updateLanguage() {
    document.getElementById("title").textContent = translations[currentLang].title;
    document.getElementById("subtitle").textContent = translations[currentLang].subtitle;
    document.getElementById("start-btn").textContent = translations[currentLang].start;
    updateReligion();
}

// Update religion display
function updateReligion() {
    document.getElementById("selected-religion").textContent = religions[currentLang][index];
}

// Language change event
document.getElementById("language").addEventListener("change", (event) => {
    currentLang = event.target.value;
    updateLanguage();
});

// Previous religion
document.getElementById("prev").addEventListener("click", () => {
    index = (index - 1 + religions[currentLang].length) % religions[currentLang].length;
    updateReligion();
});

// Next religion
document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % religions[currentLang].length;
    updateReligion();
});

// Initialize with default language
updateLanguage();
