document.querySelector('.editor__download').onclick = function() {
    this.style.animationName = '';
    this.scrollWidth = this.offsetHeight;
    this.style.animationName = 'download-rotation';
};