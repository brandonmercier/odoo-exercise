import $ from 'jquery';
import Flickity from 'flickity';
import 'flickity-imagesloaded';
import 'bootstrap/js/dist/collapse';

class FrontPage {
    constructor( container ) {
        this.self = container;

        this.awardsCarousel();
    }

    awardsCarousel() {
        if ( ! $( '.js-awards-carousel' ).length ) return false;

        const awardsCarousel = new Flickity( '.js-awards-carousel', {
            imagesLoaded: true,
            groupCells: true,
            pageDots: false,
            cellAlign: 'left',
            adaptiveHeight: false
        } );
    }
}

const init = () => {
    const $view = $( '.view-home' );

    if ( ! $view.length ) return false;
    return new FrontPage( $view );
}

export { init as initFrontPage }