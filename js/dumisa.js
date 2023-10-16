function $(element){
return document.querySelector(element);
}

function $$(element) {
  return document.querySelectorAll(element);
}

function none(element){
  element.style.display="none";
}

function block(element) {
  element.style.display = "block";
}

function grid(element) {
  element.style.display = "grid";
}

function flex(element,direction) {
  element.style.display = "flex";
  element.style.flexDirection=direction;
}

function universalOn(duration,theUniversalTitle,theUniversalContent) {
  
  flex($("#universal"));
  
  $("#title").textContent=`${theUniversalTitle}`;
  
  $("#content").textContent=`${theUniversalContent}`;
  
  setTimeout(()=>universalOff(), duration)
  
  }
  
function universalOff() {
  
    none($("#universal"));
  }
  
function createEl(elementToCreate){
  return document.createElement(elementToCreate);
}
  
$('#universal').addEventListener('click', universalOff);
  
function copyText(theCopiedText, theTime, theUniversalTitle, theUniversalContent) {
  
    navigator.clipboard.writeText(`${theCopiedText}`);
  
    universalOn(theTime, theUniversalTitle, theUniversalContent)
  
  }
  
$$("button").forEach(e => {
  e.addEventListener("click", (ev) => {
      ev.currentTarget.classList.toggle("scaled");
    });
  });
  
// go to the top


$$('.icon-up').forEach(e=>{
  e.addEventListener('click', ()=>{
    
window.scrollTo({ top: 0, behavior: "smooth" })
    
  })
});




// time functions
setInterval(()=>{
  
$$('.social-child').forEach(e=>e.addEventListener('click',()=>{ 
e.stopPropagation();
}))

  
//preventions
$$('img').forEach(e=>{
e.setAttribute("onContextMenu","return false;");
e.setAttribute("onerror","this.src='images/not_found.svg'");

//e.setAttribute("loading","lazy");
});


$$('a').forEach(e => {
  
  e.setAttribute("onContextMenu", "return false;");
  
  e.setAttribute("target", "_blank");
});

$$(`input`).forEach(e=>{
  e.setAttribute("autocomplete","off");
});

},)
// time functions end

// share api

const shareData = {
title: "Rest Country",
text: "Search for a country name and receive information about it.",
url: "https://the-rest-country.netlify.app",
};

const shareBtn= $$(".share-btn");


// Share must be triggered by "user activation"
shareBtn.forEach(e=>{
  e.addEventListener("click", async () => {
  
try {

await navigator.share(shareData);

//universalOn(3000,'successful','Dumisa shared successfully!');

window.navigator.vibrate(200);
    
} catch (err) {
    
console.log(`an error occurred: ${err}`);
    
}
});


})
document.addEventListener('contextmenu', (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    e.key === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.key === 'U'.charCodeAt(0))
  )
    return false;
};


// country rest api



function countriesApi(fromTheClickedDiv) {

  $("body").classList.add('overflow');

flex($("#countyDetails"));
$('#countyCapitals').innerHTML='';
$('#countyLanguages').innerHTML='';

let countryInput = $('#countryInput').value;

fetch(`https://restcountries.com/v3.1/name/${fromTheClickedDiv.trim()}?fullText=true`)

.then((res)=>res.json())

.then((countriesData)=>{

  //console.log(countriesData[0]);
  
let countyName = $('#countyName');
let countyFlag = $('#countyFlag');
let countryCurrency = $('#countryCurrency');
let countryContinent = $('#countryContinent');
let countryCode = $('#countryCode');
let countryOfficial = $('#countryOfficial');
let countryUtc = $('#countryUtc');
let countryArm = $('#countryArm');
let countyLanguages = $('#countyLanguages');
let countyCapitals = $('#countyCapitals');
let countryPopulation = $('#countryPopulation');
let currencyFullName = $('#currencyFullName');


countryCode.textContent = countriesData[0].idd.root + countriesData[0].idd.suffixes[0];



countyFlag.src = countriesData[0].flags.svg;
countryOfficial.textContent = countriesData[0].name.official;
countyName.textContent = countriesData[0].name.common;
countryUtc.textContent = countriesData[0].timezones[0];
countryPopulation.textContent = countriesData[0].population.toLocaleString();
countryContinent.textContent = countriesData[0].continents;
countryArm.src = countriesData[0].coatOfArms.svg;



let allLanguages = Object.values(countriesData[0].languages)
allLanguages.forEach(e=>{
  let li = document.createElement('li');
    li.textContent = e;
    countyLanguages.append(li);
})

countriesData[0].capital.forEach(e=>{
  let li = document.createElement('li');
    li.textContent = e;
    countyCapitals.append(li);
})

let allCurrencies = Object.values(countriesData[0].currencies)
countryCurrency.textContent = allCurrencies[0].symbol;

let allCurrenciesFull = Object.values(countriesData[0].currencies)
currencyFullName.textContent = allCurrenciesFull[0].name;

countyName.textContent.toLowerCase() === 'united states' || countyName.textContent.toLowerCase() === 'united states of america' ? countryCode.textContent = '+1' : null;


}).catch((e)=>{
  
  universalOn(6000,'404','Country could not be found, please type a correct name of the country in full!');

countryCode.textContent = null;
countyFlag.src = '';
countryOfficial.textContent = null;
countyName.textContent = null;
countryUtc.textContent = null;
countryPopulation.textContent = null;
countryContinent.textContent = null;
countryArm.src = '';
countryCurrency.textContent = null;
currencyFullName.textContent = null;


});

$("#countriesBody").scrollTo({ top: 0, behavior: "auto" });

  }

