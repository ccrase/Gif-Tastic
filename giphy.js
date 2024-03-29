     $(document).ready(function () {
            var query;
            var userinput;
            var topics = ["the office", "family guy", "tom and jerry", "broad city", "bobs burgers", "friends", "hey arnold", "workaholics", "the simpsons", "parks and recreation"];
            makeButton();


            //this function makes a button for each value in the array
            function makeButton() {
                $(".nav-item").empty();
                for (var j = 0; j < topics.length; j++) {
                    var newBtn = $("<button>");
                    newBtn.attr("class", "btn btn-dark giphybutton");
                    newBtn.attr("data-tag", topics[j].replace(" ", "+"));
                    newBtn.text(topics[j]);
                    $(".nav-item").append(newBtn);


                };
            };

            //when user clicks search, create a new button and append to the DOM
            $("#submit").on("click", function (event) {
                event.preventDefault();
                userinput = $('#user-input').val();
                topics.push(userinput);

                //make the value text box empty
                $('#user-input').val("");
                makeButton(userinput);
            });

            //This loads the entire page before allowing a button click
            $("body").on("click", ".giphybutton", function () {
                query = $(this).attr("data-tag");

                var url = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
                $.ajax({
                    url: url,
                    method: "GET"
                }).then(function (response) {
                    var results = response.data;
                    console.log(results);

                    //for-loop to cycle through all the returned responses
                    for (var i = 0; i < results.length; i++) {
                        var imgURL = results[i].images.fixed_height_still.url;
                        var link = results[i].url;
                        var rating = results[i].rating.toUpperCase();
                        var movingAlt = results[i].images.fixed_height.url;
                        var stillAlt = results[i].images.fixed_height_still.url;
                        
                        // var gifImg = `<div class="card" style="width: 25rem">
                        //                 <img src= ${imgURL} class="card-img-top gif" move-alt = ${movingAlt} still-alt = ${stillAlt} format = "still" width="auto">
                        //                 <div class="card-body">
                        //                     <h5 class="card-title">Rated: ${rating}</h5>
                        //                     <a href=${link} class="btn btn-link">Link to Giphy!</a>
                        //                 </div>
                        //             </div>`;
                        var gifImg = `<figure class="figure">
                                        <img src=${imgURL} class="figure-img img-fluid rounded gif" move-alt = ${movingAlt} still-alt = ${stillAlt} format = "still" width="auto">
                                        <figcaption class="figure-caption">This GIF is rated <b> ${rating}</b><a href=${link} class="btn btn-outline-warning btn-sm">GIPHY link</a></figcaption>
                                    </figure>`;           
                    
                        //images details 
                        //var gifImg = $("<img>");
                        //gifImg.attr("src", imgURL);
                        //gifImg.attr("class", "gif");
                        //gifImg.attr("format", "still");
                        //gifImg.attr("move-alt", results[i].images.fixed_height.url);
                        //gifImg.attr("still-alt", results[i].images.fixed_height_still.url);

                        $("#gifs-div").prepend(gifImg);
                    };

                    //trying to over over images
                    // $(".gif").hover(function(){
                    //     if($(this).css('filter') === 'grayscale(1)'){
                    //         $(this).css({'filter': 'none'}, {'-webkit-filter': 'none'});
                    //       }else{
                    //          $(this).css({'filter': 'grayscale(1)'}, {'-webkit-filter': 'grayscale(1)'});

                    //          }
                    //  });

                    $(".gif").on("click", function(){
                        var state = $(this).attr("format");
                    if(state === "still"){
                        $(this).attr("src", $(this).attr("move-alt"));
                        $(this).attr("format", "animate");
                        $(this).css({'filter': 'none'}, {'-webkit-filter': 'none'});
                    }else{
                        $(this).attr("src", $(this).attr("still-alt"));
                        $(this).attr("format", "still");
                        $(this).css({'filter': 'grayscale(1)'}, {'-webkit-filter': 'grayscale(1)'});
                    };
                    
                 });

                });

            });

        });