var postManager = {
    // Liste articles Blog
    showPostList: function () {
        $.ajax({
            //url: "http://localhost:5557/articles/", // La ressource ciblée, pour Android utiliser http://10.0.2.2:5557/articles/
            url: "http://10.0.2.2:5557/articles/",
            type: "GET", // Le type de la requête HTTP,
            cache: false, // n'enregistre pas temporairement des copies de données
            dataType: 'json', //  Le type de données à recevoir, ici, du json
            success: function (data) {
                console.log(data);
                $('#postList li').remove();
                $.each(data, function (index, article) {
                    $('<article class="col s12 m6 l4">')
                        .html('<div class="card hoverable"><div class="card-image"><img id="urlPhotoPr" src="'+ article.urlPhotoDetail1 +'" height="150" width="150"></div><div class="card-content"><h5 id="libelle" class="grey-text">'+ article.libelle +'</h5><p id="description1">' + article.description1 +'</p></div>')
                        .attr('value', article.id).appendTo($('#postList'))
                        .append("<button class=\"btn btn-primary blue\" onclick=\"postManager.showPost(\'" + article.id + "\');\" >Lire</button>")
                        ;
                });
                $('#postListPanel').show();
                $('#post').hide();
            }
        });
    },
    // Lire l'article à l'id = id
    showPost: function (id) {
        if (id == null) return;
        $('#postSearchPanel').hide();
        $.ajax({
            //url: "http://localhost:5557/articles/" + id, // La ressource ciblée, pour Android utiliser http://10.0.2.2:5557/articles/
            url: "http://10.0.2.2:5557/articles/" + id,
            type: "GET", // Le type de la requête HTTP,
            cache: false, // n'enregistre pas temporairement des copies de données
            dataType: 'json', //  Le type de données à recevoir, ici, du json
            success: function (article) {
                console.log(article);
                $('#post').show();
                $('#id').attr('value', article.id);
                $('#libelle').text(article.libelle);
                $('#description1').text(article.description1);
                $('#description2').text(article.description2);
                $('#urlPhotoPr').attr('src', article.urlPhotoPr);
                $('#urlPhotoDetail1').attr('src', article.urlPhotoDetail1);
                $('#urlPhotoDetail2').attr('src', article.urlPhotoDetail2);
                $('#urlPhotoDetail3').attr('src', article.urlPhotoDetail3);
                $("#post").append("<button class=\"btn btn-primary blue\" onclick=\"postManager.editPost(\'" + article.id + "\');\" >Modifier</button>");
            }
        });
    },
    // Modifier l'article à l'id = id
    editPost: function (id) {
        if (id == null) return;
        $('#postSearchPanel').hide();
        $('#post').hide();
        $.ajax({
            //url: "http://localhost:5557/articles/" + id, // La ressource ciblée, pour Android utiliser http://10.0.2.2:5557/articles/
            url: "http://10.0.2.2:5557/articles/" + id,
            type: "GET", // Le type de la requête HTTP,
            cache: false, // n'enregistre pas temporairement des copies de données
            dataType: 'json', //  Le type de données à recevoir, ici, du json
            success: function (post) {
                //var post = jQuery.parseJSON(article);
                console.log(post);

                $('#postDetailsPanel').show();
                $('#id').attr('value', post.id);
                $('#libelle').attr('value', post.libelle);
                $('#description1').attr('value', post.description1);
                $('#description2').attr('value', post.description2);
                $('#urlPhotoPr').attr('src', post.urlPhotoPr);
                $('#urlPhotoDetail1').attr('src', post.urlPhotoDetail1);
                $('#urlPhotoDetail2').attr('src', post.urlPhotoDetail2);
                $('#urlPhotoDetail3').attr('src', post.urlPhotoDetail3);
            }
        });
    },

    backtoSearch: function () {
        $('#postDetailsPanel').hide();
        $('#postSearchPanel').hide();
        $('#post').show();
        $('#postList').focus();
    },

    collectFieldsValues: function () {
        return {
            id: $('#id').val(),
            libelle: $('#libelle').val(),
            description1: $('#description1').val(),
            description2: $('#description2').val(),
            urlPhotoPr: $('#urlPhotoPr').attr('src'),
            urlPhotoDetail1: $('#urlPhotoDetail1').attr('src'),
            urlPhotoDetail2: $('#urlPhotoDetail2').attr('src'),
            urlPhotoDetail3: $('#urlPhotoDetail3').attr('src')
        }
    },

    refreshSearch: function () {
        this.backtoSearch();
        this.showPostList();
    },

    newPost: function () {
        $('#postSearchPanel').hide();
        $('#post').hide();
        $('#postDetailsPanel').show();
        $('#id').attr('value', null);
        $('#libelle').attr('value', '').focus().select();
        $('#description1').attr('value', '');
        $('#description2').attr('value', '');
        $('#urlPhotoPr').attr('src', '');
        $('#urlPhotoDetail1').attr('src', '');
        $('#urlPhotoDetail2').attr('src', '');
        $('#urlPhotoDetail3').attr('src', '');

    },

    savePost: function () {
        if (!confirm('Save ?')) return false;
        var requestType = $('#id').val() != '' ? 'PUT' : 'POST';
        $.ajax({
            //url: "http://localhost:5557/articles/" + $('#id').val(), // La ressource ciblée, pour Android utiliser http://10.0.2.2:5557/articles/
            url: "http://10.0.2.2:5557/articles/" + $('#id').val(),
            type: requestType, // Le type de la requête HTTP,
            data: postManager.collectFieldsValues(), // On passe nos données à l'url
            dataType: 'json', //  Le type de données à recevoir, ici, du json
            success: function (result) {
                if (result.error) {
                    alert(result.error[0].message);
                } else {
                    if (requestType == 'POST')
                        alert('ID de la nouvelle entrée : ' + result.id);
                    postManager.refreshSearch();
                }
            }
        });
    },

    deletePost: function () {
        if (!confirm('Delete?')) return;
        $.ajax({
            //url: 'http://localhost:5557/articles/' + $('#id').val(),
            url: "http://10.0.2.2:5557/articles/" + $('#id').val(),
            dataType: 'json',
            type: 'DELETE',
            success: function (result) {
                if (result.errors)
                    alert(result.errors[0].message);
                else
                    postManager.refreshSearch();
            }
        });
    },

}

$(document).ready(function () {

    $('#postListPanel, #postDetailsPanel').hide();

    postManager.showPostList();

    $('#backtoSearchPost').click(function (e) {
        e.preventDefault();
        postManager.backtoSearch();
    });
    $('#editPost').click(function (e) {
        e.preventDefault();
        postManager.editPost();
    });

    $('#newPost').click(function (e) {
        e.preventDefault();
        postManager.newPost();
    });

    $('#savePost').click(function (e) {
        e.preventDefault();
        postManager.savePost();
    });

    $('#deletePost').click(function (e) {
        e.preventDefault();
        postManager.deletePost();
    });

})