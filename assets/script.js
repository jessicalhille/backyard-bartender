var searchHistory = [];
var liquor = [];
var userFormEl = document.querySelector("#search-box");
var liquorTypeEl = document.querySelector("#liquor");
var resultsContainerEl = document.querySelector("#results-container");
var searchTermEl = document.querySelector("#search-term");

// get user input from search bar
var formSubmit = function(event) {
    event.preventDefault();

    var liquorType = liquorTypeEl.value.trim();

    if (liquorType) {
        getCocktail(liquorType);
        liquorTypeEl.value = "";
    } else {
        return;
    };

    // store the text input from user to local storage
    localStorage.setItem("liquor", JSON.stringify(liquorType));
}

// get api based on text input from user
var getCocktail = function(liquorType) {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquorType + "&appid=1";

    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            return;
        };
    })
    .then(function(data) {
        displayCocktail(data, liquorType);
    });
}

// data from the api is displayed on the right column of the page
var displayCocktail = function(drinks, searchLiquor) {
    // clear old data
    resultsContainerEl.textContent = "";

    searchTermEl.textContent = searchLiquor;

    for (var i = 0; i < drinks.drinks.length; i++) {
        // collect name and id number from the array
        var cocktailNameArr = drinks.drinks[i].strDrink;
        var cocktailIdArr = drinks.drinks[i].idDrink;

        var cocktailRecipe = document.createElement("h2");
        cocktailRecipe.textContent = cocktailNameArr;

        var cocktailId = document.createElement("button");
        cocktailId.textContent = cocktailIdArr;
        cocktailId.classList = "button is-success is-light is-fullwidth";

        resultsContainerEl.appendChild(cocktailRecipe);
        resultsContainerEl.appendChild(cocktailId);

        // event listener for id button to get full recipe information
        cocktailId.addEventListener("click", function() {
            var cocktailIdSource = $(this).text();
            getCocktailDetail(cocktailIdSource);
        });
    }; 
}

// calls new api based on which id name the user selects
var getCocktailDetail = function(cocktailIdSource) {
    var apiIdUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + cocktailIdSource + "&appid=1";

    fetch(apiIdUrl)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            return;
        };
    })
    .then(function(data) {
        displayCocktailDetail(data);
    });
}

