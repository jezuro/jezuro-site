$(window).ready(() => {

    // for menu

    $(".nav-icon").click(function() {
        if ($(".menu-button").hasClass("toggler-open")) {
            $(".menu-button").removeClass("toggler-open") 
        } 
        else {
            $(".menu-button").addClass("toggler-open") 
        } 
    })

    $(".menu a").click(function() {
        $(".menu-button").removeClass("toggler-open");
    })
    $(".menu li a[href*='#']:not([href='#'])").click(function() {
        var target = $(this.hash);
        hashValue = this.hash.substr(1);
        $('.menu li a').removeClass("active");
        $(this).addClass("active");
        var navActiveCurrent = '/#' + hashValue;
        $('.menu li a[href="' + navActiveCurrent + '"]').addClass("active");
        $(this).addClass("active");
        if ($(window).width() > 767) {
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 42
                }, 1000);
            }
        } else {
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 60
                }, 1000);
            }
        }
    });



    // for owl carousel
    $(".music-carousel .owl-carousel").owlCarousel({
        //loop: true,
        margin: 10,
        slideSpeed: 300,
        smartSpeed: 1000,
        paginationSpeed: 500,
        autoHeight: true,
        responsiveClass: true,
        nav: true,
        dots: false,

        responsive: {
            0: {
                items: 1.5,
                center: true
            },
            640: {
                items: 1.5,
                center: true
            },
            1024: {
                items: 3.5,
                margin: 25                
            }
        }
    });

    $(".video-carousel .owl-carousel").owlCarousel({
        loop: true,
        slideSpeed: 300,
        smartSpeed: 1000,
        paginationSpeed: 500,
        responsiveClass: true,

        responsive: {
            0: {
                margin: 10,
                items: 1,
                nav: true,
                dots: false,
            },
            768: {
                margin: 39,
                items: 1,
                nav: true,
                dots: false,
            }
        }
    });
});

var ytPlayers = [];
var player;

function playVideo(event) {
    event.target.playVideo();
}

function playVideo(event) {
    if (Object.keys(ytPlayers).length > 0) {
        for (var k = 0; k < Object.keys(ytPlayers).length; k++) {
            ytPlayers[Object.keys(ytPlayers)[k]].pauseVideo()
        }
    }
    event.target.playVideo();
}

jQuery(document).ready(function () {


    /*video script start*/
    var count = 0;
    jQuery(".video-carousel li").each(function () {
        jQuery(this).find('.videowrap').click(function (event) {
            event.preventDefault();
            jQuery(this).parents(".item").find(".overlay-img").hide();
            var youtubeID = jQuery(this).parents(".item").find('.videoPlayer').attr('data-video-id');
            count++;

            jQuery(this).parents(".item").find('.videoPlayer').attr('id', 'ytplayer1' + count);
            var playerID = jQuery(this).parents(".item").find('.videoPlayer').attr('id');
            if (youtubeID.length > 11) {
                formYoutubePlaylist(playerID, youtubeID);
            } else {
                formYoutubePlayer(playerID, youtubeID);
            }
            console.log("step4");
        });
    });

});

function formYoutubePlayer(playerID, youtubeID) {
    player = new YT.Player(playerID, {
        height: '390',
        width: '340',
        videoId: youtubeID,
        host: 'https://www.youtube-nocookie.com',
        events: {
            'onReady': playVideo,
            'onStateChange': onPlayerStateChange
        }
    });
    ytPlayers[playerID] = player;
}

function formYoutubePlaylist(playerID, youtubeID) {
    player = new YT.Player(playerID, {
        height: '390',
        width: '340',
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
            listType: 'playlist',
            list: youtubeID,
        },
        events: {
            'onReady': playVideo,
            'onStateChange': onPlayerStateChange
        }
    });
    ytPlayers[playerID] = player;
}
