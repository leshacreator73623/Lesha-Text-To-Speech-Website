let speech = new SpeechSynthesisUtterance();
const downloadButton = document.getElementById('downloadButton');

document.querySelector("#rate").addEventListener("input", () => {
  const rate = document.querySelector("#rate").value;

  speech.rate = rate;

  document.querySelector("#rate-label").value = rate;
});

document.querySelector("#pitch").addEventListener("input", () => {
  const pitch = document.querySelector("#pitch").value;
 
  speech.pitch = pitch;

  document.querySelector("#pitch-label").value = pitch;
});

document.querySelector("#volume").addEventListener("input", () => {
  const volume = document.querySelector("#volume").value;
 
  speech.volume = volume;

  document.querySelector("#volume-label").value = volume;
});

let voices = [];

let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () =>{
    speech.voice = voices[voiceSelect.value];
});



document.querySelector("button").addEventListener("click", () =>{
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});

function download() {
    if (textInput.value !== '') {
        const text = encodeURIComponent(textInput.value);
        const lang = voiceSelect.value;
        const audioUrl = `https://api.voicerss.org/?key=f42e287e60e148cb87f686f31aa4f1ad&src=${text}&hl=${lang}&r=-3&c=wav`;

        const a = document.createElement('a');
        a.href = audioUrl;
        a.download = 'speech.mp3';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

downloadButton.addEventListener('click', download);
