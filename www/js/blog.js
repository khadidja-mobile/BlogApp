(function ($) {
    "use strict"; // Start of use strict

$(document).ready(function () {

    $('#lire').click(function (e) {

        e.preventDefault();
        articleBlog.showArticleDetails();
    });

    try {
        articleBlog.showArticleDetails();
      } catch (e) {
        console.log(e);
      }

    articleBlog.showArticles();

//     document.getElementById("lire").addEventListener("click", function(e) {
//         articleBlog.showArticleDetails();
//         e.preventDefault;
//   });


});



var articleBlog = {
    
    showArticles: function () {
        //$("#articleDetails").hide();
        $.ajax({
            url: "http://10.0.2.2:5557/articles/", // La ressource ciblée, pour Android utiliser http://10.0.2.2:5556/articles/
            type: "GET", // Le type de la requête HTTP,
            cache: false, // n'enregistre pas temporairement des copies de données
            dataType: 'json', //  Le type de données à recevoir, ici, du json
            success: function (data) {
                console.log(data);
                $.each(data, function (index, article) {
                    $("#listeArticles")
                    .append('<article value="'+ article.id +'" id="'+ article.id +'" class="col s12 m4"><div class="card hoverable"><div class="card-image"><img id="urlPhotoPr" src="'+ article.urlPhotoDetail1 +'" height="150" width="150"></div><div class="card-content"><h5 id="libelle" class="grey-text">'+ article.libelle +'</h5><p id="description1">' + article.description1 +'</p></div><div class="card-action"><button id="lire" class="btn blue" onclick="articleBlog.showArticleDetails('+ article.id +');" > Lire</button></div></div></article>');
                        //.append('<button class="btn waves waves-effect btn-blue" onclick=\"articleBlog.showArticleDetails(\'" + article.id + "\');\" > Lire</button>')
                
                
                    });
         
                $('#listeArticles').show('slow');
            }
        });
    },
    
    showArticleDetails: function(id) {
       //if (id == null) return;
        //$('#listeArticles').hide();
        $.ajax({
            url: "http://localhost:5557/articles/"+id, // La ressource ciblée, pour Android utiliser http://10.0.2.2:5556/articles/
            type: "GET", 
            cache: false, 
            dataType: 'json',
            success: function (article) {
                
                //$('#articleDetails').show();

                $('#libelle').text(article.libelle);
                $('#img1').attr('src', article.urlPhotoDetail1);
                $('#description1').text(article.description1);
                $('#description2').text(article.description2);
                $('#img2').attr('src', article.urlPhotoDetail2);
                $('#img3').attr('src', article.urlPhotoDetail3);

            }
         });
         console.log(article);
         console.log($.ajax);
    }

}

})(jQuery); // End of use strict
