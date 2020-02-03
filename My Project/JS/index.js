const signIn = document.querySelector("#loginBTN");
const signUp = document.querySelector("#signUpBTN");
const userName = document.getElementById("userName");
const password = document.getElementById("password");
const mainDiv = document.querySelector("#login");
const bodypage = document.querySelector("#bodypage");
const cursebodypage = document.querySelector("#cursebodypage");
let loginedUser = document.getElementById("logedInid");
var curses = [];
var data;
var request;

/// **********************sakht tavabe va moteghayer ha**********************************************-------------------------------------------------- 

if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject('Microsoft.XMLHTTP');
}

request.open('GET', "../JS/curses.JSON", false);
request.onreadystatechange = function() {
    if ((request.readyState === 4) && (request.status === 200)) {

        data = JSON.parse(request.responseText);

    } else {
        console.log("error");

    }
}
request.send();
curses = data;

function userinfo(user, password1, userID, accesslevel) { //usernames
    this.user = user;
    this.pass = password1;
    this.userID = userID;
    this.accesslevel = accesslevel;
}


function areYouLogedIn(userid, login) { // check kardan login boodan ya naboodan 
    this.userid = userid;
    this.login = login;

}

function curse(curseID, creatorsID, subject, title, summary, description, clicked) {
    this.curseID = curseID;
    this.creatorsID = creatorsID;
    this.subject = subject;
    this.title = title;
    this.summary = summary;
    this.description = description;
    this.clicked = clicked;

}
var users = []; //  user name ha ke bayad az server check shavad ...
var logincheck = []; // user login hast yana k bayad az db check mishod vali be soorat mostaghim avarde shode ast ... 


users.push(new userinfo("f.adib", "f.adib", 0, 2));
logincheck.push(new areYouLogedIn(0, false));
users.push(new userinfo("e.mosalla", "e.mosalla", 1, 2));
logincheck.push(new areYouLogedIn(1, false));
users.push(new userinfo("m.zolfi", "m.zolfi", 2, 2));
logincheck.push(new areYouLogedIn(2, false));
users.push(new userinfo("m.ahmadi", "m.ahmadi", 3, 2));
logincheck.push(new areYouLogedIn(3, false));
users.push(new userinfo("k.ahmadi", "k.ahmadi", 4, 2));
logincheck.push(new areYouLogedIn(4, false));
users.push(new userinfo("mr.rostami", "mr.rostami", 5, 2));
logincheck.push(new areYouLogedIn(5, false));

// ***************** main page coding***********************************-----------------------------------------------------------
function afterLoad() {
    firstcheckLogin();
    curseShowMaker();
}

function afterLoad1() {
    curseShowMaker1();
    firstcheckLogin();

}

function firstcheckLogin() { //check kardan inke karbar login hast ya na 
    for (x in logincheck) {
        if (logincheck[x].login == true) {
            loginedUser.innerHTML = users[x].user;
            loginedUser.href = "#";
        }
    }
}

// ((((((((((((((((((((((((((((((((       safhe login         ))))))))))))))))))))))))))))))))


//  *******************************login code *************************************************************----------------------------------------------

signIn.addEventListener("click", function() { // click rooye sign in 
    let logined = false; // in logined bayad to db tarif shavad ta ba dastresi haye motefavet safahat ra baz namayad 
    if (userName.value == "" || password.value == "") {
        alert("email and password is required ...");
    } else {
        for (var i = 0; i < users.length; i++) {
            if (userName.value == users[i].user) {
                if (password.value == users[i].pass) {
                    logined = true;
                    logincheck[i].login = true;
                    // neshon mide k log in shode
                    alert(logincheck[i].login);
                    location.href = "Main_Page.html";
                }
            }
        }
        if (!logined) {
            alert("You entered wrong username or password ... ");
            userName.value = "";
            password.value = "";
        }
    }
});

function curseShowMaker() {
    for (x in curses) {
        let adivcourses = document.createElement('a');
        adivcourses.href = "#";
        let divcourses = document.createElement('div');
        divcourses.classList.add("everecourse");
        divcourses.id = x;
        if (x % 2 == 0) {
            divcourses.style.background = "rgb(239, 222, 205)";
        }
        divcourses.addEventListener("click", function() {
            clicked(this.id);
        });
        adivcourses.appendChild(divcourses);
        document.getElementById(x);
        bodypage.appendChild(adivcourses);
        adivcourses.appendChild(divcourses);
        const divcoursesx = document.getElementById(x);

        let h1subject = document.createElement('h1');
        h1subject.classList.add("subject");
        h1subject.innerHTML = curses[x].subject;
        divcoursesx.appendChild(h1subject);

        let h2title = document.createElement('h2');
        h2title.classList.add("title");
        h2title.innerHTML = curses[x].title;
        divcoursesx.appendChild(h2title);

        let psummary = document.createElement('p');
        psummary.classList.add("summary");
        psummary.innerHTML = curses[x].summary;
        divcoursesx.appendChild(psummary);

        let whorwrite = document.createElement('h4');
        whorwrite.classList.add("creatorName");
        whorwrite.innerHTML = "Writen by : " + users[x].user;
        divcoursesx.appendChild(whorwrite);
    }

    function clicked(x) {
        /*   dar inja be data bace bege k che id amoozeshi click shode */
        curses[x].clicked = true;
        location.href = "../HTML/curses.html";
    }
}
//    **************************** sign up code************************************--------------------------------------------------------------------
signUp.addEventListener("click", function() { // click rooye sign up
    var signUpclicked = document.getElementById("login");
    signUpclicked.innerHTML = "";
    signUpMaker();
});

