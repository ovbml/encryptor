class PolybiusSquareCipher{ru="абвгдеёжзийклмнопрстуфхцчшщъыьэюя";RU=this.ru.toUpperCase();en="abcdefghijklmnopqrstuvwxyz";EN=this.en.toUpperCase();nums="0123456789";signs=".,?!\"”` ‘'’№%@$#&^:;<>()[]{}/\\|+-=_—~";errors=[];_shift=0;_key=1;_alphabet=" ";_unshiftedAlphabet=" ";constructor(e="{ruRUenEN01!$}",t=0,i=1){this.alphabet=e,this.width=Math.floor(Math.sqrt(this.alphabet.length)),this.shift=t,this.key=i}get unshiftedAlphabet(){return this._unshiftedAlphabet}set unshiftedAlphabet(e){this.alphabet=e}get alphabet(){return this._alphabet}set alphabet(e){const t=this.shift;this._shift=0,e+="";const i={ru:this.ru,RU:this.RU,en:this.en,EN:this.EN,"01":this.nums,"!$":this.signs};let n="",l="",a=!1;for(let t in e){t=+t;const r=e[t-1],o=e[t],s=e[t+1];if(a)if("}"===o&&"}"!==s){a=!1;for(let e of Object.getOwnPropertyNames(i))n=n.replaceAll(e,i[e]);l+=n,n=""}else n+=o;else o+s==="{{"?l+="{":o+s==="}}"?l+="}":["{{","}}"].includes(r+o)||("{"===o&&"{"!==s?a=!0:l+=o)}this._unshiftedAlphabet=l,this._alphabet=l,this.shift=t,this.width=Math.floor(Math.sqrt(l.length))}get shift(){return this._shift}set shift(e){const t=+e%this.alphabet.length;if(isNaN(t))return this.errors.push("shift");this._alphabet=this.unshiftedAlphabet.slice(t)+this.unshiftedAlphabet.slice(0,t),this.errors=this.errors.filter((function(e){return"shift"!==e})),this._shift=t}get key(){return this._key}set key(e){let t="";for(let i of e+"")if(this.nums.includes(i))t+=i;else{if(!this.alphabet.includes(i))return this.errors.push("key");t=+t+this.alphabet.indexOf(i)+""}this.errors=this.errors.filter((function(e){return"key"!==e})),this._key=+t}getLetterPosition(e,t){const i=this.width;return{row:Math.floor(e.indexOf(t)/i),column:e.indexOf(t)%i}}processText(e,t){const i=this.alphabet,n=this.width,l=this.shift*t,a=this.key*t;let r="";for(let t of e)i.includes(t)?r+=i.substr((n*a+i.indexOf(t)-l)%i.length,1):r+=t;return r}encrypt(e){return this.processText(e,1)}decrypt(e){return this.processText(e,-1)}}const cipher=new PolybiusSquareCipher;let decryptedText="",encryptedText="",editMode="decrypted";const inputFilename=document.getElementById("input-filename"),inputAlphabet=document.getElementById("input-alphabet"),inputShift=document.getElementById("input-shift"),inputKey=document.getElementById("input-key"),texteditArea=document.querySelector(".editor__textarea"),inputFile=document.querySelector('input[type="file"]'),inputFilenameArea=document.getElementById("input-filename-area"),inputAlphabetArea=document.getElementById("input-alphabet-area"),inputShiftArea=document.getElementById("input-shift-area"),inputKeyArea=document.getElementById("input-key-area"),filenameIcon=document.getElementById("icon-filename"),alphabetIcon=document.getElementById("icon-alphabet"),shiftIcon=document.getElementById("icon-shift"),keyIcon=document.getElementById("icon-key"),fileErrorTip=document.getElementById("file-error-tip"),filenameTip=document.getElementById("filename-tip"),alphabetTip=document.getElementById("alphabet-tip"),shiftTip=document.getElementById("shift-tip"),keyTip=document.getElementById("key-tip"),filenameValue=document.getElementById("filename"),alphabetValue=document.getElementById("alphabet"),shiftValue=document.getElementById("shifted-alphabet"),keyValue=document.getElementById("key"),alphabetLength=document.getElementById("alphabet-length"),permutationsCount=document.getElementById("unique-permutations"),editorTitle=document.querySelector(".editor__filename"),changeModeButton=document.querySelector(".editor__change-mode"),downloadButton=document.querySelector(".editor__download"),tooltip=document.querySelector(".tooltip"),tooltipText=document.querySelector(".tooltip__text"),copyTextarea=document.getElementById("copy-area"),drag=document.querySelector(".drag"),inputFileBlock=document.getElementById("settings-input-file"),downloadLink=document.getElementById("download"),changeHandlingCheckbox=document.getElementById("change-handling");function factorial(e){let t=1;for(i=2;i<=e;i++)t*=i;return t}function copy(e){copyTextarea.value=e,copyTextarea.select(),document.execCommand("copy")}function toShuffle(e){let t="",i=e.length;for(let n=0;n<i;n++){let i=Math.floor(Math.random()*e.length);t+=e[i],e=e.slice(0,i)+e.slice(i+1)}return t}function getUrl(e){let t=new Blob([e],{type:"text/plain"});return URL.createObjectURL(t)}for(let e of document.querySelectorAll(".settings__input-area"))e.onclick=function(){this.querySelector("input").focus()},e.querySelector("input").onfocus=function(){this.parentElement.classList.add("_focus")},e.querySelector("input").onblur=function(){this.parentElement.classList.remove("_focus")};function fileHandler(e){if("text/plain"===e.type){const t=new FileReader;t.readAsText(e,"utf-8"),t.onload=function(){encryptedText=t.result,decryptedText=cipher.decrypt(encryptedText),"decrypted"===editMode?texteditArea.value=decryptedText:"encrypted"===editMode&&(texteditArea.value=encryptedText)},texteditArea.placeholder="Файл пуст",filenameValue.innerText=e.name,inputFilename.placeholder=`Имя файла (${e.name})`,fileErrorTip.innerText=`Файл "${e.name}" текстовый.`,fileErrorTip.classList.remove("settings__tip_invalid-error"),fileErrorTip.classList.add("settings__tip_valid-error"),inputFilename.onchange()}else fileErrorTip.innerText=`Файл "${e.name}" не является текстовым. Оставлен файл "${editorTitle.innerText}".`,fileErrorTip.classList.add("settings__tip_invalid-error"),fileErrorTip.classList.remove("settings__tip_valid-error")}inputFilename.onchange=function(){this.value=this.value.trim(),this.value.endsWith(".txt")||""===this.value||(this.value+=".txt");for(let e of'\\/:*?"<>|+')if(this.value.includes(e)||"."===this.value[this.value.length-1])return inputFilenameArea.classList.remove("_valid"),void inputFilenameArea.classList.add("_invalid");inputFilenameArea.classList.add("_valid"),inputFilenameArea.classList.remove("_invalid"),editorTitle.innerText=filename=this.value?this.value:filenameValue.innerText,""===this.value&&inputFilenameArea.classList.remove("_valid")},inputAlphabet.onchange=function(){cipher.unshiftedAlphabet=this.value?this.value:"{ruRUenEN01!$}",alphabetValue.innerText=cipher.unshiftedAlphabet,alphabetLength.innerText=cipher.alphabet.length;let e=factorial(cipher.alphabet.length).toFixed(2);if(e.includes("e")){let t=e.slice(e.indexOf("e")).replaceAll("+","");permutationsCount.innerText=e.slice(0,4)+t}else permutationsCount.innerText=+e;inputShift.onchange()},inputShift.onchange=function(){cipher.shift=this.value,shiftValue.innerText=cipher.alphabet,inputKey.onchange()},inputKey.onchange=function(){this.value?(cipher.key=this.value,keyValue.innerText=cipher.key):keyValue.innerText=cipher.key=1,document.getSelection().empty(),cipher.errors.includes("key")?(inputKeyArea.classList.add("_invalid"),inputKeyArea.classList.remove("_valid")):(inputKeyArea.classList.add("_valid"),inputKeyArea.classList.remove("_invalid")),""===this.value&&inputKeyArea.classList.remove("_valid"),changeHandlingCheckbox.checked?encryptedText=cipher.encrypt(decryptedText):decryptedText=cipher.decrypt(encryptedText),"encrypted"===editMode?texteditArea.value=encryptedText:"decrypted"===editMode&&(texteditArea.value=decryptedText)},texteditArea.onchange=function(){decryptedText=this.value,encryptedText=cipher.encrypt(this.value)},filenameTip.onclick=function(){inputFilename.value="",inputFilename.onchange()},alphabetTip.onclick=function(){inputAlphabet.value=toShuffle(cipher.unshiftedAlphabet).replaceAll("{","{{").replaceAll("}","}}"),inputAlphabet.onchange()},shiftTip.onclick=function(){const e=shiftValue.innerText;copy(e),shiftValue.innerText="Успешно скопировано!",setTimeout((function(){shiftValue.innerText=e}),500)},keyTip.onclick=function(){const e=keyValue.innerText;copy(e),keyValue.innerText="Успешно скопировано!",setTimeout((function(){keyValue.innerText=e}),500)},changeModeButton.onclick=function(){"encrypted"===editMode?(editMode="decrypted",this.innerText="Показать шифротекст",texteditArea.removeAttribute("readonly"),texteditArea.value=cipher.decrypt(texteditArea.value)):"decrypted"===editMode&&(editMode="encrypted",this.innerText="Показать текст",texteditArea.setAttribute("readonly","true"),texteditArea.value=cipher.encrypt(texteditArea.value))},document.documentElement.ondragover=function(e){e.preventDefault(),"file"===e.dataTransfer.items[0].kind&&(drag.style.display="block")},document.documentElement.ondragend=function(e){e.preventDefault(),drag.style.display="none"},document.ondrop=function(e){e.preventDefault(),"file"===e.dataTransfer.items[0].kind&&(fileHandler(e.dataTransfer.files[0]),drag.style.display="none")},drag.onclick=function(){this.style.display="none"},inputFileBlock.onclick=function(){inputFile.click()},inputFile.onchange=function(){fileHandler(this.files[0])},downloadButton.addEventListener("click",(function(){downloadLink.href=getUrl(encryptedText),downloadLink.download=document.querySelector(".editor__filename").innerText,downloadLink.click()})),document.querySelector(".editor__download").onclick=function(){this.style.animationName="",this.scrollWidth=this.offsetHeight,this.style.animationName="download-rotation"};