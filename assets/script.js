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
        var cocktailUrl = drinks.drinks[i].strDrinkThumb;
        var cocktailNameArr = drinks.drinks[i].strDrink;
        var cocktailIdArr = drinks.drinks[i].idDrink;

        var apiIdUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + cocktailIdArr + "&appid=1";

        var cocktailImg = cocktailUrl + "/preview";

        var cocktailId = document.createElement("button");
        cocktailId.classList = "recipe";
        cocktailId.addEventListener("click", function(event) {
            apiIdUrl;
        });

        var cocktailRecipe = document.createElement("ul");
        cocktailRecipe.textContent = cocktailNameArr;
        cocktailRecipe.classList = "list-item flex-row justify-space-between";

        cocktailId.appendChild(cocktailRecipe);

        resultsContainerEl.appendChild(cocktailId);
    };
}



userFormEl.addEventListener("submit", formSubmit);