function signUpMaker() {
    // p enter user name
    let pusername = document.createElement('p');
    pusername.classList.add("matn");
    pusername.innerHTML = "Email : ";
    mainDiv.appendChild(pusername);
    // text box user name
    let makingUsername = document.createElement("input");
    makingUsername.setAttribute("type", "text");
    makingUsername.classList.add("log");
    makingUsername.id = "signUpUsername";
    mainDiv.appendChild(makingUsername);
    // p password 
    let pPassword = document.createElement('p');
    pPassword.classList.add("matn");
    pPassword.innerHTML = "password : ";
    mainDiv.appendChild(pPassword);
    // boxe password
    let makingPassword = document.createElement("input");
    makingPassword.setAttribute("type", "password");
    makingPassword.classList.add("log");
    makingPassword.id = "signUpPassword";
    mainDiv.appendChild(makingPassword);
    // p pass word khod ra mojadad vared konid
    let pRepassword = document.createElement('p');
    pRepassword.classList.add("matn");
    pRepassword.innerHTML = "password Again : ";
    mainDiv.appendChild(pRepassword);
    // boxe vared kardan mojadad password 
    let makingPasswordagain = document.createElement("input");
    makingPasswordagain.setAttribute("type", "password");
    makingPasswordagain.classList.add("log");
    makingPasswordagain.id = "signUpPasswordAgain";
    mainDiv.appendChild(makingPasswordagain);
    let pbr = document.createElement('p');
    pbr.innerHTML = "<br> ";
    mainDiv.appendChild(pbr);
    // dokme sabte etelaat 
    let signUpinfochecker = document.createElement("input");
    signUpinfochecker.setAttribute("type", "button");
    signUpinfochecker.value = "Sign up ";
    signUpinfochecker.classList.add("logBTN");
    signUpinfochecker.id = "signUpinfochecker";
    mainDiv.appendChild(signUpinfochecker);
    signUpinfochecker.addEventListener("click", function() { // click roye dokme sign up sakhte shode
        signupcheckerclicked();
    });
}

function signupcheckerclicked() {
    const newUsername = document.getElementById("signUpUsername");
    const newPassword = document.getElementById("signUpPassword");
    const newPasswordAgan = document.getElementById("signUpPasswordAgain");
    const newsignUp = document.querySelector("#signUpinfochecker");
    if (newUsername.value == "" || newPassword.value == "" || newPasswordAgan.value == "") { //khali nabashad
        alert("your information are required");
    } else if (newPassword.value != newPasswordAgan.value) { // ramz ha yeki bashad
        alert("your passwords dose not match ...");
    } else {
        if (confirm("username : " + newUsername.value + " password : " + newPassword.value)) {
            var userIDcreator = users.length;
            users.push(new userinfo(newUsername.value, newPassword.value, userIDcreator, 0));
            logincheck.push(new areYouLogedIn(userIDcreator, false));
            /*              
            tavajooooh
            dar in ghesmat bayad user name va password be data base ezafe gardad 
            sakht profile jadid
            */
            location.href = "Login_page.html";
        } else {
            newUsername.value = "";
            newPassword.value = "";
            newPasswordAgan.value = "";
        }
    }
}
/*   ___________________________________________  sakht safheye curses __________________________________________________-*/

function curseShowMaker1() {
    var x1 = 0;
    let divcourses = document.createElement('div');
    divcourses.classList.add("everecourse");
    divcourses.id = x1;
    divcourses.style.background = "white";
    cursebodypage.appendChild(divcourses);
    const divcoursesx = document.getElementById(x1);
    let h1subject = document.createElement('h1');
    h1subject.classList.add("subject");
    h1subject.innerHTML = curses[x1].subject;
    divcoursesx.appendChild(h1subject);
    let h2title = document.createElement('h2');
    h2title.classList.add("title");
    h2title.innerHTML = curses[x1].title;
    divcoursesx.appendChild(h2title);
    let psummary = document.createElement('p');
    psummary.classList.add("summary");
    psummary.innerHTML = curses[x1].summary;
    divcoursesx.appendChild(psummary);
    let pdescription = document.createElement('p');
    pdescription.classList.add("description")
    pdescription.innerHTML = curses[x1].description;
    divcourses.appendChild(pdescription);
    let whorwrite = document.createElement('h4');
    whorwrite.classList.add("creatorName");
    whorwrite.innerHTML = "Writen by : " + users[x1].user;
    divcoursesx.appendChild(whorwrite);
    let breaded = document.createElement("button");
    breaded.id = "readedBTN";
    breaded.classList.add("readed");
    breaded.innerHTML = "Finished";
    divcourses.appendChild(breaded);
    breaded.addEventListener("click", function() {
        if (confirm("Are you ready for test")) {
            location.href = "#";
        } else {
            alert("Read again");
        }
    });
    let bback = document.createElement("button");
    bback.id = "backBTN";
    bback.classList.add("back");
    bback.innerHTML = "Back";
    divcourses.appendChild(bback);
    bback.addEventListener("click", function() {
        location.href = "Main_Page.html";
    });




}
// ((((((((((((((((((((((((((((((((       safhe login         ))))))))))))))))))))))))))))))))