// displays the full cocktail recipe that user has selected
var displayCocktailDetail = function(drinks) {

    // clear the cocktail list
    resultsContainerEl.textContent = "";

    for (var i = 0; i < drinks.drinks.length; i++) {
        // data that is needed from the array
        var cocktailImgUrl = drinks.drinks[0].strDrinkThumb;
        var cocktailImg = cocktailImgUrl + "/preview";
        var cocktailNameArr = drinks.drinks[0].strDrink;
        var cocktailGlass = drinks.drinks[0].strGlass;
        var cocktailIngredient1 = drinks.drinks[0].strMeasure1 + " " + drinks.drinks[0].strIngredient1;
        var cocktailIngredient2 = drinks.drinks[0].strMeasure2 + " " + drinks.drinks[0].strIngredient2;
        var cocktailIngredient3 = drinks.drinks[0].strMeasure3 + " " + drinks.drinks[0].strIngredient3;
        var cocktailIngredient4 = drinks.drinks[0].strMeasure4 + " " + drinks.drinks[0].strIngredient4;
        var cocktailIngredient5 = drinks.drinks[0].strMeasure5 + " " + drinks.drinks[0].strIngredient5;
        var cocktailIngredient6 = drinks.drinks[0].strMeasure6 + " " + drinks.drinks[0].strIngredient6;
        var cocktailIngredient7 = drinks.drinks[0].strMeasure7 + " " + drinks.drinks[0].strIngredient7;
        var cocktailInstructions = drinks.drinks[0].strInstructions;

        var returnBtn = document.createElement("button");
        returnBtn.textContent = ("Back to Search Results");
        returnBtn.classList = "button is-success is-light is-fullwidth";
        resultsContainerEl.appendChild(returnBtn);

        var cocktailTitle = document.createElement("h2");
        cocktailTitle.textContent = cocktailNameArr;
        resultsContainerEl.appendChild(cocktailTitle);

        var cocktailPhoto = document.createElement("img");
        cocktailPhoto.classList = "img is-100x100"
        cocktailPhoto.setAttribute("src", cocktailImg);
        resultsContainerEl.appendChild(cocktailPhoto);

        var glassTitle = document.createElement("h4");
        glassTitle.textContent = ("Type of Glass:")
        resultsContainerEl.appendChild(glassTitle);

        var glass = document.createElement("p");
        glass.textContent = cocktailGlass;
        resultsContainerEl.appendChild(glass);
        
        var ingredientsTitle = document.createElement("h4");
        ingredientsTitle.textContent = ("Ingredients:"); 
        resultsContainerEl.appendChild(ingredientsTitle);

        var ingredient1 = document.createElement("p");
        ingredient1.textContent = cocktailIngredient1;
        resultsContainerEl.appendChild(ingredient1);

        var ingredient2 = document.createElement("p");
        ingredient2.textContent = cocktailIngredient2;
        resultsContainerEl.appendChild(ingredient2);

        var ingredient3 = document.createElement("p");
        ingredient3.textContent = cocktailIngredient3;
        resultsContainerEl.appendChild(ingredient3);

        var ingredient4 = document.createElement("p");
        ingredient4.textContent = cocktailIngredient4;
        resultsContainerEl.appendChild(ingredient4);

        var ingredient5 = document.createElement("p");
        ingredient5.textContent = cocktailIngredient5;
        resultsContainerEl.appendChild(ingredient5);

        var ingredient6 = document.createElement("p");
        ingredient6.textContent = cocktailIngredient6;
        resultsContainerEl.appendChild(ingredient6);

        var ingredient7 = document.createElement("p");
        ingredient7.textContent = cocktailIngredient7;
        resultsContainerEl.appendChild(ingredient7);

        var instructions = document.createElement("h4");
        instructions.textContent = ("Instructions: ") + cocktailInstructions;
        resultsContainerEl.appendChild(instructions);

        var saveBtn = document.createElement("button");
        saveBtn.textContent = ("Save Recipe");
        saveBtn.classList = "button is-dark is-fullwidth";
        resultsContainerEl.appendChild(saveBtn);

        // allows the user to return back to the original search list
        returnBtn.addEventListener("click", function() {
            var liquorSearchArr = JSON.parse(localStorage.getItem("liquor"));
            getCocktail(liquorSearchArr);
        });
        
        // allows user to save the current cocktail to their localStorage
        saveBtn.addEventListener("click", function() {
            localStorage.setItem("searchHistory", JSON.stringify(resultsContainerEl.textContent));
        });
    };
}

mapboxgl.accessToken = 'pk.eyJ1IjoiYmV0aG11IiwiYSI6ImNrd3IzcG14ejBlMXgycG53OXJ5ZGFrdzIifQ.t8DE5oQ9pWsizZZSuEkrRg';
const map = new mapboxgl.Map({
  container: 'map', // Container ID
  style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
  center: [-97.3308, 32.7555], // Starting position [lng, lat]
  zoom: 12, // Starting zoom level
});

const marker = new mapboxgl.Marker() // initialize a new marker
  .setLngLat([-97.3308, 32.7555]) // Marker [lng, lat] coordinates
  .addTo(map); // Add the marker to the map

const geocoder = new MapboxGeocoder({
// Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: false // Do not use the default marker style
});

// Add the geocoder to the map
map.addControl(geocoder);

// Add geolocate control to the map.
map.addControl(
new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
// When active the map will receive updates to the device's location as it changes.
trackUserLocation: true,
// Draw an arrow next to the location dot to indicate which direction the device is heading.
showUserHeading: true
})
);

// After the map style has loaded on the page,
// add a source layer and default styling for a single point
map.on('load', () => {
  map.addSource('single-point', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  });

  map.addLayer({
    id: 'point',
    source: 'single-point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#448ee4'
    }
  });

  // Listen for the `result` event from the Geocoder
  // `result` event is triggered when a user makes a selection
  //  Add a marker at the result's coordinates
  geocoder.on('result', (event) => {
    map.getSource('single-point').setData(event.result.geometry);
  });
});

// event listener for generate recipe button
userFormEl.addEventListener("submit", formSubmit);

