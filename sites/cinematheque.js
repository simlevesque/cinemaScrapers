var times = document.getElementsByClassName("time"),
    noms = document.getElementsByClassName("progItem-name"),
    _cinema = {},
    _films = [],
    _nomCinema = "Cinémathèque québecoise";
console.log("!!")
for(var i = 0;i<times.length;i++){
    console.log(times[i].textContent  + " - " + noms[i].children[0].textContent);
}