const allShows = getAllShows();
// sorts all shows in alphabetical order.
allShows.sort((a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    } else if (b.name.toLowerCase() > a.name.toLowerCase()) {
      return -1;
    } else {
      return 0;
    }
  });
const displayDiv = document.querySelector("#displayDiv");
const showsDiv = document.createElement("div");
showsDiv.className = "showsDiv";
const inputSearchDiv = document.querySelector("#inputSearch");
inputSearchDiv.className = "inputSearchDiv";
const inputSearch = document.createElement("input");
const showInputSearch = document.createElement("input");
showInputSearch.placeholder = "your shows search here";
inputSearchDiv.appendChild(showInputSearch);
inputSearch.placeholder = "your episodes search here";
inputSearch.className = "inputSearch";
inputSearchDiv.insertBefore(inputSearch, inputSearchDiv.lastChild);
inputSearchDiv.appendChild(inputSearch);
let backButton = document.createElement("button");
backButton.textContent = "Back to All Shows List"
inputSearchDiv.appendChild(backButton);
const episodesDiv = document.createElement("div");
episodesDiv.className = "episodesDiv";
const displayPara = document.createElement("p");
inputSearchDiv.appendChild(displayPara);
const showDisplayPara = document.createElement("p");
inputSearchDiv.appendChild(showDisplayPara);



function getShows(allShows){
    
    inputSearch.addEventListener("input", episodeInput);
    showInputSearch.addEventListener("input", showInput);
    // implement display of all shows
    function displayShows(shows){
        episodesDiv.innerHTML ="";
        shows.forEach(function(show){
            const showDiv = document.createElement("div");
            showDiv.className = "showDiv";
            const showHeader = document.createElement("h3");
            showHeader.innerHTML = show["name"];
            showHeader.addEventListener("click", (event)=>{
                showChange(show["id"]);
                const selectShow = document.getElementById("selectShow");
                selectShow.value = show["id"];
            });
            const wrapDiv = document.createElement("div");
            wrapDiv.className = "wrapDiv";
            const showImg = document.createElement("img");
            if (show.image){
                showImg.src = show.image.medium;
            };
            const showPara = document.createElement("p");
            showPara.innerHTML = show["summary"];
            const showDescriptionDiv = document.createElement("div");
            showDescriptionDiv.className = "showDescription";
            const ratePara = document.createElement("p");
            ratePara.innerText = `Rating: ${show["rating"]["average"]}`;
            const genrePara = document.createElement("p");
            genrePara.innerText = `Genres: ${show["genres"]}`;
            const statusPara = document.createElement("p");
            statusPara.innerText = `Status: ${show["status"]}`;
            const runTimePara = document.createElement("p");
            runTimePara.innerText = `Runtime: ${show["runtime"]}`;
            showDiv.appendChild(showHeader);
            showDiv.appendChild(wrapDiv);
            wrapDiv.appendChild(showImg);
            wrapDiv.appendChild(showPara);
            showDescriptionDiv.appendChild(ratePara);
            showDescriptionDiv.appendChild(genrePara);
            showDescriptionDiv.appendChild(statusPara);
            showDescriptionDiv.appendChild(runTimePara);
            wrapDiv.appendChild(showDescriptionDiv);
            showsDiv.appendChild(showDiv);
        })
        displayDiv.appendChild(showsDiv);
        showDisplayPara.style.display = "inline";
        backButton.style.display = "none";
    };

        // create select element for shows
        const selectShow = document.createElement("select"); 
        selectShow.id = "selectShow";
        selectShow.addEventListener("change", (event)=>{
            showChange(event.target.value);
        });
        function selectShowFunc(shows){  
            shows.forEach(function(show){
            const optionElem = document.createElement("option");
            optionElem.textContent = show["name"];
            optionElem.value = show["id"];
            selectShow.appendChild(optionElem);       
      })  
      inputSearchDiv.appendChild(selectShow);
      inputSearchDiv.insertBefore(selectShow, inputSearchDiv.firstChild); 
    };
    
        // takes in a showID and return the corresponding array of episodes object
        const fetchEpisodesPromise = function(showID){
         return fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
         .then(response => response.json())       
        };

    // create select element for episodes    
    function selectEpisode(episodes){
        selectEpisodeEl.textContent = "";
        const docFrag = document.createDocumentFragment();
        episodes.forEach(function(episode){
            const optionElem = document.createElement("option");
            optionElem.textContent = `S${String(episode["season"]).padStart(2, "0")}E${String(episode["number"]).padStart(2, "0")} - ${episode["name"]}`
            docFrag.appendChild(optionElem);   
        })
        selectEpisodeEl.appendChild(docFrag);  
    };
    
    // execute functions
    displayShows(allShows)
    selectShowFunc(allShows);
    
    // fetch episodes and display in select input element
    // creates select elem for episodes
    const selectEpisodeEl = document.createElement("select"); 
    selectEpisodeEl.id = "episodeSel";
    inputSearchDiv.appendChild(selectEpisodeEl); 

        // loads the page to display shows on first load
    const showID = selectShow.value;
    selectEpisodeEl.style.display = "none";
    inputSearch.style.display = "none";
    displayPara.style.display = "none";
    showDisplayPara.style.display = "inline";
    fetchEpisodesPromise(showID)
    .then(function(data) {
        selectEpisode(data);
    });


    function showChange(showID){
        // const showID = event.target.value; 
        fetchEpisodesPromise(showID)
        .then(function(data) {
            selectEpisode(data);
            displayEpisodes(data);
            selectEpisodeEl.style.display = "inline";
            inputSearch.style.display = "inline";
            displayPara.style.display = "inline";
            backButton.style.display = "inline";
            selectShow.style.display = "none";
            showInputSearch.style.display = "none";
            showDisplayPara.style.display = "none";
        });
    }

    
    let showRemains;
    function showInput(event){
        showsDiv.textContent = "";
        let search = event.target.value;
                  showRemains =  allShows.filter(function(showFiltered){
                  if(showFiltered["name"].toLowerCase().includes(search) || showFiltered["summary"].toLowerCase().includes(search) || showFiltered["genres"].join(" ").toLowerCase().includes(parseFloat(search))){
                      return showFiltered;  
                      console.log(showFiltered);          
                  }
           })        
           displayShows(showRemains);        
           showDisplayPara.textContent = `displaying ${showRemains.length}/${allShows.length} shows`;                 
      };
    
        


    // display corresponding episodes in the browser
        function displayEpisodes(episodes){
            episodesDiv.textContent = "";
            episodes.forEach(function(episode){
                const episodeDiv = document.createElement("div");
                episodeDiv.className = "episodeDiv";
                episodeDiv.id = `S${String(episode["season"]).padStart(2, "0")}E${String(episode["number"]).padStart(2, "0")}`;
                const episodeHeader = document.createElement("h3");
                episodeHeader.innerHTML = `${episode["name"]} - S${String(episode["season"]).padStart(2, "0") } E${String(episode["number"]).padStart(2, "0")}`
                episodeDiv.appendChild(episodeHeader );
                const episodeImg = document.createElement("img");
                if (episode["image"]){
                    episodeImg.src = `${episode["image"]["medium"]}`;
                };
                episodeDiv.appendChild(episodeImg);
                const episodePara = document.createElement("p");
                episodePara.innerHTML = `${episode["summary"]}`;
                episodeDiv.appendChild(episodePara);
                episodesDiv.appendChild(episodeDiv);
            })
        displayDiv.innerHTML = "";
        displayDiv.appendChild(episodesDiv);
    };

    // scroll into view
        selectEpisodeEl.addEventListener("change", function(event){
         let chosenOpt = event.target.value;
            const elemID = chosenOpt.split("-")[0];
            const chosenEpisode = document.querySelector(`#${elemID}`);
            chosenEpisode.scrollIntoView({ block: 'end', behavior: 'smooth' })
        })


    //   present the episodes that match the search term
      let listRemains;
      function episodeInput(event){
          episodesDiv.textContent = "";
          const search = event.target.value;
          const showID = selectShow.value;
             fetchEpisodesPromise(showID)
             .then(function(data){
               listRemains =  data.filter(function(episodeFiltered){
                    if(episodeFiltered["name"].toLowerCase().includes(search) || episodeFiltered["summary"].toLowerCase().includes(search)){
                        return episodeFiltered;            
                    }
             })        
             displayEpisodes(listRemains);        
             displayPara.textContent = `displaying ${listRemains.length}/${data.length} episodes`; 
          })                          
        };


       
        backButton.addEventListener("click", backBtn)
        function backBtn() {
            displayShows(allShows); 
            showInputSearch.innerText = "";
            selectEpisodeEl.style.display = "none";
            inputSearch.style.display = "none";            
            const selectShow = document.getElementById("selectShow");
            selectShow.selectedIndex = 0;
            selectShow.style.display = "inline";
            showInputSearch.style.display = "inline";
            displayPara.style.display = "none";
            showDisplayPara.style.display = "none";
        };
    }
    

