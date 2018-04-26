$("#search-input").on("keyup", function(e){
    var keyword = $("#search-input").val();
    loadAndDisplayMovies(keyword);
});

$("#search-form").on("submit", function(e){
    e.preventDefault();
    var keyword = $("#search-input").val();
    loadAndDisplayMovies(keyword);
});

$("body").on("click", ".movieElement", function(){
   var id = $(this).attr("data-movieid");
   loadAndDisplayMovieDetails(id);
});


function loadAndDisplayMovies(keyword){
    $("#content").html('');
    $.ajax(
        {
            type: "GET",
            url : "http://localhost/movies-sf/public/index.php/api/v1/movies/",
            data : {
                q: keyword
            },
            headers : {
                accept : "application/json"
            },
            success : function( mydata ) {
                if(mydata.status = "ok"){
                    if(mydata.data.length > 0){
                        $.each(mydata.data, function(i, movie){
                            console.log(movie.title);
                            var container = $("<div>").addClass("poster");
                            container.append(movie.title);
                            var pic = $("<img>").attr("src", "http://localhost/movies-sf/public/posters/"+movie.image);
                            pic.attr("data-movieid", movie.id);
                            pic.addClass('movieElement');
                            container.append(pic);
                            $("#content").append(container);

                        });
                    }
                }
                else{
                    console.log("vomir");
                }

            }
        }
    ).done(function(data){

    });
}

function loadAndDisplayMovieDetails(id){
    $("#content").html('');
    $.ajax(
        {
            type: "GET",
            url : "http://localhost/movies-sf/public/index.php/api/v1/movies/"+id,
            data : {

            },
            headers : {
                accept : "application/json"
            },
            success : function( mydata ) {
                if(mydata.status = "ok"){
                    if(mydata.data.length > 0){
                        $.each(mydata.data, function(i, movie){
                            console.log(movie.title);
                            var container = $("<div>").addClass("poster");
                            container.append(movie.title);
                            var pic = $("<img>").attr("src", "http://localhost/movies-sf/public/posters/"+movie.image);
                            container.append(pic);

                            var description = $("<div>").addClass("description");
                            description.append(movie.plot);
                            container.append(description);

                            $("#content").append(container);
                        });
                    }
                }
                else{
                    console.log("vomir");
                }

            }
        }
    ).done(function(data){

    });
}