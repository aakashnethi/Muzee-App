$(".footer").hide();

var arrayOfGenre = ["Rock", "Pop", "Classic", "Metal", "Jazz"];

var html = "";
$.each(arrayOfGenre, function( index, value ) {
	html += '<li class="list-group-item audioGenre">'+value+'</li>';
});

$("#playList").html(html)


$(".audioGenre").click(function(){
	var genre = $(this).html();
	$.getJSON( "https://itunes.apple.com/search?term="+genre, function( data ) {
		var playing = 0;
		var allSongs = shuffle(data.results);
		displaySong(data.results[playing]);
  		$(".footer").show();

  		$('#my_audio').on('ended', function() {
   			playing++;
   			displaySong(data.results[playing]);
		});
	});
});

function displaySong(song){
	$("#artist_song").html(song.trackName+"<br>"+song.artistName);
	
	var html = '<source src="'+song.previewUrl+'" type="audio/mp4">';
	$("#my_audio").html(html);
	$("#my_audio")[0].load();
	$("#my_audio")[0].play();

	
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}