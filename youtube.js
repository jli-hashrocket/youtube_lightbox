$(function(){

	var LightBoxView = function() {
		this.init();
	}

	LightBoxView.prototype = jQuery.extend(LightBoxView.prototype, {
		init: function() {
			this.$mainHeader = $('#main-header');
		    var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			var player;
			$('#youtube-vid-play').on('click', jQuery.proxy(this.youtubeButtonClickHandler, this))	
			this.$body = $('body');
		},
		youtubeButtonClickHandler: function(event) {
			this.open();
			this.onYouTubeIframeAPIReady();
		},
		
		onYouTubeIframeAPIReady:  function(){
			var pauseCycle = function(){
				$('.cycle-slideshow', this.$mainHeader).cycle('pause');
				window.addEventListener('resize', function(event){
		        	$('.cycle-slideshow', this.$mainHeader).cycle('pause');
		        });
			};
			var closeVid = function(){
				$('#lightbox-bg, #lightbox').remove();
				$('body').css('overflow', 'visible');
				$('.cycle-slideshow', this.$mainHeader).cycle('resume');
				$('.cycle-slideshow', this.$mainHeader).cycle('next');
			};
			player = new YT.Player('player-container', {
				height: '500',
				width: '640',
				videoId: 'kTIiOGltqIw',
				playerVars: { 'autoplay': 1, 'controls': 1, 'showinfo': 0 },
				events: {
					'onReady': function(event){
						pauseCycle();
					},
					'onStateChange': function(event){
						if(event.data != YT.PlayerState.ENDED){
							pauseCycle();
						}else{
							closeVid();
						}
					}
				}
			});

			$('#lightbox-bg, #lightbox').on('click',function(event){
				player.stopVideo();
				closeVid();
			});
		},
		open: function () {
			var template = this.getTemplate();
			var lightbox_bg = $('<div id="lightbox-bg" style="display:block"/>');
			this.$body.append(template);
			this.$body.append(lightbox_bg);
			this.$body.css('overflow', 'hidden');
		},

	 	getTemplate: function () {
			var lightboxContent = "<div id='lightbox' style='display:block'><div class='vid-container' style='display:block'><div id='player-container'></div></div></div>";
	 		return lightboxContent;
	 	}
	});

	lightBoxView = new LightBoxView();

});