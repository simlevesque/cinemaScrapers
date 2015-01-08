var films = document.getElementsByTagName("TBODY")[1].children[1].children[0].children[0].children;
for(var i = 0; i<films.length;i++){
  if(films[i].tagName === "TABLE" && films[i].bgColor !== "#000000"){
    console.log(i);
    var film = films[i],
        name = film.children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[0].textContent.replace(/\s+/g,' ').trim(),
        lang = film.children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[2].textContent,
        _film = {},
        dates = film.children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[3].childNodes;
        _horaire = {},
        _times = [],
        _dates = [];
    for(var j = 0;j<dates.length;j++){
      
      if(dates[j].nodeName = "#text" && dates[j].textContent.replace(/\s+/g,' ').trim() !== "" && (typeof dates[j].children === "undefined" || dates[j].children.length === 0)){
        var node = dates[j].textContent.replace(/\s+/g,' ').trim();
        if(isNaN(parseInt(node.charAt()))){
           _times.push(node);
        } else {
           _dates.push(node);
        }
      }
    }
    console.log(_times);
    console.log(_dates);
    if(lang.indexOf("fr") === -1) lang = "en"
    else lang = "fr"
    
    _film.name = name;
    _film.lang = lang;
  }
}

/*
Exception: dates.push is not a function
@Scratchpad/1:20:12
*/