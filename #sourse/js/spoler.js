for ( let title of document.querySelectorAll('.footer__card-title') ) {
    title.onclick = function() {
        if ( document.body.scrollWidth > 900 )
            return;

        const card = this.parentElement;

        if ( this.classList.contains('_active') ) {
            card.style.height = card.scrollHeight - 2 + 'px';
            setTimeout(function() {
                card.style.height = title.offsetHeight + 'px';
            }, 0);
        } else {
            card.style.height = card.scrollHeight + 'px';
            setTimeout(function() {
                card.style.height = 'auto';
            }, 300);
        }

        this.classList.toggle('_active');
    };

    if ( !title.classList.contains('_active') ) {
        title.classList.add('_active');
        title.onclick();
    }
}