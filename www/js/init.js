(function ($) {
  "use strict"; // Start of use strict

  $(document).ready(function () {

    // Carroussels
    $('.carousel').carousel();

    $('.sidenav').sidenav();

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.materialboxed').materialbox();
    $('.button-collapse').sideNav();


  
    // $("#formContact").validate({
    //   var nom = $('input[name="nom"]').val();
    //   var email = $('input[name="email"]').val();

    //   if( nom == '' ||  email == '' ){
    //     rules: {
    //       // simple rule, converted to {required:true}
    //       nom: "obligatoire",
    //       // compound rule
    //       email: {
    //         required: true,
    //         email: true
    //       }
    //     }
    //   });
    //   }
     


  }); // end of document ready

  // $('').click(function (e) {
  //   e.preventDefault();

  //   var goto = $(this).attr('href');

  //   $('html, body').animate({
  //     scrollTop: $(goto).offset().top
  //   }, 800);
  // });


})(jQuery); // End of use strict