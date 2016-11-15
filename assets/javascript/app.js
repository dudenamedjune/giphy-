	
$(document).ready(function() {
	


	//array of animal names
	var animals = ['Squid', 'Spider', 'Ants', 'Sea Lion', 'Spiders','Baboons', 'Orangutans', 'Pigeons', 'Raccoons', 'Sheep', 'Horses', 'Falcons', 'Owls', 'Cats', 'Squirrels', 'Elephants', 'Octopus', 'Dogs', 'Whales', 'Dolphins', 'Chimpanzees'];
 
 	//funciton to display still animal gifs
	function displayAnimalGif(){
		//clears out div with id animalgifs
		$("#animalgifs").empty();
		
		//creates variable of animal name when clicked refers to the buton clicked 
		var animal = $(this).attr('data-name');
		//url of api to call
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC"   
		
		//ajax xall to server of api
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

			console.log(response);

			//loop that creates 10 images of the array button clicked  
			for (var i = 0; i< 11; i++){
				//init img html tag in javascript wonderland
				var img = $("<img>");
				//add class and attribute data-animate to access link of animated gif 
				img.addClass('gif').attr('data-animate', response.data[i].images.fixed_height.url)
				//add attribute data-still to access with .data when animated is clicked to retrun to still
				.attr('data-still', response.data[i].images.fixed_height_still.url )
				//set init state of image to still since it is still to begin with also to test state when cliked
				.attr('data-state', 'still')
				//set src of image to still gif
				.attr('src', response.data[i].images.fixed_height_still.url )
				;
				//append all of the javascript wonderland creation to html 
				$("#animalgifs").append("<p>Rating: "+ response.data[i].rating + "</p>").append(img);
				
		};
				
		});

	};

	// funciton for displaying animated gifs 
	function displayAnimatedGif(){
		//create variable named state that gets current state of gif 		
		var state = $(this).attr('data-state');
		//if the state variable  === the string still preform conditional 
 		  if (state == 'still'){
 		  	//gets the gif that was clikced attribute data-animate which is the link for the animated giff
            $(this).attr('src', $(this).data('animate'));
            //then changes attribute data-state  to animate
            $(this).attr('data-state', 'animate');
        }else{
        	//this does the exact opposite of the above 
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        };
            
		

	};

	//renders buttons from array animals 

	function renderButtons(){ 

		//emptys div with id buttonsView
		$('#buttonsView').empty();

		//created for loop to itterate through the array to make correct number of buttons
		for (var i = 0; i < animals.length; i++){

			//init variable a which is created in jquery/javascript
		    var a = $('<button>')
		    //add class animal to button  
		    a.addClass('animal'); 
		    //add attribute data-name="animals[i]"
		    a.attr('data-name', animals[i]); 
		   //add the text of the animal in the array 
		    a.text(animals[i]); 
		   	//append all of that into the div with the id buttonsView
		    $('#buttonsView').append(a); 
		};
	};

	//targets addAnimal in the DOM which is the submit button to add an animal to the array 
	$('#addAnimal').on('click', function(){

		//create a variable named animal which was the text from the input field 
		var animal = $('#animal-input').val().trim();

		//push that value that was stored in animal to the array animals 
		animals.push(animal);
		
		//run function render Buttons
		renderButtons();
		//return false to force form element not to reload 
		return false;
	})

	

	//if any tag or element in the DOM with the classs animal is cliked run the function displayAnimalGif
	$(document).on('click', '.animal', displayAnimalGif);
	//if any if any tag or element in the DOM with the classs gif is cliked run the function displayAnimatedGif
	$(document).on('click', '.gif', displayAnimatedGif);
	

	//render the buttons for the very first time
	renderButtons();

	});