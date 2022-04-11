// start variables values
const cipher = new PolybiusSquareCipher;  // default key, shift and alpgabet in here
let decryptedText = '';
let encryptedText = '';
let editMode = 'decrypted';


// input fields
const inputFilename = document.getElementById('input-filename');
const inputAlphabet = document.getElementById('input-alphabet');
const inputShift    = document.getElementById('input-shift');
const inputKey      = document.getElementById('input-key');
const texteditArea  = document.querySelector('.editor__textarea');
const inputFile     = document.querySelector('input[type="file"]');

// blocks of input fields
const inputFilenameArea = document.getElementById('input-filename-area');
const inputAlphabetArea = document.getElementById('input-alphabet-area');
const inputShiftArea    = document.getElementById('input-shift-area');
const inputKeyArea      = document.getElementById('input-key-area');


// icons
const filenameIcon = document.getElementById('icon-filename');
const alphabetIcon = document.getElementById('icon-alphabet');
const shiftIcon    = document.getElementById('icon-shift');
const keyIcon      = document.getElementById('icon-key');


// tips
const fileErrorTip = document.getElementById('file-error-tip');
const filenameTip  = document.getElementById('filename-tip');
const alphabetTip  = document.getElementById('alphabet-tip');
const shiftTip     = document.getElementById('shift-tip');
const keyTip       = document.getElementById('key-tip');


// updatable values
const filenameValue     = document.getElementById('filename');
const alphabetValue     = document.getElementById('alphabet');
const shiftValue        = document.getElementById('shifted-alphabet');
const keyValue          = document.getElementById('key');
const alphabetLength    = document.getElementById('alphabet-length');
const permutationsCount = document.getElementById('unique-permutations');
const editorTitle       = document.querySelector('.editor__filename');


// buttons
const changeModeButton = document.querySelector('.editor__change-mode');
const downloadButton = document.querySelector('.editor__download');


// tooltip
const tooltip     = document.querySelector('.tooltip');
const tooltipText = document.querySelector('.tooltip__text');

    
// other
const copyTextarea           = document.getElementById('copy-area');
const drag                   = document.querySelector('.drag');
const inputFileBlock         = document.getElementById('settings-input-file');
const downloadLink           = document.getElementById('download');
const changeHandlingCheckbox = document.getElementById('change-handling');


function factorial(n) {
    let result = 1;

    for ( i = 2; i <= n; i++ )
        result *= i;

    return result;
}

function copy(text) {
    copyTextarea.value = text;
    copyTextarea.select();
    document.execCommand("copy");
}

function toShuffle(text) {
    let shuffled = '';
    let count = text.length;

    for ( let i = 0; i < count; i++ ) {
        let randomIndex = Math.floor(Math.random() * text.length);
        shuffled += text[randomIndex];
        text = text.slice(0, randomIndex) + text.slice(randomIndex + 1);
    }

    return shuffled;
}

function getUrl(text) {
    let blob = new Blob([text], {type: 'text/plain'});
    return URL.createObjectURL(blob);
}
