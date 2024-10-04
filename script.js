const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const loadingIndicator = document.getElementById('loading');
const translateButton = document.getElementById('translate-btn');
const multiTranslateButton = document.getElementById('multi-translate');
const translationOutput = document.getElementById('translation-output');

// Theme toggle
themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    document.getElementById('theme-icon').style.display = body.classList.contains('dark-mode') ? 'none' : 'inline';
    document.getElementById('theme-icon-light').style.display = body.classList.contains('dark-mode') ? 'inline' : 'none';
});

// Load languages dynamically
const loadLanguages = async () => {
    const response = await fetch('https://libretranslate.com/languages');
    const languages = await response.json();
    const sourceLangSelect = document.getElementById('source-lang');
    const targetLangSelect = document.getElementById('target-lang');

    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.name;
        sourceLangSelect.appendChild(option);
        const optionClone = option.cloneNode(true);
        targetLangSelect.appendChild(optionClone);
    });
};

loadLanguages();

// Translate function
const translateText = async (source, target, text) => {
    loadingIndicator.style.display = 'block';
    const response = await fetch('https://libretranslate.com/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: text,
            source: source,
            target: target,
            format: 'text'
        }),
    });
    const result = await response.json();
    loadingIndicator.style.display = 'none';
    return result.translatedText;
};

// Single translate
translateButton.addEventListener('click', async () => {
    const sourceLang = document.getElementById('source-lang').value;
    const textInput = document.getElementById('text-input').value;
    const translatedText = await translateText(sourceLang, 'en', textInput);
    translationOutput.textContent = translatedText;
});

// Multi-step translate
multiTranslateButton.addEventListener('click', async () => {
    const sourceLang = document.getElementById('source-lang').value;
    const textInput = document.getElementById('text-input').value;

    // Example of translating through multiple languages
    const intermediateLang = 'es'; // Example intermediate language (Spanish)
    const firstTranslation = await translateText(sourceLang, intermediateLang, textInput);
    const finalTranslation = await translateText(intermediateLang, 'en', firstTranslation);
    translationOutput.textContent = finalTranslation;
});
