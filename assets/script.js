var userFormEl = document.querySelector("#search-box");
var liquorTypeEl = document.querySelector("#liquor");
var resultsContainerEl = document.querySelector("#results-container");
var searchTermEl = document.querySelector("#search-term");

var getCocktail = function(input) {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + input;

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
}

var formSubmit = function(event) {
    event.preventDefault();

    var liquorType = liquorTypeEl.value.trim();

    if (liquorType) {
        getCocktail(liquorType);
        liquorTypeEl.value = "";
    } else {
        return;
    };
}

userFormEl.addEventListener("submit", formSubmit);

getCocktail();
