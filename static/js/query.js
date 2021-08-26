//1. create user input field that can be read 
//2. read API
//3. connect API call to user input
//4. print data onto HTML page

//d3 select the elements
//get reference to the button on the page with id set to 'button'
var button = d3.select("#button");

//get referecne to the input element on the page  with id set to 'cocktailInput'
var input = d3.select("#cryptoInput");

//attach an event 
button.on("click", runEnter);
input.on("click", runEnter);

//this function is triggered when the button is clicked
function runEnter() {
    d3.event.preventDefault();
    var inputValue = input.property("value");

var base_url = "https://api.coingecko.com/api/v3/coins/"

var end_url = "?tickers=true&market_data=true"

var url = base_url + inputValue + end_url


//make a fetch requests
fetch(url)

    .then(response=>{
        return response.json();
    }).then(json=> {

        cryptoArray = Object.values(json);

        coin = cryptoArray[11]

        // console.log(coin[11])

        coinDescriptions = Object.values(coin)

        coinDescription = coinDescriptions[0]

        console.log(coinDescription)

    var coinDesc = d3.select("#cryptoDesc").text(coinDescription)

    



    });
};


