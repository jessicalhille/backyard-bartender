var userFormEl = document.querySelector("#search-box");

var getUserRepos = function() {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
}

var getKrogerRepos = function() {
    fetch("https://api.kroger.com/v1/").then(function(response) {
        console.log("inside", response);
    });
    
    console.log("outside");
}

// var formSubmit = function(event) {
//     event.preventDefault();
//     console.log(event);
// }

// userFormEl.addEventListener("submit", formSubmit);

getUserRepos();
getKrogerRepos();
