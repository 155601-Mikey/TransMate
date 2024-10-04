const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

const translateButton = document.getElementById('translate-btn');
translateButton.addEventListener('click', async () => {
    const sourceLang = document.getElementById('source-lang').value;
    const targetLang = document.getElementById('target-lang').value;
    const textInput = document.getElementById('text-input').value;

    // Call translation API here
    const translationOutput = document.getElementById('translation-output');
    translationOutput.textContent = "Translated text goes here"; // Replace with actual translation
});
