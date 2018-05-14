/*Menu functions*/
function menuResponsive() {
    var nav = document.getElementById("topnav");
    if (nav.className === "nav") {
        nav.className += " responsive";
        menuIconAnimation(50); //show the middle icon

        setTimeout(function () { menuIconAnimation(100) }, 100);//show the end ("X") icon

    } else {
        nav.className = "nav";
        menuIconAnimation(50);//show the middle icon

        setTimeout(function () { menuIconAnimation(0) }, 100);//show the start icon
    }
}

/*
Para mudar o icon do menu, de 3 traços para x e vice-versa
*/
function menuIconAnimation(percent) {
    var menuIcon = document.getElementById("menuIcon");

    if (percent == 0) {
        menuIcon.innerHTML = "&#9776";
    } else if (percent <= 50) {
        menuIcon.innerHTML = "&#9886";
    } else if (percent <= 100) {
        menuIcon.innerHTML = "&#10005"
    }
}

/**
 * To change active item when clicked, and dropdown menu
 */
function mouseClickCloseMenu() {
    var menuItemsTop = document.getElementById('topnav').getElementsByTagName("a");
    var menuItemsFooter = document.getElementById('navfooter').getElementsByTagName('li');

    function getElem(nodes, position, textContent) {
        for (var i = position; i < nodes.length; i++) {
            if (nodes[i].textContent == textContent) {
                return nodes[i];
            }
        }
        return null;
    }
    //when menu icon is clicked put the menu responsive or not
    menuItemsTop[0].onclick = function () { menuResponsive() }

    function changeActives(itemSelected) {
        var newActiveTop = getElem(menuItemsTop, 1, itemSelected);
        var newActiveFooter = getElem(menuItemsFooter, 0, itemSelected);
        var activeTop = document.getElementsByClassName("active")[0];
        var activeFooter = document.getElementsByClassName("activefooter")[0];

        activeTop.className = "";
        activeFooter.className = "";

        newActiveTop.className = "active";
        newActiveFooter.className = "activefooter";

    }
    //when the menu item top is clicked open the link and close menu
    for (var i = 1; i < menuItemsTop.length; i++) {
        menuItemsTop[i].onclick = function () {
            changeActives(this.textContent);

            if (document.getElementById("topnav").className === "nav responsive")
                menuResponsive();

        }
    }
    //when the menu item in footer is clicked
    for (var i = 0; i < menuItemsFooter.length; i++) {
        menuItemsFooter[i].onclick = function () {
            changeActives(this.textContent);
        }
    }
}

/**
 * De momento está função vai ao ficheiro indicado lê o texto
 * e coloca num elemento de class content
 * 
 * Posteriormente,será usada para metodo cliente server
 */
function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url);

    xmlHttp.onreadystatechange = function () {

        console.log(xmlHttp.responseText);
    }
    xmlHttp.send(xmlHttp);
}

function newPlayer(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "form.html",false);

    xmlHttp.onreadystatechange = function () {
        document.getElementsByClassName("content")[0].innerHTML += xmlHttp.responseText;
    }
    xmlHttp.send(null);    
}