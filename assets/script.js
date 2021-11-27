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
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquorType;

    // make a request to the url
    fetch(apiUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                displayCocktail(data, liquorType);
            });
        } else {
            return;
        }
    });
}

var displayCocktail = function(drinks, searchLiquor) {
    resultsContainerEl.textContent = "";
    searchTermEl.textContent = searchLiquor;

    var cocktailName = document.createElement("span");
    cocktailName.textContent = "Cocktail Name: ";
    cocktailName.classList = "recipe";

    var cocktailId = document.createElement("span");
    cocktailId.textContent = "Cocktail ID: ";
    cocktailId.classList = "recipe";

    resultsContainerEl.appendChild(cocktailName);
    resultsContainerEl.appendChild(cocktailId);
}

userFormEl.addEventListener("submit", formSubmit);

getCocktail();
