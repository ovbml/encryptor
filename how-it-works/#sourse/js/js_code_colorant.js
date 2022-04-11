// background: #151718
// definition: #55B5DB
// variable:   #55B5DB
// operator:   #9FCA56
// number:     #CD3F45
// comment:    #41535B
// text:       #CFD2D1
// attribute:  #9FCA56
// keyword:    #E6CD69
// property:   #A074C4
// string:     #55B5DB
// meta:       #55B5DB


// keywords
const kws         = ['await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete',
                     'do', 'else', 'enum', 'export', 'extends', 'finally', 'for', 'function', 'if', 'implements',
                     'import', 'in', 'instanceof', 'interface', 'let', 'new', 'package', 'private', 'protected',
                     'public', 'return', 'super', 'switch', 'static', 'this', 'throw', 'try', 'true', 'typeof', 'var',
                     'void', 'while', 'with', 'yield', 'of'];
const definition  = ['let', 'var', 'const', 'function'];
// i dont use '==', etc. because '==' == '=' + '='
const operators   = ['+', '-', '*', '/', '%', '=', '!', '>', '<', '&', '|', '?', ':'];
const brackets    = ['(', ')', '{', '}', '[', ']'];
const quotes      = ['\'', '"', '`'];
const comments    = {'//': '\n', '/*': '*/'};
const punctuation = ['.', ',', ';'];
const literals    = ['null', 'undefined', 'NaN', 'false', 'true'];

/**
 * for beautiful output a JS Code to HTML page
 * @param  {String} code the JS Code
 * @return {String}      the trimmed JS Code with wrapper <span>s
 */
function toColor(code = '') {
    let wrapperedCode = '';
    let part          = '';
    let type          = {comment: false, definition: false, string: false, property: false};

    code += '\n';

    for ( let i in code ) {
        /* variables initialization */
        i = +i;
        let char     = code[i];
        let lastChar = (i === 0) ? null : code[i-1];


        /* process comments */
        if ( type.comment ) {
            let closeComment = comments[type.comment];
            if ( (lastChar + char).includes(closeComment) ) {
                type.comment = false;
                wrapperedCode += `${char}</span>`;
            } else
                wrapperedCode += char;
            continue;
        }


        /* process string */
        else if ( type.string ) {
            if ( type.string === char && lastChar !== '\\' ) {
                type.string = false;
                wrapperedCode += `${char}</span>`;
            } else
                wrapperedCode += char;
            continue;
        }


        /* create new part if nesseary */
        if ( [...operators, ...brackets, ...quotes, ...punctuation, ' ', '\n'].includes(char) ) {
            if ( kws.includes(part) )
                wrapperedCode += `<span class="code__keyword">${part}</span>`;
            else if ( type.definition )
                wrapperedCode += `<span class="code__definition">${part}</span>`;
            else if ( type.property )
                wrapperedCode += `<span class="code__property">${part}</span>`;
            else if ( !isNaN(part) || literals.includes(part) )
                wrapperedCode += `<span class="code__number">${part}</span>`;
            else if ( part !== '' )
                wrapperedCode += `<span class="code__variable">${part}</span>`;

            type.definition = definition.includes(part);
            type.property = false;

            part = '';
        }


        /* process char */
        // string
        if ( quotes.includes(char) ) {
            wrapperedCode += `<span class="code_string">${char}`;
            type.string = char;
        }

        // comment
        else if ( ['//', '/*'].includes(lastChar + char) ) {
            wrapperedCode += `<span class="code__comment">${lastChar + char}`;
            type.comment = lastChar + char;
        }

        // operators
        else if ( operators.includes(char) ) {
            if ( comments[char + code[i + 1]] === undefined )
                wrapperedCode += `<span class="code__operator">${char}</span>`;
        }

        // text
        else if ( [...brackets, ...punctuation, '\n', ' '].includes(char) ) {
            if ( char === '.' )
                type.property = true;
            wrapperedCode += char;
        } else
            part += char;
    }

    return wrapperedCode.trim();
}

for ( let codeBlock of document.querySelectorAll('.code__code') )
    codeBlock.innerHTML = toColor(codeBlock.innerHTML.replaceAll('\\n', '\n'));