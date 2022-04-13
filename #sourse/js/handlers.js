// focus input fields
for ( let element of document.querySelectorAll('.settings__input-area') ) {
    element.onclick = function() {
        this.querySelector('input').focus();
    };
    element.querySelector('input').onfocus = function() {
        this.parentElement.classList.add('_focus');
    };
    element.querySelector('input').onblur = function() {
        this.parentElement.classList.remove('_focus');
    };
}

// input data
inputFilename.onchange = function() {
    this.value = this.value.trim();

    if ( !this.value.endsWith('.txt') && this.value !== '' )
        this.value += '.txt';

    // valid
    for ( let letter of "\\/:*?\"<>|+" )
        if ( this.value.includes(letter) || this.value[this.value.length - 1] === '.' ) {
            inputFilenameArea.classList.remove('_valid');
            inputFilenameArea.classList.add('_invalid');
            return;
        }
    inputFilenameArea.classList.add('_valid');
    inputFilenameArea.classList.remove('_invalid');

    editorTitle.innerText = filename = this.value ? this.value : filenameValue.innerText;

    if ( this.value === '' )
        inputFilenameArea.classList.remove('_valid');
};
inputAlphabet.onchange = function() {
    // set default or getted value
    cipher.unshiftedAlphabet = this.value ? this.value : '{ruRUenEN01!$}';

    // calc alphabet letters
    alphabetValue.innerText = cipher.unshiftedAlphabet;
    // calc length
    alphabetLength.innerText = cipher.alphabet.length;
    // calc permutations
    let count = factorial(cipher.alphabet.length).toFixed(2);
    if ( count.includes('e') ) {
        let exp = count.slice(count.indexOf('e')).replaceAll('+', '');
        permutationsCount.innerText = count.slice(0, 4) + exp;
    } else
        permutationsCount.innerText = +count;

    // update other values
    inputShift.onchange();
};
inputShift.onchange = function() {
    cipher.shift = this.value;
    shiftValue.innerText = cipher.alphabet;

    inputKey.onchange();
};
inputKey.onchange = function() {
    // change key
    if ( this.value ) {
        cipher.key = this.value;
        keyValue.innerText = cipher.key; 
    } else
        keyValue.innerText = cipher.key = 1;

    // empty selection
    document.getSelection().empty();

    // validation
    if ( cipher.errors.includes('key') ) {
        inputKeyArea.classList.add('_invalid');
        inputKeyArea.classList.remove('_valid');
    } else {
        inputKeyArea.classList.add('_valid');
        inputKeyArea.classList.remove('_invalid');
    }
    if ( this.value === '' )
        inputKeyArea.classList.remove('_valid');

    if ( changeHandlingCheckbox.checked )
        encryptedText = cipher.encrypt(decryptedText);
    else
        decryptedText = cipher.decrypt(encryptedText);

    // reencrypt text in texteditArea if nesseary
    if ( editMode === 'encrypted' ) {
        texteditArea.value = encryptedText;
    } else if ( editMode === 'decrypted' )
        texteditArea.value = decryptedText;
};
texteditArea.onchange = function() {
    decryptedText = this.value;
    encryptedText = cipher.encrypt(this.value);
};


// click on tips
filenameTip.onclick = function() {
    inputFilename.value = '';
    inputFilename.onchange();
};
alphabetTip.onclick = function() {
    inputAlphabet.value  = toShuffle(cipher.unshiftedAlphabet).replaceAll('{', '{{').replaceAll('}', '}}');
    inputAlphabet.onchange();
};
shiftTip.onclick = function() {
    // save value
    const text = shiftValue.innerText;
    // copy
    copy(text);
    // alert about it
    shiftValue.innerText = 'Успешно скопировано!';
    // return saved value
    setTimeout(function() {
        shiftValue.innerText = text;
    }, 500);
};
keyTip.onclick = function() {
    // save value
    const text = keyValue.innerText;
    // copy
    copy(text);
    // alert about it
    keyValue.innerText = 'Успешно скопировано!';
    // return saved value
    setTimeout(function() {
        keyValue.innerText = text;
    }, 500);
};


// buttons
changeModeButton.onclick = function() {
    if ( editMode === 'encrypted' ) {
        editMode = 'decrypted';

        this.innerText = 'Показать шифротекст';
        texteditArea.removeAttribute('readonly');
        texteditArea.value = cipher.decrypt(texteditArea.value);
    } else if ( editMode === 'decrypted' ) {
        editMode = 'encrypted';

        this.innerText = 'Показать текст';
        texteditArea.setAttribute('readonly', 'true');
        texteditArea.value = cipher.encrypt(texteditArea.value);
    }
};


// drag and drop
document.documentElement.ondragover = function(event) {
    event.preventDefault();

    // skip if is not a file
    if ( event.dataTransfer.items[0].kind !== 'file' )
        return;

    drag.style.display = 'block';
};
document.documentElement.ondragend = function(event) {
    event.preventDefault();
    drag.style.display = 'none';
};
document.ondrop = function(event) {
    event.preventDefault();

    if ( event.dataTransfer.items[0].kind !== 'file' )
        return;

    fileHandler(event.dataTransfer.files[0]);
    drag.style.display = 'none';
};
drag.onclick = function() {
    this.style.display = 'none';
};


// click to import file
inputFileBlock.onclick = function() {
    inputFile.click();
};
inputFile.onchange = function() {
    fileHandler(this.files[0]);
};


// download
downloadButton.addEventListener('click', function() {
    downloadLink.href = getUrl(encryptedText);
    downloadLink.download = document.querySelector('.editor__filename').innerText;
    downloadLink.click();
});


// functions
function fileHandler(file) {
    if ( file.type === 'text/plain' ) {
        // init reader and read text from file
        const reader = new FileReader();
        reader.readAsText(file, 'utf-8');
        reader.onload = function() {
            encryptedText = reader.result;
            decryptedText = cipher.decrypt(encryptedText);

            if ( editMode === 'decrypted' )
                texteditArea.value = decryptedText;
            else if ( editMode === 'encrypted' )
                texteditArea.value = encryptedText;
        };

        // change DOM
        texteditArea.placeholder = 'Файл пуст';
        filenameValue.innerText = file.name;
        inputFilename.placeholder = `Имя файла (${file.name})`;

        fileErrorTip.innerText = `Файл "${file.name}" текстовый.`;
        fileErrorTip.classList.remove('settings__tip_invalid-error');
        fileErrorTip.classList.add('settings__tip_valid-error');

        inputFilename.onchange();
    } else {
        fileErrorTip.innerText = `Файл "${file.name}" не является текстовым. Оставлен файл "${editorTitle.innerText}".`;
        fileErrorTip.classList.add('settings__tip_invalid-error');
        fileErrorTip.classList.remove('settings__tip_valid-error');
    }
}