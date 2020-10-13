
var tot = 0;
var arrp= [];

document.addEventListener('load',view_cats());

function view_cats(){
    var selectCat = document.getElementById('select_category');
    fetch('https://opentdb.com/api_category.php')
    .then((resp) =>{ return resp.json() })
    .then((resp)=>{
        console.log(resp);
        resp.trivia_categories.forEach((categories) =>{
            selectCat.innerHTML += `<option value='${categories.id}'>${categories.name}</option>`;
        });
    });
}

function genera(){
    arrp = [];
    var amount = document.getElementById('amount').value;
    var categor= document.getElementById('select_category').value;
    var dificul= document.getElementById('select_dific').value;
    var tipo = document.getElementById('select_tipe').value;

    fetch('https://opentdb.com/api.php?amount='+amount+'&category='+categor+"&type="+tipo+"&difficulty="+dificul)
    .then(response => response.json())
    .then(data => printCards(data));
    
}

function printCards(questions){
    const container = document.getElementById('container');
    container.innerHTML = '';
    //Print a cards with bootstrap
    console.log(questions);
    var id = 0;
    questions.results.forEach((question) => {
        const card = creatCard(question,id);
        container.innerHTML += card;
        id++;
    });
    const boton = `<button class="btn btn-success" onclick="getResult()">Calificar</button>`;
    container.innerHTML += boton;
}

function creatCard(question,id){
    const card = `<div class="card col-12 col-md-12 col-lg-12 col-sm-12" >
                    <div class="card-body">
                    <h5 class="card-title">${question.question}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Category:${question.category}</h6>
                    ${returnAnswersHTML(question.correct_answer,question.incorrect_answers,id)}
                    </div>
                </div>`;
    return card;
}

function returnAnswersHTML(correct,incorrects,id){
    var j = 0;
    var iscorrect = false;
    var indexIsCorrect = 0;
    var arrquestions = [];
    var tot = incorrects.length;
    for(var i = 0; i <= tot; i++){
        let random = Math.random(Math.floor(4))*10;
        if(random > 6 && iscorrect == false){
            arrquestions.push(correct);
            iscorrect = true;
            indexIsCorrect = i;
        }else if(i+1 > tot && iscorrect == false){
            arrquestions.push(correct);
            iscorrect = true;
            indexIsCorrect = i;
        }else{
            arrquestions.push(incorrects[j]);
            j++;
        }
    }
    var answers = '';
    j = 0;
    arrquestions.forEach((results) => {
        if(j != indexIsCorrect){
            let viewquest = `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="question_${id}" id="reps_${id}_${j}" value="${results}" onclick="changeScore(0,${id})">
                <label class="form-check-label" for="reps_${id}_${j}">
                    ${results}
                </label>
            </div>`;
            
            answers += viewquest;
        }else{
            let viewquest = `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="question_${id}" id="reps_${id}_${j}" value="${results}" onclick="changeScore(1,${id})">
                <label class="form-check-label" for="reps_${id}_${j}">
                    ${results}
                </label>
            </div>`;

            answers += viewquest;
        }
        j++;
    });

    return answers;
}
function changeScore(value,id){
    arrp[id] = value;

    tot = 0;
    arrp.forEach((res)=>{
        tot += res;
    });
    console.log(arrp);
    console.log(tot);
}

function getResult(){
    alert("Tu calificacion es:"+tot);
}