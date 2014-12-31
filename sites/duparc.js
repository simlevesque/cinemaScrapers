console.log("du parkzz");
var films = document.getElementsByTagName("TBODY")[1].children[1].children[0].children[0].children;
for(var i = 0; i < films.length; i++){
  var film = films[i];
  if(film.tagName === "TABLE"){
    var name = film.children[0].children[0].children[0].children[0];
    console.log(film.children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0].children[0].textContent);
   
  }
}