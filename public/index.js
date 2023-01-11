var generalBtn = document.getElementById("general");
var businessBtn = document.getElementById("business");
var technologyBtn = document.getElementById("technology");
var sportsBtn = document.getElementById("sports");
var entertainmentBtn = document.getElementById("entertainment");
var searchBtn = document.getElementById("searchBtn");
var newsQuery = document.getElementById("newsQuery");

var newsType = document.getElementById("newsType");
var newsDetails = document.getElementById("newsDetails");

//array
var newsDataArr = [];


const apiKey = "9d2141594366464fa61b04193886463c";
const headLines = "https://newsapi.org/v2/top-headlines?country=ng&apiKey=";
const generalNews = "https://newsapi.org/v2/top-headlines?country=ng&category=general&apiKey="
const business = "https://newsapi.org/v2/top-headlines?country=ng&category=business&apiKey="
const technology = "https://newsapi.org/v2/top-headlines?country=ng&category=technology&apiKey="
const entertainment = "https://newsapi.org/v2/top-headlines?country=ng&category=entertainment&apiKey="
const sports = "https://newsapi.org/v2/top-headlines?country=ng&category=sports&apiKey="
const searchNews = "https://newsapi.org/v2/everything?q=&apiKey="


window.onload = function()  {

    newsType.innerHTML = "<h4>Headlines</h4>";

    fetchHeadlines();
};

//eventListeners
generalBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>General</h4>";
    fetchGeneralNews()
});

businessBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Business</h4>";
    fetchBusinessNews()
});

technologyBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Technology</h4>";
    fetchTechnologyNews()
});

sportsBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Sports News</h4>";
    fetchSportsNews()
});

entertainmentBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Entertainment News</h4>";
    fetchEntertainmentNews()
});

searchBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>search : "+newsQuery.value+"</h4>";
    fetchQueryNews()
});


//api functions to fetch data
const fetchGeneralNews = async () => {
    const response = await fetch(generalNews+apiKey);
    newsDataArr = [];

    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //throw err

        console.log(response.status, response.statusText)
    }

    displayNews();
}

const fetchHeadlines = async () => {
    const response = await fetch(headLines+apiKey);
    newsDataArr = [];

    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //throw err

        console.log(response.status, response.statusText)
    }

    displayNews();
}



const fetchBusinessNews = async () => {
    const response = await fetch(business+apiKey);
    newsDataArr = [];

    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //throw err
        console.log(response.status, response.statusText)
    }

    displayNews();
}



const fetchTechnologyNews = async () => {
    const response = await fetch(technology+apiKey);
    newsDataArr = [];

    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //throw err
        console.log(response.status, response.statusText)
    }

    displayNews();
}



const fetchEntertainmentNews = async () => {
    const response = await fetch(entertainment+apiKey);
    newsDataArr = [];

    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
        console.log(myJson)
        //console.log(response.status, response.statusText)
    } else {
        //throw err
        console.log(response.status, response.statusText)
    }

    displayNews();
}



const fetchSportsNews = async () => {
    const response = await fetch(sports+apiKey);
    newsDataArr = [];

    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //throw err
        console.log(response.status, response.statusText)
    }

    displayNews();
}



const fetchQueryNews = async () => {

    if (newsQuery.value === null) 
        return;

    const response = await fetch(searchNews+encodeURIComponent(newsQuery.value)+"&apikey="+apiKey);
    newsDataArr = [];

    if (response.status >= 200 && response.status 
        < 300) {
        const myJson = await response.json();
        console.log(myJson)
        newsDataArr = myJson.articles;
        } else {
            console.log(response.status, response.statusText)

        }

        displayNews();
}



function displayNews () {

    newsDetails.innerHTML = "";

    if(newsDataArr.length == 0) {
        newsDetails.innerHTML = "<h4>No Data Found...</h4>"
        return;
    }

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T")

        var col = document.createElement("div");

        col.className = "col-sm-12 col-md-4 col-lg-3 p-2";


        var card = document.createElement("div");
        card.className = "p-2";

        var image = document.createElement("img");
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage;


        var cardBody = document.createElement("div");


        var newsHeading = document.createElement("h5");
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement("h6");
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var description = document.createElement("p");
        description.className = "text-muted";
        description.innerHTML = news.description;

        var link = document.createElement("a");
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read More"

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsDetails.appendChild(col);

    })
}

