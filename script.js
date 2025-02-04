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

const questions = [
    {
        text: "How strongly do you hold your belief?",
        options: [
            { value: "strong", label: "Strong Believer" },
            { value: "moderate", label: "Moderate Believer" },
            { value: "open", label: "Open-Minded" },
            { value: "questioning", label: "Questioning/Doubting" }
        ]
    },
    {
        text: "What are you most curious about?",
        options: [
            { value: "history", label: "History" },
            { value: "philosophy", label: "Philosophy" },
            { value: "science", label: "Science" },
            { value: "personal", label: "Personal Fulfillment" }
        ]
    },
    {
        text: "How much do you know about Christianity?",
        options: [
            { value: "beginner", label: "Beginner (Who was Jesus?)" },
            { value: "intermediate", label: "Intermediate (I know some basics)" },
            { value: "advanced", label: "Advanced (I'm familiar with deep theology)" }
        ]
    }
];

let currentQuestionIndex = -1;
const userResponses = {};

// Handle "Get Started" button click
document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("main-section").style.display = "none";
    document.getElementById("question-section").style.display = "block";

    setTimeout(() => {
        document.getElementById("question-title").style.opacity = 0;
        setTimeout(() => {
            nextQuestion();
        }, 500);
    }, 1500);
});

// Load next question with fade effect
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        const questionData = questions[currentQuestionIndex];

        // Update text and options
        document.getElementById("question-label").textContent = questionData.text;
        const select = document.getElementById("question-options");
        select.innerHTML = "";
        questionData.options.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            select.appendChild(optionElement);
        });

        // Fade in question
        document.getElementById("question-content").style.opacity = 1;
    } else {
        // All questions answered, redirect to guide
        window.location.href = "guide.html";
    }
}

// Store user response and move to next question
document.getElementById("next-question-btn").addEventListener("click", () => {
    const selectedValue = document.getElementById("question-options").value;
    userResponses[questions[currentQuestionIndex].text] = selectedValue;

    // Fade out current question before loading next one
    document.getElementById("question-content").style.opacity = 0;
    setTimeout(nextQuestion, 500);
});