countryBtn.addEventListener('click',countriesApi);

//countriesApi();
// country rest api


$("#countyDetails").addEventListener("click",()=>{
  none($("#countyDetails"));
  $("body").classList.remove('overflow');
})


  

// Close of the universal modal using the escape key

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        universalOff();
    }
};

// Close of the universal modal using the escape key


let fullScreen = $$(".fullscreen");

fullScreen.forEach(screen=>{
  screen.addEventListener('click',toggleFullscreen)
})


function toggleFullscreen() {
  if (document.fullscreenElement) {
      // If there's an element in fullscreen, exit fullscreen
      document.exitFullscreen();
  
  } else {
      // If not in fullscreen, request fullscreen on the document
      document.documentElement.requestFullscreen()
          .catch(err => {
              console.error('Failed to enter fullscreen:', err);
          });
  }
}


let countriesBody = $("#countriesBody");

fetch(`https://restcountries.com/v3.1/all`)
.then((res)=>res.json())
  .then((allCountriesNames)=>{

//console.log(allCountriesNames[0]);

allCountriesNames = allCountriesNames.sort((a, b) => (a.name.common > b.name.common) ? 1 : ((b.name.common > a.name.common) ? -1 : 0));

allCountriesNames.map(e=>{

let div = createEl('div');
div.setAttribute('data-name', e.name.common);
div.setAttribute('data-region', e.region);
let img = createEl('img');
img.setAttribute('alt', e.name.common);
img.src = e.flags.svg;

let p = createEl('p');
p.className="flex-row gap";
p.innerHTML= `Name: <span class="highlight">${e.name.common}</span>`;

let p1 = createEl('p');
p1.className="flex-row gap";
p1.innerHTML= `Region: <span class="highlight">${e.region}</span>`;

div.append(img,p,p1);
$("#countriesBody").append(div);

    
});

$$('#countriesBody div').forEach(filter => {
  filter.addEventListener("click", (ev) => {
    countriesApi(ev.currentTarget.dataset.name);
$("#countriesBody").scrollTo({ top: 0, behavior: "auto" });
    
  })

});

$$('#filterBox span').forEach(filter => {
  filter.addEventListener("click", (ev) => {
    removeRegionActive();
    ev.currentTarget.classList.add('active');
    
$('#countryInput').value = null;
    
$$("#countriesBody div").forEach(dv=>{
  
if(ev.currentTarget.textContent.toLowerCase() === "all"){
  grid(dv);
}else{
  
dv.dataset.region.toLowerCase().includes(ev.currentTarget.textContent.toLowerCase()) ? grid(dv) : none(dv);
}


})  
    
  })
});

function removeRegionActive() {

  $$('#filterBox span').forEach(filter => {

    filter.classList.remove('active');
  })
}

$('#countryInput').addEventListener("keyup",function(){
  removeRegionActive();
  
$$('#countriesBody div').forEach(filter =>{
 
 filter.dataset.name.toLowerCase().startsWith(this.value.toLowerCase()) ? grid(filter) : none(filter);
  
})
  
});


$('#countryInput').addEventListener("blur", function() {
  removeRegionActive();

  $$('#countriesBody div').forEach(filter => {

if(!this.value){
  grid(filter);
} 
;

  });
  


})


  })
  .catch(err=>{
    console.log(err);
  });

