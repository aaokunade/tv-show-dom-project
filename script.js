const allShows = getAllShows();
const displayDiv = document.querySelector("#displayDiv");
const showsDiv = document.createElement("div");
showsDiv.className = "showsDiv";
const inputSearchDiv = document.querySelector("#inputSearch");
inputSearchDiv.className = "inputSearchDiv";
const inputSearch = document.createElement("input");
inputSearch.placeholder = "your search item here";
inputSearch.className = "inputSearch";
inputSearchDiv.insertBefore(inputSearch, inputSearchDiv.lastChild);
inputSearchDiv.appendChild(inputSearch);
const episodesDiv = document.createElement("div");
episodesDiv.className = "episodesDiv";
const displayPara = document.createElement("p");
inputSearchDiv.appendChild(displayPara);


// // console.log(allShows);
function getShows(allShows){
    inputSearch.addEventListener("input", episodeInput);
    // implement display of all shows
    function displayShows(shows){
        shows.forEach(function(show){
            const showDiv = document.createElement("div");
            showDiv.className = "showDiv";
            const showHeader = document.createElement("h3");
            showHeader.innerHTML = show["name"];
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
    };

        // create select element for shows
        const selectShow = document.createElement("select"); 
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
    
        // takes in a showID and return the corresponding array of episodes objects
        // const fetchEpisodes = async function(showID){
        //     const response = await fetch(`https://api.tvmaze.com/shows/${showID}/episodes`);
        //     const data = await response.json();
        //     return data;
        // };

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
    const selectEpisodeEl = document.createElement("select"); 
    selectEpisodeEl.id = "episodeSel";
    inputSearchDiv.appendChild(selectEpisodeEl); 

    const showID = selectShow.value;
    fetchEpisodesPromise(showID)
    .then(function(data) {
        selectEpisode(data);
    });
    // const episode = await fetchEpisodes(showID)

    // display corresponding episodes in select episode element for selected show
    selectShow.addEventListener("change", function(event){
        const showID = event.target.value; 
        fetchEpisodesPromise(showID)
        .then(function(data) {
            selectEpisode(data);
            displayEpisodes(data);
        });
    });

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
          const search = inputSearch.value.toLowerCase();
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


