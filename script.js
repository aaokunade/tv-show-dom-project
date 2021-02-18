function setup() {
  let allEpisodes = getAllEpisodes();
  
    makePageForEpisodes(allEpisodes);
    let rootEl = document.getElementById("root");
    let episodesDiv = document.createElement("div");
    episodesDiv.className = "episodesAll";
    document.body.appendChild(episodesDiv);
    function displayEpisodes(listOfEpisodes){
    listOfEpisodes.forEach(function(episodes){        
      let newDiv = document.createElement("div");
      newDiv.className = "summaryData";
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
    // while (matchedSearch.firstChild) {
    //   matchedSearch.removeChild(matchedSearch.firstChild);    
    // }

    let search = inputEl.value.toLowerCase();
    // let newEpisodeDiv = [];
    let listRemains = allEpisodes.filter(function(episodeList){
          if(episodeList["name"].toLowerCase().includes(search) || episodeList["summary"].toLowerCase().includes(search)){
                  
            return episodeList;
         
            }
            
        })
          let displayPara = document.getElementById("disp")
      displayPara.innerHTML = `displaying ${listRemains.length}/${allEpisodes.length}`;
      console.log (displayPara);
      displayEpisodes(listRemains);
    
  })
}
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}
window.onload = setup;
