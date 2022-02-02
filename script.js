/* BUILD THE LEADERBOARD */
const domain = "https://api-and-websockets.herokuapp.com"
let build_board = async (name) => {
    let url = domain + `/api/get_scores/${name}/` // you can change this to "https://api-and-websockets.herokuapp.com/api/get_scores"
    console.log(url);
    let data = await fetch(url)
    data = await data.json()            
    let container = document.querySelector("#leaderboard-table");
    container.innerHTML = `<thead>
    <tr>
        <th>RANK</th>
        <th>NAME</th>
        <th>SCORE</th>
    </tr>
</thead>`;
    var x=0;
    for (item of data){
        if(item.score<=100&&item.score>=0&&item.score%10==0)
        {
            x++;
            tag = `
            <tr>
            <td id='ranks'>
                ${x}
            </td>
            <td id='names'>
                ${item.name}
            </td>
            <td id='scores'>
                ${item.score}
            </td>
            </tr>
            `
            container.innerHTML += tag
        }
    }
    
}
build_board("html");

/* HTML TEST */
let questions = ["Which tag is used to create a caption for a fieldset element ?!" , "To pick only one choice from many radio inputs , They must have the same ..." , "A form is used to ..." , "Where can the script tag be used ?!" , "Can a web page work without title ?!" , "Which one isn't an input type ?!" , "If you want to insert a web page inside your own one , what should you use ?!" , "The canvas tag is used to ..." , "How many style tags can be used in the same page ?!" , "Using <a> tag , to open an url in a new tab , we use ..."] , a = ["marquee" , "name" , "arrange elements" , "in head" , "yes" , "hidden" , "<canvas>" , "run animation" , "unlimited number" , "tab=\"_new\""] , b = ["legend" , "value" , "get data from the user as input" , "in body" , "no" , "button" , "<iframe>" , "draw shapes" , "just one" , "tab=\"_same\""] , c = ["view" , "text" , "show data to the user as output" , "outside both of them" , "depends upon the browser" , "touch" , "<a>" , "develop games" , "depends upon how many head tags exist" , "target=\"_blank\""] , d = ["caption" , "type" , "allow user to use a keyboard" , "all of the above" , "depends upon if it has head or not" , "color" , "<webview>" , "all of the above" , "none of the above" , "target=\"_self\""] , answers = ["2" , "1" , "2" , "4" , "1" , "3" , "2" , "4" , "1" , "3"] , i=0 , score=0;
begin();
function begin(){
    document.getElementById("restart"). style.display="none";
    document.getElementById("div11"). style.display="none";
    document.getElementById("div10"). style.display="block";
    document.getElementById("info"). style.display="block";
    document.getElementById("loader").style.display="block";
    document.getElementById("loader-bar").style.width = "10%";
    document.getElementById("score").textContent="Score : 0";
    i=0;
    score=0;
    document.getElementById("question"). textContent=questions[i];
    document.getElementById("choice1"). textContent=a[i];
    document.getElementById("choice2"). textContent=b[i];
    document.getElementById("choice3"). textContent=c[i];
    document.getElementById("choice4"). textContent=d[i];
    document.getElementById("num"). textContent=i+1;
}

function check()
{
    var id = "answer"+answers[i];
    if(document.getElementById(id).checked)
    {
        score+=10;
        document.getElementById("score"). textContent="Score : "+score;
    }
    for(var x=1;x<5;x++)
    {
        document.getElementById("answer"+x).checked=false;
    }
    i++;
    if(i==10)
    {
        document.getElementById("div10"). style.display="none";
        document.getElementById("info"). style.display="none";
        document.getElementById("loader").style.display="none";
        document.getElementById("div11"). style.display="block";
        document.querySelector("#user_score").value=score;
    }
    document.getElementById("question"). textContent=questions[i];
    document.getElementById("choice1"). textContent=a[i];
    document.getElementById("choice2"). textContent=b[i];
    document.getElementById("choice3"). textContent=c[i];
    document.getElementById("choice4"). textContent=d[i];
    document.getElementById("num"). textContent=i+1;
    var percent = (i+1) * 10;
    document.getElementById("loader-bar").style.width = percent + "%";
}

/* SUBMIT NEW SCORE */
let saveScoreBtn = document.querySelector("#submitscore")
saveScoreBtn.onclick = async () => {
    console.log("start saving the score")
    let user_score = document.querySelector("#user_score").value
    let user_name = document.querySelector("#score_name").value
    let url = domain + "/api/save_score/"
    let data = await fetch(url , {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "board": "html",
            "password": "ahmed0saber",
            "score": parseInt(user_score), // you have to send data with the right datatype
            "name": user_name
        }) 
    })
    document.getElementById("div11"). style.display="none";
    document.getElementById("score").textContent="Score submited";
    document.getElementById("restart"). style.display="block";
}