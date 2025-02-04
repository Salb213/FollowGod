document.addEventListener("DOMContentLoaded", function () {
    const religions = {
        en: ["Agnostic", "Atheist", "Muslim", "Jewish", "Buddhist", "Hindu", "Catholic", "Protestant"],
        de: ["Agnostiker", "Atheist", "Muslim", "Jude", "Buddhist", "Hindu", "Katholik", "Protestant"],
        pl: ["Agnostyk", "Ateista", "Muzułmanin", "Żyd", "Budda", "Hindus", "Katolik", "Protestant"]
    };

    const translations = {
        en: {
            title: "Follow God",
            subtitle: "Choose your current religion or belief system.",
            start: "Get Started",
            questionPrefix: "Question"
        },
        de: {
            title: "Folge Gott",
            subtitle: "Wähle deine aktuelle Religion oder Weltanschauung.",
            start: "Loslegen",
            questionPrefix: "Frage"
        },
        pl: {
            title: "Podążaj za Bogiem",
            subtitle: "Wybierz swoją obecną religię lub światopogląd.",
            start: "Zacznij",
            questionPrefix: "Pytanie"
        }
    };

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

    let index = 0;
    let currentLang = "en";
    let currentQuestionIndex = -1;
    const userResponses = {};

    function updateLanguage() {
        document.getElementById("title").textContent = translations[currentLang].title;
        document.getElementById("subtitle").textContent = translations[currentLang].subtitle;
        document.getElementById("start-btn").textContent = translations[currentLang].start;
        updateReligion();
    }

    function updateReligion() {
        document.getElementById("selected-religion").textContent = religions[currentLang][index];
    }

    document.getElementById("language").addEventListener("change", (event) => {
        currentLang = event.target.value;
        updateLanguage();
    });

    document.getElementById("prev").addEventListener("click", () => {
        index = (index - 1 + religions[currentLang].length) % religions[currentLang].length;
        updateReligion();
    });

    document.getElementById("next").addEventListener("click", () => {
        index = (index + 1) % religions[currentLang].length;
        updateReligion();
    });

    document.getElementById("start-btn").addEventListener("click", () => {
        document.getElementById("main-section").style.display = "none";
        document.getElementById("question-section").style.display = "block";
        setTimeout(nextQuestion, 500);
    });

    function nextQuestion() {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            const questionData = questions[currentQuestionIndex];

            // Ensure elements exist before modifying them
            const questionNumberEl = document.getElementById("question-number");
            const progressBarEl = document.getElementById("progress-bar");
            const questionLabelEl = document.getElementById("question-label");
            const selectEl = document.getElementById("question-options");

            if (!questionNumberEl || !progressBarEl || !questionLabelEl || !selectEl) {
                console.error("One or more question elements are missing in the HTML.");
                return;
            }

            // Update question number
            questionNumberEl.textContent = `${translations[currentLang].questionPrefix} ${currentQuestionIndex + 1} of ${questions.length}`;

            // Update progress bar
            progressBarEl.style.width = ((currentQuestionIndex + 1) / questions.length) * 100 + "%";

            // Update text and options
            questionLabelEl.textContent = questionData.text;
            selectEl.innerHTML = "";
            questionData.options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option.value;
                optionElement.textContent = option.label;
                selectEl.appendChild(optionElement);
            });

            // Fade in question
            document.getElementById("question-content").style.opacity = "1";
        } else {
            window.location.href = "guide.html";
        }
    }

    document.getElementById("next-question-btn").addEventListener("click", () => {
        const selectedValue = document.getElementById("question-options").value;
        userResponses[questions[currentQuestionIndex].text] = selectedValue;

        document.getElementById("question-content").style.opacity = "0";
        setTimeout(nextQuestion, 500);
    });

    updateLanguage();
});
