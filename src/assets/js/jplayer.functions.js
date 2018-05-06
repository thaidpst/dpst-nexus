
jQuery(document).ready(function() {

    var myPlayer = new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_17",
		cssSelectorAncestor: "#jp_container_17"
	}, [
        //php writePlaylist('Y',' (!!duration!!)'); 
        //php writePlaylist('Y',"<span style='color:#828282'> (!!duration!!)</span>");
        {
            title: "Lorem ipsum dolor sit amet <span>05:02</span> <small>Sarena Martyn</small>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            poster: "extra-images/player-thumb2.png",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
        }, {
            title: "Aliquam ac Egestas Velit Curabitur <span>11:07</span> <small>Sarena Martyn</small>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            poster: "extra-images/player-thumb2.png",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
        }, {
            title: "Nisl Eu Nisl Malesuada Suscipit <span>11:07</span> <small>Sarena Martyn</small>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            poster: "extra-images/player-thumb2.png",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
        }, {
            title: "Like What You MAde Me Do <span>11:07</span> <small>Sarena Martyn</small>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            poster: "extra-images/player-thumb2.png",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
        }
    ],
     {
       
        playlistOptions: { loopOnPrevious: true, },
        loop: true,
        swfPath: "images/jplayer.swf",
        supplied: "mp3, oga",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        preload: 'auto',
		preload: 'metadata',
        smoothPlayBar: true,
        audioFullScreen: true,
        keyEnabled: true,
        size: { width: "180px", height: "100%" },

    });

	var $jp = $('#jquery_jplayer_17');
	   $jp.on($.jPlayer.event.play,  function(e){
	       $('#current-track1').empty();
		   $('#current-track1').append(myPlayer.playlist[myPlayer.current].title);
	   });

});

jQuery(document).ready(function($) {
    var myPlayer = new jPlayerPlaylist({
        jPlayer: "#jquery_jplayer_1",
        cssSelectorAncestor: "#jp_container_1"
    }, [
        //php writePlaylist('Y',' (!!duration!!)'); 
        //php writePlaylist('Y',"<span style='color:#828282'> (!!duration!!)</span>");
        {
            title: "Dj kozak-promo mix soundwave <span>05:30</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        }, {
            title: "Shot me Down (feat. Skylar Grey) <span>04:00</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        }, {
            title: "I'll Keep Loving you (feat. Birdy) <span>03:00</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        }, {
            title: "The Hum (Short Edit) <span>04:30</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        },
    ],
     {
       
        playlistOptions: { loopOnPrevious: true, },
        loop: true,
        swfPath: "images/jplayer.swf",
        supplied: "mp3, oga",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        preload: 'auto',
        preload: 'metadata',
        smoothPlayBar: true,
        audioFullScreen: true,
        keyEnabled: true,
    });

    var myPlayer = new jPlayerPlaylist({
        jPlayer: "#jquery_jplayer_2",
        cssSelectorAncestor: "#jp_container_2"
    }, [
        //php writePlaylist('Y',' (!!duration!!)'); 
        //php writePlaylist('Y',"<span style='color:#828282'> (!!duration!!)</span>");
        {
            title: "Dj kozak-promo mix soundwave <span>05:30</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        }, {
            title: "Shot me Down (feat. Skylar Grey) <span>04:00</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        }, {
            title: "I'll Keep Loving you (feat. Birdy) <span>03:00</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        }, {
            title: "The Hum (Short Edit) <span>04:30</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        },
    ],
     {
       
        playlistOptions: { loopOnPrevious: true, },
        loop: true,
        swfPath: "images/jplayer.swf",
        supplied: "mp3, oga",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        preload: 'auto',
        preload: 'metadata',
        smoothPlayBar: true,
        audioFullScreen: true,
        keyEnabled: true,
    });

    var myPlayer = new jPlayerPlaylist({
        jPlayer: "#jquery_jplayer_3",
        cssSelectorAncestor: "#jp_container_3"
    }, [
        //php writePlaylist('Y',' (!!duration!!)'); 
        //php writePlaylist('Y',"<span style='color:#828282'> (!!duration!!)</span>");
        {
            title: "Dj kozak-promo mix soundwave <span>05:30</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        }, {
            title: "Shot me Down (feat. Skylar Grey) <span>04:00</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        }, {
            title: "I'll Keep Loving you (feat. Birdy) <span>03:00</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        }, {
            title: "The Hum (Short Edit) <span>04:30</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        },
    ],
     {
       
        playlistOptions: { loopOnPrevious: true, },
        loop: true,
        swfPath: "images/jplayer.swf",
        supplied: "mp3, oga",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        preload: 'auto',
        preload: 'metadata',
        smoothPlayBar: true,
        audioFullScreen: true,
        keyEnabled: true,
    });

    var myPlayer = new jPlayerPlaylist({
        jPlayer: "#jquery_jplayer_4",
        cssSelectorAncestor: "#jp_container_4"
    }, [
        //php writePlaylist('Y',' (!!duration!!)'); 
        //php writePlaylist('Y',"<span style='color:#828282'> (!!duration!!)</span>");
        {
            title: "Dj kozak-promo mix soundwave <span>05:30</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        }, {
            title: "Shot me Down (feat. Skylar Grey) <span>04:00</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        }, {
            title: "I'll Keep Loving you (feat. Birdy) <span>03:00</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        }, {
            title: "The Hum (Short Edit) <span>04:30</span>",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
            album_buy_mp3: "sdas",
            url: "sdas",
            layrics: "sdas",
        },
    ],
     {
       
        playlistOptions: { loopOnPrevious: true, },
        loop: true,
        swfPath: "images/jplayer.swf",
        supplied: "mp3, oga",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        preload: 'auto',
        preload: 'metadata',
        smoothPlayBar: true,
        audioFullScreen: true,
        keyEnabled: true,
    });

});


