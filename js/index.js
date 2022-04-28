//Result visualization rules
async function appearance(){
  let main = document.querySelector('#main');
  let logo = document.querySelector('#title');
  let subtitle = document.querySelector('#subtitle');
  main.textContent = '';
  subtitle.textContent = '';
  logo.style.top = "102%";
  logo.style.fontSize = "large";
  logo.innerHTML="<button class='link' onclick='location.reload()'>Go back</button>"; // The Quacity logo becomes a lower button.
  logo.style.opacity = "100%";
  logo.style.transition = "0.9s";
  }


// Search for the city with the same keyword.
async function searchCity(city){

  // alert('Bravo! -Working test-');
  const apiUrl = (`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`);

  //console.log(apiUrl);

  // API request
  const response = await fetch(apiUrl);
  const data = await response.json();

  appearance();

  let dataCategories = data.categories; //Various scoring categories of the city
  let dataSummary = document.createTextNode(data.summary); // City description
  let dataSummDIV = document.createElement('div');

  dataSummDIV.setAttribute('id', 'summary');
  dataSummDIV.appendChild(dataSummary);
  
  //Refresh to the home if the city does not exist.
  if (data.summary == undefined) { 
    data.summary = "";
    alert('City not found! :(');
    location.reload();
  }

  // Description formatting rules.
  let currentDiv = document.querySelector('#main');
  currentDiv.appendChild(dataSummDIV);
  document.querySelector('#summary').innerHTML = data.summary;
  dataSummDIV.style.fontFamily="Blackfriday";
  dataSummDIV.style.textShadow = "3px 6px 11px #e6e6e6";
  dataSummDIV.style.fontSize = "18px";
  dataSummDIV.style.paddingTop = "250px";
  currentDiv.style.height = "90%";
  currentDiv.style.overflow = 'scroll';
  currentDiv.style.scrollbarWidth = 'none';

  // Generation of scores by category.
  for (const components in dataCategories) {

      let score =  data.categories[components].score_out_of_10;
      score = score.toFixed(2);
      let content = document.createTextNode(`${dataCategories[components].name} : ${score}`);
      
      let dataCatDIV = document.createElement('div');
      dataCatDIV.appendChild(content);
      const currentDiv = document.querySelector('#main');
      currentDiv.appendChild(dataCatDIV);
      dataCatDIV.style.color=(`${data.categories[components].color}`); // Categories formatting rules.
      dataCatDIV.style.fontFamily="Blackfriday";
      dataCatDIV.style.textShadow = "2px 1px 3px #000000";
      dataCatDIV.style.fontSize = "19px";

    }

  // Approximation of the scores figures.
  let cityScore = document.createTextNode(`CITY SCORE : ${data.teleport_city_score.toFixed(2)}`);
  
  let cityScoreDIV = document.createElement('div');
  cityScoreDIV.setAttribute('id', 'score');
  currentDiv.appendChild(cityScoreDIV);
  cityScoreDIV.appendChild(cityScore);
  cityScoreDIV.style.fontFamily="Blackfriday";  // Total city score formatting rules.
  cityScoreDIV.style.fontSize = "22px";
  cityScoreDIV.style.textShadow = "0px 0px 5px #e6e6e6";
}

// If the word entered is considered valid, proceed with the API request.
async function validateInput() {

  let city = document.querySelector('#bar').value;
  console.log(city);
  
  if (city !== "" && (/^[A-Za-z\s]*$/.test(city))) {
    city = city.toLowerCase();
    city = city.replace(/ /g, "-");
    console.log(city);

    searchCity(city);
  } else {

    alert("Please, write a city name.");
    return false;
  }

}