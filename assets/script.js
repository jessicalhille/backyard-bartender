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
    saveSearch();
}

var saveSearch = function() {
    localStorage.setItem("liquor", JSON.stringify(liquor));
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

        var apiIdUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + cocktailIdArr + "&appid=1";

        var cocktailId = document.createElement("button");
        cocktailId.classList = "recipe";
        cocktailId.addEventListener("click", function() {
            cocktailDetail();
        });

        var cocktailRecipe = document.createElement("ul");
        cocktailRecipe.textContent = cocktailNameArr;
        cocktailRecipe.classList = "list-item flex-row justify-space-between";

        cocktailId.appendChild(cocktailRecipe);

        resultsContainerEl.appendChild(cocktailId);
    };

    var cocktailDetail = function() {
        fetch(apiIdUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayCocktailDetail(data);
                });
            } else {
                return;
            };
        });
    }
}

var displayCocktailDetail = function(drinks) {
    resultsContainerEl.textContent = "";

    for (var i = 0; i < drinks.drinks.length; i++) {
        var cocktailNameArr = drinks.drinks[0].strDrink;
        var cocktailIdArr = drinks.drinks[0].idDrink;
        var cocktailGlass = drinks.drinks[0].strGlass;
        var cocktailIngredient1 = drinks.drinks[0].strMeasure1 + drinks.drinks[0].strIngredient1;
        var cocktailIngredient2 = drinks.drinks[0].strMeasure2 + drinks.drinks[0].strIngredient2;
        var cocktailIngredient3 = drinks.drinks[0].strMeasure3 + drinks.drinks[0].strIngredient3;
        var cocktailIngredient4 = drinks.drinks[0].strMeasure4 + drinks.drinks[0].strIngredient4;
        var cocktailIngredient5 = drinks.drinks[0].strMeasure5 + drinks.drinks[0].strIngredient5;
        var cocktailIngredient6 = drinks.drinks[0].strMeasure6 + drinks.drinks[0].strIngredient6;
        var cocktailIngredient7 = drinks.drinks[0].strMeasure7 + drinks.drinks[0].strIngredient7;
        var cocktailInstructions = drinks.drinks[0].strInstructions;


        var cocktailRecipeDetail = document.createElement("ol");
        cocktailRecipeDetail.textContent = cocktailNameArr + cocktailGlass + cocktailIngredient1 + cocktailIngredient2 + 
        cocktailIngredient3 + cocktailIngredient4 + cocktailIngredient5 + cocktailIngredient6 + cocktailIngredient7 + cocktailInstructions;
        cocktailRecipeDetail.classList = "list-item flex-row justify-space-between";

        resultsContainerEl.appendChild(cocktailRecipeDetail);
    };
}



userFormEl.addEventListener("submit", formSubmit);
