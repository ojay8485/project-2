
"use strict";
$(function(){
	
	var pieces = $("#puzzlearea").children();
	
	pieces.addClass("puzzlepiece");
	
	pieces.css({cursor:"pointer"});
	
	var browseroffset=[pieces.eq(0).offset().left,pieces.eq(0).offset().top];
	
    var images =["background.jpg",
                 "http://time24.in/image/cache/catalog/products/hot4-400x400.jpg",
                 "https://pbs.twimg.com/profile_images/700229773432381440/-xtstJ2A_400x400.jpg",
                 "https://siliconvalley.tours/wp-content/uploads/2017/11/Tesla-red-400x400.jpg",
                 "https://private-jet-charter-flight.com/wp-content/uploads/Available-Services/S2.jpg"];
	var background = "url("+images[Math.floor(Math.random()*images.length)]+")";
	pieces.css({backgroundImage:background});
	
	var piecegrid = 4;
	
	initpieces(piecegrid);
	
	var initsettings = getblockpositions();
	
	var moved = false;

	image_chooser();
	
	shuffle();
	
	
	pieces.on('mouseover',function(){
		if(able($(this))){   
			$(this).addClass("movablepiece"); 
		}
		
	});
	
	pieces.on('click',function(){
		if($(this).hasClass("movablepiece")){   
			move($(this));  
			moved=true;  
			pieces.removeClass("movablepiece");   
			
		}
	});
	
	$('#overall').on('mouseover',function(){
		if(initsettings.toString() === getblockpositions().toString() && moved){  
				pieces.css({backgroundImage:"url(https://static.vinepair.com/wp-content/uploads/2015/03/science-of-sound-interior-1.jpg)"}); // display winner image
		}
	});
					
	$('#shufflebutton').on('click',function(){
		shuffle();  
		moved=false; 
		
	});
	
	
	
	//FUNCTIONS
	function shuffle(){
			initpieces(piecegrid);
			pieces.css({backgroundImage:background});
			var r,piece;
		
			for(var count = 0;count<500;count++){
				r = Math.floor(Math.random()*15);	
				piece = pieces.eq(r);
				if(able(piece)){

					piece.css({left:Math.floor((puzzledata(piece)[0])/100)*100});
					piece.css({top:Math.floor((puzzledata(piece)[1])/100)*100});
				}
				 
		    }	
	}
	
	function initpieces(size){
		var pieceCount = 0;  

		for(var y=0;y<size;y++){
			for(var x=0;x<size;x++){
				
				pieces.eq(pieceCount).css({backgroundPositionX:x*-100});
				pieces.eq(pieceCount).css({backgroundPositionY:y*-100});
				pieces.eq(pieceCount).css({top:y*100});
				pieces.eq(pieceCount).css({left:x*100});
				pieceCount++;
			}
		}
	}
	
	function getblockpositions(){
		var positions = [];  
		for(var p=0;p<pieces.length;p++){
			positions.push([(pieces.eq(p).offset().left)-browseroffset[0],
						    Math.floor((pieces.eq(p).offset().top)-browseroffset[1])
						   ]); 
		}
		return positions;
	}
	
	function able(piece){
		return puzzledata(piece).length > 0?true:false;  
	}
	
	function move(piece){
		
		piece.animate({left:Math.floor((puzzledata(piece)[0])/100)*100}, 100);
		piece.animate({top:Math.floor((puzzledata(piece)[1])/100)*100}, 100);
	}
	
	function puzzledata(piece){
		
		var piecepos = piece.offset();  
	
		
		var movpos = [[(piecepos.left)-browseroffset[0]-100,Math.floor((piecepos.top)-browseroffset[1])],
					  [(piecepos.left)-browseroffset[0]+100,Math.floor((piecepos.top)-browseroffset[1])],
					  [(piecepos.left)-browseroffset[0],Math.floor((piecepos.top)-browseroffset[1]-100)],
					  [(piecepos.left)-browseroffset[0],Math.floor((piecepos.top)-browseroffset[1]+100)]
					 ];
		
		
		
		var posible_movpos = movpos.filter(function(counter){
			if(counter[0]<400 && counter[1]<400 && counter[0]>=0 && counter[1]>=0){
				return counter;
			}
		});
		
		
		var unmovpos = getblockpositions();
		
		var flag = true;
		
		for(var check =0;check<posible_movpos.length;check++){
			flag=true;  
			for(var checked =0;checked<unmovpos.length;checked++){
				if(posible_movpos[check][0] === unmovpos[checked][0] &&
				   posible_movpos[check][1] === unmovpos[checked][1]){
					flag = false;
				} 
			}
			if(flag === true){
				return posible_movpos[check];
			  }
		}
		if(flag === false){
			return [];  
		}	
	}
	
	function image_chooser(resetit){
		var controls = document.querySelector("#controls");
		var heading = document.createElement("h5");
		heading.appendChild(document.createTextNode("Choose an image for the puzzle"));
		controls.appendChild(heading);
		images.forEach(function(image){
			var pick_image = document.createElement("img");
			pick_image.src = image;
			pick_image.height = 64;
			pick_image.width = 64;
			pick_image.border = 1;
			pick_image.onclick = function(){
				background = "url("+image+")";
		        pieces.css({backgroundImage:background});
			};
			controls.appendChild(pick_image);
			controls.appendChild(document.createTextNode(" "));
		});
		
		browseroffset=[pieces.eq(0).offset().left,pieces.eq(0).offset().top];
	}
	
	
	$(window).resize(function(){
		initpieces(piecegrid);
		browseroffset=[pieces.eq(0).offset().left,pieces.eq(0).offset().top];
		shuffle();
	});
	
});

