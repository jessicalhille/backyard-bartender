var searchHistory = [];
var liquor = [];
var userFormEl = document.querySelector("#search-box");
var liquorTypeEl = document.querySelector("#liquor");
var resultsContainerEl = document.querySelector("#results-container");
var searchTermEl = document.querySelector("#search-term");

var formSubmit = function(event) {
    event.preventDefault();

    var liquorType = liquorTypeEl.value.trim();

    if (liquorType) {
        getCocktail(liquorType);
        liquorTypeEl.value = "";
    } else {
        return;
    };

    localStorage.setItem("liquor", JSON.stringify(liquorType));
}

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

var displayCocktail = function(drinks, searchLiquor) {
    resultsContainerEl.textContent = "";
    searchTermEl.textContent = searchLiquor;

    for (var i = 0; i < drinks.drinks.length; i++) {
        var cocktailNameArr = drinks.drinks[i].strDrink;
        var cocktailIdArr = drinks.drinks[i].idDrink;

        var cocktailRecipe = document.createElement("h2");
        cocktailRecipe.textContent = cocktailNameArr;

        var cocktailId = document.createElement("button");
        cocktailId.textContent = cocktailIdArr;
        cocktailId.classList = "button is-primary is-light is-fullwidth";

        resultsContainerEl.appendChild(cocktailRecipe);
        resultsContainerEl.appendChild(cocktailId);

        cocktailId.addEventListener("click", function() {
            var cocktailIdSource = $(this).text();
            getCocktailDetail(cocktailIdSource);
        });
    }; 
}

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

var displayCocktailDetail = function(drinks) {
    resultsContainerEl.textContent = "";

    for (var i = 0; i < drinks.drinks.length; i++) {
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
        returnBtn.classList = "button is-primary is-light is-fullwidth";
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
        saveBtn.classList = "button is-primary is-fullwidth";
        resultsContainerEl.appendChild(saveBtn);

        returnBtn.addEventListener("click", function() {
            var liquorSearchArr = JSON.parse(localStorage.getItem("liquor"));
            getCocktail(liquorSearchArr);
        });
        
        saveBtn.addEventListener("click", function() {
            localStorage.setItem("searchHistory", JSON.stringify(resultsContainerEl.textContent));
        });
    };
}

function initMap () {

    var options = {
        center: {lat:32.7767, lng: -96.7970},
        zoom: 8
    }

    map = new google.maps.Map(document.getElementById("map"), options)
}

userFormEl.addEventListener("submit", formSubmit);

