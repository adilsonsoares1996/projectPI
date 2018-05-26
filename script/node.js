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
    var menuItemsFooter = document.getElementById('navfooter').getElementsByTagName('a');

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

function newPlayer() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "form.html", false);

    xmlHttp.onreadystatechange = function () {
        document.getElementsByClassName("content")[0].innerHTML += xmlHttp.responseText;
    }
    xmlHttp.send(null);
}


/**
 * Load components
 */

function myaccount() {
    //if is logout
    loginMode();
    //else show account configurations

}
/**
 * This function will create the popup that will possibilite user to choose login or register option
 */
function loginMode() {

    //get the content absolute
    var content = document.getElementsByClassName("content")[0];

    var modalContent = createForm("Login","Please fill in all fields");
    var idsToRemove=["passwordConfirmation","birthdayLabel","countryLabel"];

    removeFromForm(modalContent,idsToRemove);
    console.log(modalContent);
    modal = popup(modalContent,"Login","signupbtn","Register","registerbtn")



    content.append(modal);
}

function removeFromForm(form,ids){
    var child=form.childNodes;
    child.forEach(function (current, index, array) {
        if (ids.indexOf(current.id) > -1) {
            form.removeChild(current);
        }
    });
}

function createForm(titletext,subtitletext){
    var form = document.createElement("form");
    
    var title = document.createElement("h1");
    title.id="title";
    title.appendChild(document.createTextNode(titletext));

    var subtitle = document.createElement("p");
    subtitle.id="subtitle";
    subtitle.appendChild(document.createTextNode(subtitletext));

    var separator = document.createElement("hr");
    
    var nickname = document.createElement("input");
    nickname.id="nickname";
    nickname.type="text";
    nickname.placeholder="Entry nickname";

    var password = document.createElement("input");
    password.id="password";
    password.type="password";
    password.placeholder="Entry password";

    var passwordConfirmation = document.createElement("input");
    passwordConfirmation.type="password";
    passwordConfirmation.id="passwordConfirmation";
    passwordConfirmation.placeholder="Confirm password";

    var lblBirthday = document.createElement("label");
    lblBirthday.appendChild(document.createTextNode("Birthday: "));
    lblBirthday.id="birthdayLabel";
    var birthday = document.createElement("input");
    birthday.id="birthday";
    birthday.type="date";
    birthday.min="1979-12-31";

    var lblCountry = document.createElement("label");
    lblCountry.id="countryLabel";
    lblCountry.appendChild(document.createTextNode("Country: "));
    var countrySelector = document.createElement("select");
    countrySelector.id="countrySelector";
    var option= document.createElement("option");
    option.id="optionSelector";
    option.value="portugal";


    lblBirthday.append(birthday,document.createElement("br"),document.createElement("br"));

    countrySelector.appendChild(option);
    lblCountry.appendChild(countrySelector);

    
    form.append(title,subtitle,separator,nickname,password,passwordConfirmation,lblBirthday,lblCountry);

    return form;
}   


/**
 * function that return a pop-up with the content passed in param
 * @param {HTMLElement} content - the content that will be in the popup content,normally is a form
 */
function popup(content, firstBtnText, firstBtnClass, secondBtnText, secondBtnClass) {
    //is used for example to choose login or register, to show register form and others
    var modal = document.createElement("div");
    modal.className = "modal";

    var modalContent = document.createElement("div");
    modalContent.className = "modal-content";


    var spanClose = document.createElement("span");
    spanClose.className = "close";
    spanClose.innerHTML = "&times;";



    /* Create bottom buttons (inicio)*/
    var divbtns = document.createElement("div");
    divbtns.className = "clearfix";

    var firstbtn = document.createElement("BUTTON");
    firstbtn.className = firstBtnClass;
    firstbtn.type="submit";
    firstbtn.appendChild(document.createTextNode(firstBtnText));

    var secondbtn = document.createElement("BUTTON");
    secondbtn.className = secondBtnClass;
    secondbtn.type = "button";
    secondbtn.appendChild(document.createTextNode(secondBtnText));

    divbtns.append(firstbtn, secondbtn);
    /* Create bottom buttons (inicio)*/

    content.appendChild(divbtns);
    modalContent.append(spanClose, content);

    modal.appendChild(modalContent);


    //setup behavior

    // When the user clicks on <span> (x), close the modal
    spanClose.onclick = function () {
        modal.remove();
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.remove();
        }
    }

    return modal;
}

function loadMenu() {
    var header = document.createElement("header");

    var divMenu = document.createElement("div");
    divMenu.className = "divmenu";

    var divLogo = document.createElement("div");
    divLogo.id = "logo";

    var ahrefImg = document.createElement("a");
    ahrefImg.href = "index.html";

    imglogo = document.createElement("img");
    imglogo.src = "images/logotype/logotype.png";
    imglogo.id = "logo";

    ahrefImg.appendChild(imglogo);
    divLogo.appendChild(ahrefImg);
    divMenu.appendChild(divLogo);

    header.appendChild(divMenu);

    return header;
}


window.onload = function (event) {
    mouseClickCloseMenu();
}