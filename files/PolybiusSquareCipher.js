class PolybiusSquareCipher {
    // alphabets and other (you can add your ownd but dont forgot update replaceMap in set alphabet)
    ru    = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    RU    = this.ru.toUpperCase();
    en    = 'abcdefghijklmnopqrstuvwxyz';
    EN    = this.en.toUpperCase();
    nums  = '0123456789';
    signs = '.,?!"”` ‘\'’№%@$#&^:;<>()[]{}/\\|+-=_—~';

    errors = [];
    _shift = 0;
    _key = 1;
    _alphabet = ' ';
    _unshiftedAlphabet = ' ';

    constructor(alphabet='{ruRUenEN01!$}', shift=0, key=1) {
        this.alphabet = alphabet;
        this.width = Math.floor(Math.sqrt(this.alphabet.length));
        this.shift = shift;
        this.key = key;
    }

    get unshiftedAlphabet() {
        return this._unshiftedAlphabet;
    }
    set unshiftedAlphabet(value) {
        this.alphabet = value;
    }

    get alphabet() {
        return this._alphabet;
    }
    set alphabet(value) {
        // remember shift value to shift new alphabet
        const shift = this.shift;
        this._shift = 0;

        // convert to str
        value += '';

        // vars init
        const replaceMap = {
            ru: this.ru,
            RU: this.RU,

            en: this.en,
            EN: this.EN,

            '01': this.nums,
            '!$': this.signs,
        };
        let part = '';
        let processed = '';
        let open = false;

        // alphabet processing
        for ( let index in value ) {
            index = +index;

            const lastChar = value[index - 1]; // undefined if the 1st char
            const char     = value[index];
            const nextChar = value[index + 1]; // undefined if the last char

            // process { }
            if ( open ) {
                // end { }
                if ( char === '}' && nextChar !== '}' ) {
                    open = false;
                    for ( let replacer of Object.getOwnPropertyNames(replaceMap) )
                        part = part.replaceAll(replacer, replaceMap[replacer]);
                    processed += part;
                    part = '';
                } else
                    part += char;
            }

            // process {{ and }} and the first char
            else if ( char + nextChar === '{{' )
                processed += '{';
            else if ( char + nextChar === '}}' )
                processed += '}';

            // skip {{ and }} at the second char
            else if ( ['{{', '}}'].includes(lastChar + char) ) {}

            // start { }
            else if ( char === '{' && nextChar !== '{' )
                open = true;
            else
                processed += char;
        }

        // return values
        this._unshiftedAlphabet = processed;
        this._alphabet = processed;
        this.shift = shift;
        this.width = Math.floor(Math.sqrt(processed.length));
    }

    get shift() {
        return this._shift;
    }
    set shift(value) {
        const shift = +value % this.alphabet.length;

        if ( isNaN(shift) )
            return this.errors.push('shift');

        // shift the alphabet
        this._alphabet = this.unshiftedAlphabet.slice(shift) + this.unshiftedAlphabet.slice(0, shift);
        // remove "shift" errors
        this.errors = this.errors.filter(function(item) {return item !== 'shift'});
        // return value
        this._shift = shift;
    }

    get key() {
        return this._key;
    }
    set key(value) {
        let key = '';

        for ( let char of (value + '') ) {
            if ( this.nums.includes(char) )
                key += char;
            else {
                if ( this.alphabet.includes(char) )
                    key = +key + this.alphabet.indexOf(char) + '';
                else
                    return this.errors.push('key');
            }
        }

        this.errors = this.errors.filter(function(item) {return item !== 'key'});  // remove "key" errors
        this._key = +key;
    }

    getLetterPosition(alphabet, l) {
        // vars init
        const width = this.width;

        // calc position
        let row = Math.floor(alphabet.indexOf(l) / width);
        let column = alphabet.indexOf(l) % width;
        return {row, column};
    }

    processText(text, mode) {
        // mode === 1 --> encrypt, mode === -1 --> decrypt
        const alphabet = this.alphabet;
        const width    = this.width;
        const shift    = this.shift * mode;
        const key      = this.key * mode;

        let processed = '';

        for ( let char of text ) {
            if ( !alphabet.includes(char) )
                processed += char;
            else
                processed += alphabet.substr((width * key + alphabet.indexOf(char) - shift) % alphabet.length, 1);
        }

        return processed;
    }
    encrypt(text) {
        return this.processText(text, 1);
    }
    decrypt(text) {
        return this.processText(text, -1);
    }
}