// function getAllEpisodes(){

//     let listRemains;
//     function episodeInput(event){
//         episodesDiv.textContent = "";
//         const search = inputSearch.value.toLowerCase();
//         // console.log(inputSearch.value);
//            listRemains = urlData.filter(function(episodeFiltered){
//             if(episodeFiltered["name"].toLowerCase().includes(search) || episodeFiltered["summary"].toLowerCase().includes(search)){
//                 // console.log(episodeFiltered);
//                 return episodeFiltered;                
//             }
//         })    

//         displayPara.textContent = `displaying ${listRemains.length}/${urlData.length} episodes`;
//         displayEpisodes(listRemains);     
//     }



//     function selectedEpisode(){
//         selectEpisode.addEventListener("change", function(event){
//          let chosenOpt = event.target.value;
//             const elemID = chosenOpt.split("-")[0];
//             const chosenEpisode = document.querySelector(`#${elemID}`);
//             chosenEpisode.scrollIntoView({ block: 'end', behavior: 'smooth' })
//         })
//       };

//       selectedEpisode();
    

//     let urlData;

//     fetch("https://api.tvmaze.com/shows/82/episodes")
//         .then(function(response){
//             return response.json();
//         })

//         .then(function(data){
//             urlData = data;
//             selectEpisodeFunc(urlData);
//             selectedEpisode(urlData);
//             return displayEpisodes(urlData);
//         })
// }

// getAllEpisodes();
getShows(allShows);


