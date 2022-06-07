import $ from 'jquery';
import './components/header';
import { initFrontPage as frontPage } from './views/FrontPage';

$( document ).ready( () => { 
    $( 'html' ).removeClass( 'no-js' ).addClass( 'js' );

    frontPage();
} );