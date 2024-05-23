const playersInfo = document.getElementById("players");

const loadAllPlayer = (name) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.player == null) {
                players.innerHTML = `<h1> Not found ${name}</h1>`;
            }
            else {
                displayPlyaer(data.player);
            }
        })
}



const searchfield = document.getElementById("search-field");

const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
    let inputvalue = searchfield.value;
    loadAllPlayer(inputvalue);

})

const displayPlyaer = (players) => {
    playersInfo.innerHTML = '';


    players.forEach((player) => {

        const div = document.createElement("div");
        div.classList.add("playercard");
        div.innerHTML = `
        
        <img class="card-img" src=${player.strThumb} alt="" />
        <h2>Name: ${player.strPlayer} </h2>
        <h4>Gender: ${player.strGender}</h4>
        <h4>Nationality: ${player.strNationality} </h4>
        <h4>Team: ${player.strTeam} </h4>

        <p> ${player.strDescriptionEN.slice(0, 150)}</p>

        
        <a href=${player.strFacebook}><i class="fa-brands fa-facebook"></i></a>
        
        
        <a href=${player.strInstagram}><i class="fa-brands fa-instagram"></i></a>
        

        <button onclick="handlecart('${player.idPlayer}','${player.strPlayer}')">Add to Group</button>
        <button onclick="playerDetails('${player.idPlayer}')">Details</button>
        
        
        `;

        playersInfo.appendChild(div);

    });

};

const playerDetails = (id) => {
    const modalSection = document.getElementById("modal-section");

    modalSection.style.visibility = 'visible';
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
        .then((res) => res.json())
        .then((data) => {

            // console.log(data.players[0]);
            modalplayer(data.players[0]);

        }
        );

};


const modalplayer = (playerid) => {
    const modalSection = document.getElementById("modal-section");
    const div = document.createElement("div");
    div.classList.add("playerinfo");
    div.innerHTML = `
  <img class="modal-img" src=${playerid.strThumb} alt="" />
        <h2>Name: ${playerid.strPlayer} </h2>
        <h4>Gender: ${playerid.strGender}</h4>
        <h4>Birthlocation: ${playerid.strBirthLocation}</h4>
        <h4>Nationality: ${playerid.strNationality} </h4>
        <h4>Team: ${playerid.strTeam} </h4>
        <h4>Sports: ${playerid.strSport} </h4>

        <p> ${playerid.strDescriptionEN.slice(0, 200)}</p>

        
       
                                
    <button class="modalbtn"  onclick="closepopup()" >Close</button>
  `;

    modalSection.appendChild(div);
}

const closepopup = () => {
    const modalSection = document.getElementById("modal-section");
    modalSection.style.visibility = "hidden";
}

const handlecart = (id, name) => {
    const cartcount = document.getElementById("count").innerText;
    let convertedcount = parseInt(cartcount);

    if (convertedcount < 11) {
        convertedcount = convertedcount + 1;
    }


    document.getElementById("count").innerText = convertedcount;


    const cartinfo = document.getElementById("addinfo");
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
    <p>${id}</p>
    <h5>${name}</h5>
    
    `;
    if (convertedcount < 11) {
        cartinfo.appendChild(div);
    }



};








loadAllPlayer('');