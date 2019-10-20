---
layout: single
title:  "What does this image sound like?"
date:   2019-07-28 00:00:00 +0800
categories: data-viz
permalink: /data-viz/img-sounds-like
---

<style>
	#image-file{
		visibility: hidden;
	}

	#play-music{
		visibility: hidden;
	}
</style>
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700&display=swap" rel="stylesheet">

<main>
	<input type='file' onchange="readFile(this)" />
	<img id="image-file" src="#" alt="your image" />
	<button id="play-music" onClick="callMe()"> What does this image sound like? </button>
</main>
<script src="../assets/js/img-sounds-like.js"></script>
<script type="module" src="../assets/js/crunker.js"></script>
<script>
	const audio = new Crunker();
	
	function readFile(input){
		if (input.files && input.files[0]) {
            var reader = new FileReader();

            var channels = {}
            reader.onload = function (e) {
                $('#image-file')
                    .attr('src', e.target.result)

                document.getElementById('image-file').style.visibility =  'visible'
        		document.getElementById('play-music').style.visibility =  'visible'

            }           
	        reader.readAsDataURL(input.files[0]);  
        }
	}

	function readImg(){
	    var canvas = document.createElement('canvas');
        var ctx    = canvas.getContext('2d');

        var myImgElement = document.getElementById('image-file');
        ctx.drawImage( myImgElement, 0, 0 );

        var w = myImgElement.width, h=myImgElement.height;
		var imgdata = ctx.getImageData(0,0,10, 10);
		ctx.putImageData(imgdata,0,0)


		return getChannels(imgdata.data)
	}


	function getChannels(input){
		var parsed = {'red': [], 'blue': [], 'green':[], 'alpha':[]}
		input.map(function(x , index){
			if(index % 4 == 0){
				parsed['red'].push(x)
			}else if(index % 4 == 1){
				parsed['blue'].push(x)
			}else if(index % 4 == 2){
				parsed['green'].push(x)
			}else{
				parsed['alpha'].push(x)
			}
		})
	
		return parsed
	}

	var snd1  = new Audio();
	var src1  = document.createElement("source");
	src1.type = "audio/wav";
	src1.src  = "../assets/data/drums/kick.wav";
	snd1.appendChild(src1);

	var snd2  = new Audio();
	var src2  = document.createElement("source");
	src2.type = "audio/wav";
	src2.src  = "../assets/data/drums/snare.wav";
	snd2.appendChild(src2);

	var snd3  = new Audio();
	var src3  = document.createElement("source");
	src3.type = "audio/wav";
	src3.src  = "../assets/data/drums/tink.wav";
	snd3.appendChild(src3);

	var snd4  = new Audio();
	var src4  = document.createElement("source");
	src4.type = "audio/wav";
	src4.src  = "../assets/data/drums/boom.wav";
	snd4.appendChild(src4);

	function playMusic(idx){

		if(img_array['red'][idx] %3 == 0){
			snd1.play(); 
		} 
		if(img_array['green'][idx] %4 == 0){
			snd2.play(); 
		} 
		if(img_array['blue'][idx] %5 == 0){
			snd3.play(); 
		} 
	}

	play = {'snare-1':[], 'snare-2':[], 'key-1':[], 'key-2':[], 'key-3':[], 'hat':[], 'tom':[]}
	function maskMusic(){
	    for (let i = 0; i < 100; i++) {
			img_array['red'][i] %3 == 0 ? play['snare-1'].push(1) : play['snare-1'].push(0)
			img_array['green'][i] %4 == 0 ? play['snare-2'].push(1) : play['snare-2'].push(0)
			img_array['blue'][i] %5 == 0 ? play['key-1'].push(1) : play['key-1'].push(0)
			img_array['red'][i] %4 == 0 ? play['key-2'].push(1) : play['key-2'].push(0)
			img_array['green'][i] %5 == 0 ? play['key-3'].push(1) : play['key-3'].push(0)
			img_array['blue'][i] %6 == 0 ? play['hat'].push(1) : play['hat'].push(0)
			img_array['blue'][i] %3 == 0 ? play['tom'].push(1) : play['tom'].push(0)
	    }
	}
	//img_array = readImg()
	/*function allMusic(){

		(async function loop() {
		    for (let i = 0; i < 100; i++) {
		        await new Promise(resolve => setTimeout(resolve, 50));
		        playMusic(i);
		    }
		})();		 
		}*/

	function makeMusic(instrument, file){

		files = instrument.map(i=> i==1 ? file : '../assets/data/drums/blank.wav')
		console.log(files)
	}
	function callMe(){
		img_array = readImg()
		maskMusic()
		console.log(play)
		makeMusic(play['snare-1'], '../assets/data/drums/snare-1.wav')
		//console.log(img_array)
		//allMusic()
	}

	const sleep = (milliseconds) => {
	  return new Promise(resolve => setTimeout(resolve, milliseconds))
	}

</script>

