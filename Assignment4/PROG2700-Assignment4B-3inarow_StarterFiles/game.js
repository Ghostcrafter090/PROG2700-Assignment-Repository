const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

if (params.iamsmart == "true") {
    alert("you will never be smart because you are a cheater ya piss ball.");
}

if (params.iamsmart == "false") {
    alert("you are correct.");
}

function toggleState(event) {
    if (document.getElementById('attrib').className != "showmistakes") {
        console.log("\"" + event.target.classList[0] + "\"");
        if (event.target.classList[2] == "canToggle-true") {
            if (event.target.classList[0] == "currentState-1") {
                event.target.className = 'currentState-2 ' + event.target.classList[1] + " " + event.target.classList[2];
            } else if (event.target.classList[0] == "currentState-0") {
                event.target.className = 'currentState-1 ' + event.target.classList[1] + " " + event.target.classList[2];
            } else if (event.target.classList[0] == "currentState-2") {
                event.target.className = 'currentState-0 ' + event.target.classList[1] + " " + event.target.classList[2];
            }
        }
    } else {
        alert("Press done viewing mistakes ya corn dog.")
    }
}

function showMistakes() {
    if (document.getElementById('amistake').checked) {
        document.getElementById('attrib').className = "showmistakes";
    }
}

function hideMistakes() {
    document.getElementById('attrib').className = "";
}

function check() {
    if (document.getElementsByClassName('currentState-0').length == 0) {
        if (document.getElementsByClassName('currentState-1').length == document.getElementsByClassName('currentState-1 correctState-1').length) {
            if (document.getElementsByClassName('currentState-2').length == document.getElementsByClassName('currentState-2 correctState-2').length) {
                alert("no because it still took you " + ticn / 10 + " seconds to complete it. you will never be smart.");
            } else {
                alert("no because you have mistakes ya sausage lemon");
            }
        } else {
            alert("no because you have mistakes ya sausage lemon");
        }
    } else {
        alert("no because you haven't finished you dinklburg");
    }
    showMistakes();
}

let ticn = 0;

function tic() {
    ticn = ticn + 1;
    setTimeout(tic, 100);
}
tic();

(() => {
    url = "https://threeinarowpuzzle.herokuapp.com/random"
    fetch(url).then(res => res.json()).then(data => result = data).then(() => {
        json = result
        string = "";
        string = string + "<tr>";
        string = string + "<td onclick=\"toggleState(event)\" class=\"currentState-" + json.rows[0][0].currentState + " correctState-" + json.rows[0][0].correctState + " canToggle-" + json.rows[0][0].canToggle + "\">!</td>";
        json.rows[0].reduce((previousb, currentb) => {
           string = string + "<td onclick=\"toggleState(event)\" class=\"currentState-" + currentb.currentState + " correctState-" + currentb.correctState + " canToggle-" + currentb.canToggle + "\">!</td>";
        });
        string = string + "</tr>";
        json.rows.reduce((previousa, currenta) => {
            string = string + "<tr>";
            string = string + "<td onclick=\"toggleState(event)\" class=\"currentState-" + currenta[0].currentState + " correctState-" + currenta[0].correctState + " canToggle-" + currenta[0].canToggle + "\">!</td>";
            console.log(currenta)
            currenta.reduce((previousb, currentb) => {
                string = string + "<td onclick=\"toggleState(event)\" class=\"currentState-" + currentb.currentState + " correctState-" + currentb.correctState + " canToggle-" + currentb.canToggle + "\">!</td>";
            });
            string = string + "</tr>";
        });
        console.log(string);
        document.getElementById('theGame').innerHTML = "<div id=\"attrib\" class=\"\"><table>" + string + "</table><div><br><button onclick=\"check()\">Am I smart yet?</button><br><br>Show Mistakes: <input type=\"checkbox\" id=\"amistake\" name=\"mistake\">&nbsp;&nbsp;&nbsp;&nbsp;<button id=\"amistake-button\" onclick=\"hideMistakes()\">Hide Mistakes</button></div></div>";
    });
})();