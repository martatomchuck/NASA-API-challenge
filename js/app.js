$(() => {

    const $apiKey = 'v910GyMopdxZZ7gW8NagCbFcEfiZ556bZYzYIKav';
    const $bannerphoto = 'https://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631080503668E01_DXXX.jpg'

    // BANNER
    const $welcome = $(".welcome .background")
    $welcome.css({
        backgroundImage: `url("${$bannerphoto}")`
    })

    $.ajax({
        // MARS GALLERY
        url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos',
        dataType: 'json',
        data: {
            api_key: $apiKey,
            sol: 100
        }
    }).done(res => {
        console.log(res.photos);

        const $li = $(".mars-gallery li");
        console.log($li)

        for (let i = 0; i < 6; i++) {
            $li.eq(i).css({
                backgroundImage: `url("${res.photos[i].img_src}")`
            })
        }

        const $loadmore = $("#load-more");
        $loadmore.on("click", function(event) {
            event.preventDefault();
            
            const $min = 0;
            const $max = 400;

            for (let i = 0; i < 6; i++) {
                const $newLi = $("<li></li>");
                const $ul = $(".mars-gallery ul");
                $ul.append($newLi);

                const $randomIndex = Math.floor(Math.random()*($max-$min+1)+$min);
                const $randomImage = res.photos[$randomIndex].img_src;
                
                $newLi.css({
                    backgroundImage: `url("${$randomImage}")`
                })
            }
        })
    })



    $.ajax({
        // NASA picture of the day
        url: 'https://api.nasa.gov/planetary/apod',
        dataType: 'json',
        data: {
            api_key: $apiKey,
            hd: true
        }
    }).done(res => {
        console.log(res);

        // Image
        const $imageUrl = res.hdurl;
        const $image = $(".image");
        $image.attr("src", $imageUrl);

        // Image title
        const $title = $("#image-title");
        $title.text(res.title);

        // Image explanation
        const $explanation = $("#image-explanation");
        $explanation.text(res.explanation);
    })
})
