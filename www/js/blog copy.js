
$(document).ready(function () {

    articleBlog.showArticles();

    // $('#lire').click(function (e) {
    //     e.preventDefault();
    //     articleBlog.showArticleDetails();
    // });

    // document.getElementById("lire").addEventListener("click", function() {
    //     articleBlog.showArticleDetails();
    //   });
  
    $('#backtoSearchButton').click(function (e) {
        e.preventDefault();
        articleBlog.backtoSearch();
    })

    $('#newButton').click(function (e) {
        e.preventDefault();
        articleBlog.newArticle();
    });

    $('#saveButton').click(function (e) {
        e.preventDefault();
        articleBlog.saveArticle();
    });

    $('#deleteButton').click(function (e) {
        e.preventDefault();
        articleBlog.deleteArticle();
    });

})

var articleBlog = {
    
    showArticles: function () {
        $("#articleDetails").hide();
        $.ajax({
            url: "http://localhost:5557/articles/", // La ressource ciblée, pour Android utiliser http://10.0.2.2:5556/personnes/
            type: "GET", // Le type de la requête HTTP,
            cache: false, // n'enregistre pas temporairement des copies de données
            dataType: 'json', //  Le type de données à recevoir, ici, du json
            success: function (data) {
                console.log(data);
                $.each(data, function (index, article) {
                    $("#listeArticles")
                        .append('<article value="'+ article.id +'" id="'+ article.id +'" class="col s12 m4"><div class="card hoverable"><div class="card-image"><img id="urlPhotoPr" src="'+ article.urlPhotoDetail1 +'" height="150" width="150"></div><div class="card-content"><h5 id="libelle" class="grey-text">'+ article.libelle +'</h5><p id="description1">' + article.description1 +'</p></div><div class="card-action"><button class="btn blue" onclick=\"showArticleDetails(\'" + article.id + "\');\" > Lire</button></div></div></article>')
                        //.append('<button class="btn waves waves-effect btn-blue" onclick=\"articleBlog.showArticleDetails(\'" + article.id + "\');\" > Lire</button>')
                });
         
                $('#listeArticles').show('slow');
            }
        });
    },
    
    showArticleDetails: function (id) {
       if (id == null) return;
        $('#listeArticles').hide();
        $.ajax({
            url: "http://localhost:5557/articles/" + id, // La ressource ciblée, pour Android utiliser http://10.0.2.2:5556/articles/
            type: "GET", 
            cache: false, 
            dataType: 'json',
            success: function (article) {
                
                $('#articleDetails').show();
                $('#libelle').text(article.libelle);
                $('#img1').attr('src', article.urlPhotoDetail1);
                $('#description1').text(article.description1);
                $('#description2').text(article.description2);
                $('#img2').attr('src', article.urlPhotoDetail2);
                $('#img3').attr('src', article.urlPhotoDetail3);

                console.log(article);
                console.log($('#articleDetails'));
               
            }
         });
         $('#articleDetails').show('slow');
     }

    // backtoSearch: function () {
    //     $('#articleDetails').hide();
    //     $('#personSearchPanel').show();
    //     $('#personList').focus();
    // },

    // collectFieldsValues: function () {
    //     return {
    //         id: $('#id').val(),
    //         nom: $('#nom').val(),
    //         prenom: $('#prenom').val(),
    //     }
    // },

    // refreshSearch: function () {
    //     this.backtoSearch();
    //     this.showPersonList();
    // },

    // newPerson: function () {
    //     $('#personSearchPanel').hide();
    //     $('#articleDetails').show();
    //     $('#id').attr('value', null);
    //     $('#nom').attr('value', 'New Person').focus().select();
    //     $('#prenom').attr('value', 'New Person');

    // },

    // savePerson: function () {
    //     if (!confirm('Save ?')) return false;
    //     var requestType = $('#id').val() != '' ? 'PUT' : 'POST';
    //     $.ajax({
    //         url: "http://localhost:5557/articles" + $('#id').val(), // La ressource ciblée, pour Android utiliser http://10.0.2.2:5556/personnes/
    //         type: requestType, // Le type de la requête HTTP,
    //         data: articleBlog.collectFieldsValues(), // On passe nos données à l'url
    //         dataType: 'json', //  Le type de données à recevoir, ici, du json
    //         success: function (result) {
    //             if (result.error) {
    //                 alert(result.error[0].message);
    //             } else {
    //                 if (requestType == 'POST')
    //                     alert('ID de la nouvelle entrée : ' + result.id);
    //                 articleBlog.refreshSearch();
    //             }
    //         }
    //     });
    // },

    // deletePerson: function () {
    //     if (!confirm('Delete?')) return;
    //     $.ajax({
    //         url: 'http://localhost:5557/articles' + $('#id').val(),
    //         dataType: 'json',
    //         type: 'DELETE',
    //         success: function (result) {
    //             if (result.errors)
    //                 alert(result.errors[0].message);
    //             else
    //                 articleBlog.refreshSearch();
    //         }
    //     });
    // },

}
