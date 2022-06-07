import $ from 'jquery';
import gsap from 'gsap';

$( '.js-navigation-toggle' ).on( 'click', ( e ) => {
    e.preventDefault();
    let $button = $( e.currentTarget );

    if ( ! $button.hasClass( 'open') ) {
        let timeline = gsap.timeline();
        
        gsap.set( '.header__navigation', { height: 'auto' } );
        timeline
            .from( '.header__navigation', { height: 0, duration: .2, onComplete: () => {
                gsap.set( '.header__navigation', { height: 'calc(100% - var(--heade-height))' } );
            } } )
            .from( '.header__menu > li, .header__calls > a', { autoAlpha: 0, duration: .2, stagger: .05 } );

        $button.addClass( 'open' );
    } else {
        let timeline = gsap.timeline();

        timeline
            .to( '.header__menu, .header__calls > a', { autoAlpha: 0, duration: .2 } )
            .to( '.header__navigation', { height: 0, duration: .2, onComplete: () => {
                gsap.set( '.header__navigation, .header__menu, .header__menu > li, .header__calls > a', { clearProps: 'all' } );
            } } );
        $button.removeClass( 'open' );
    }
} );