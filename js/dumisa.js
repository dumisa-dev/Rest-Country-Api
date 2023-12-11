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

function universalOn(theUniversalContent) {
  
  grid($("#universal"));
  
  $("#content").textContent=`${theUniversalContent}`;
  
  }
  
function universalOff() {
    none($("#universal"));
  }
  
function createEl(elementToCreate){
  return document.createElement(elementToCreate);
}
  
$('#universal').addEventListener('click', universalOff);
  
function copyText(theCopiedText) {
  
    navigator.clipboard.writeText(`${theCopiedText}`);
  
    universalOn(`Copied "${theCopiedText}"`)
  
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


//copyright years
$("#copyrightYears").textContent = new Date().getFullYear();
  
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

axios.get(`https://restcountries.com/v3.1/name/${fromTheClickedDiv.trim()}?fullText=true`)

.then((countriesData)=>{

//console.log(countriesData.data[0]);
  
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

countryCode.textContent = countriesData.data[0].idd.root + countriesData.data[0].idd.suffixes[0];

countyFlag.src = countriesData.data[0].flags.svg;
countryOfficial.textContent = countriesData.data[0].name.official;
countyName.textContent = countriesData.data[0].name.common;
countryUtc.textContent = countriesData.data[0].timezones[0];
countryPopulation.textContent = countriesData.data[0].population.toLocaleString();
countryContinent.textContent = countriesData.data[0].continents;
countryArm.src = countriesData.data[0].coatOfArms.svg;

let allLanguages = Object.values(countriesData.data[0].languages)
allLanguages.forEach(e=>{
  let li = document.createElement('li');
    li.textContent = e;
    countyLanguages.append(li);
})

countriesData.data[0].capital.forEach(e=>{
  let li = document.createElement('li');
    li.textContent = e;
    countyCapitals.append(li);
})

let allCurrencies = Object.values(countriesData.data[0].currencies)
countryCurrency.textContent = allCurrencies[0].symbol;

let allCurrenciesFull = Object.values(countriesData.data[0].currencies)
currencyFullName.textContent = allCurrenciesFull[0].name;

countyName.textContent.toLowerCase() === 'united states' || countyName.textContent.toLowerCase() === 'united states of america' ? countryCode.textContent = '+1' : null;


}).catch((e)=>{
  
  universalOn('Data about this country could not be found');

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

setTimeout(() => {
  console.clear();
}, 100);
  }

countryBtn.addEventListener('click',countriesApi);

// country rest api


$("#countyDetails").addEventListener("click",()=>{
  none($("#countyDetails"));
  $("#countryArm").src='';
  $("#countyFlag").src='';
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


let fullScreen = $(".fullscreen");

fullScreen.addEventListener('click',toggleFullscreen);

fullScreen.textContent = 'Enter Fullscreen Mode';      

function toggleFullscreen() {
  if (document.fullscreenElement) {
      // If there's an element in fullscreen, exit fullscreen
      document.exitFullscreen();
this.textContent = 'Enter Fullscreen Mode';      
  
  } else {
      // If not in fullscreen, request fullscreen on the document
this.textContent = 'Exit Fullscreen Mode';      
document.documentElement.requestFullscreen().catch(err => {
              console.error('Failed to enter fullscreen:', err);
          });
  }
}

let countriesBody = $("#countriesBody");


axios.get(`https://restcountries.com/v3.1/all`)
.then((allCountriesNames)=>{

allCountriesNames.data = allCountriesNames.data.sort((a, b) => (a.name.common > b.name.common) ? 1 : ((b.name.common > a.name.common) ? -1 : 0));

allCountriesNames.data.map(e=>{

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
    universalOn('Service currently unavailable');
  });

  $("#logo").addEventListener('click',(ev)=>{
    ev.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  })


  setTimeout(()=>{
none($('#opening'))
  },2000)