//window.location.href='login.html';
function authentification () {
             var email = $('#email').val();
             var mdp = $('#password').val();
             console.log('email : ' + email);
             console.log('mdp : ' + mdp);
             var initialEmail = "khadidja";
             var mypassword = "admin";
             if( (email == initialEmail && mdp == mypassword)){
                window.location.href='home.html';
                //window.location.replace='home.html'
            }
            else {
                
                alert("Erreur de connexion, reconnexion");
                window.location.href='login.html';
            }
      }

$(document).ready(function(){
    

    $('#seconnecter').click(function(e) {
        e.preventDefault();
        authentification();
    });

});

//document.addEventListener('seconnecter', authentification, false);
// var connexion = {
//     authentification: function() {
//         var email = $('#email').val();
//         var mpd = $('#password').val();
//     }
// }
