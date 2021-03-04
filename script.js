function setup() {
  let allEpisodes = getAllEpisodes();
  
    // makePageForEpisodes(allEpisodes);
    let rootEl = document.getElementById("root");
    let episodesDiv = document.createElement("div");
    episodesDiv.className = "episodesAll";
    document.body.appendChild(episodesDiv);
    function displayEpisodes(listOfEpisodes){
      listOfEpisodes.forEach(function(episodes){        
        let newDiv = document.createElement("div");
        newDiv.className = "summaryData";
        newDiv.id = `S${String(episodes["season"]).padStart(2, "0")}E${String(episodes["number"]).padStart(2, "0")}`;
        episodesDiv.appendChild(newDiv);
        let newHeader = document.createElement("h3");
        newDiv.appendChild(newHeader);
        newHeader.innerHTML = `${episodes["name"]} - S${String(episodes["season"]).padStart(2, "0") } E${String(episodes["number"]).padStart(2, "0")}`;
        let image = document.createElement("img");
        newDiv.appendChild(image);
        image.src = `${episodes["image"]["medium"]}`;
        let newPara = document.createElement("p");
        newDiv.appendChild(newPara);
        newPara.innerHTML = `${episodes["summary"]}`;        
      });
    }

    displayEpisodes(allEpisodes);

    let matchedSearch = document.getElementById("matchedList");
    let inputEl = document.getElementById("input");
    inputEl.addEventListener("input", function(){
      episodesDiv.innerHTML = "";      
      let search = inputEl.value.toLowerCase();      
      let listRemains = allEpisodes.filter(function(episodeList){
            if(episodeList["name"].toLowerCase().includes(search) || episodeList["summary"].toLowerCase().includes(search)){
                 return episodeList;          
            }              
      })
      let displayPara = document.getElementById("disp")
      displayPara.textContent = `displaying ${listRemains.length}/${allEpisodes.length} episodes`;
      // console.log (displayPara);
      displayEpisodes(listRemains);          
    })

    const selectElem = document.createElement("select"); 
    function selectFunc(allEpisodes){
       
      allEpisodes.forEach(function(episode){
        const optionElem = document.createElement("option");
        optionElem.textContent = `S${String(episode["season"]).padStart(2, "0")}E${String(episode["number"]).padStart(2, "0")} - ${episode["name"]}`
        selectElem.appendChild(optionElem);       
      })  
      const displayInput = document.getElementById("inputDisplay");
      displayInput.insertBefore(selectElem, displayInput.firstChild); 
    }

    selectFunc(allEpisodes);

    function selectedEpisode(){
      selectElem.addEventListener("change", function(event){
       let chosenOpt = event.target.value;
          const elemID = chosenOpt.split("-")[0];
          const chosenEpisode = document.querySelector(`#${elemID}`);
          chosenEpisode.scrollIntoView({ block: 'end', behavior: 'smooth' })
      })
    }
    selectedEpisode();
        
}
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}
window.onload = setup;

