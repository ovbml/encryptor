for ( let element of document.querySelectorAll('*[data-tooltip]') ) {
    element.onmousemove = function(event) {
        const bottomViewportPosition = window.pageYOffset + document.documentElement.clientHeight;
        const rightViewportPosition = window.pageXOffset + document.documentElement.clientWidth;

        let top = Math.min(event.pageY + 20, bottomViewportPosition - tooltip.scrollHeight - 5);
        let left = Math.min(event.pageX + 10, rightViewportPosition - tooltip.scrollWidth - 5);

        // move tooltip
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.display = 'inline';
        tooltipText.innerText = this.dataset.tooltip;
    };
    element.onmouseout = function(event) {
        tooltip.style.display = 'none';
    };
}