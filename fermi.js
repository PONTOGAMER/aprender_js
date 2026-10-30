
const questions = ["Quantas chamadas é que o Afonso tem que com o Dinis desde de 19 de Janeiro de 2026 até 29 de Outubro de 2026 (contando não atendidas)?", "Quantas músicas têm todos os albuns de Niall Horan? ", "Desde que a professora Carla Carmelo Rosa começou a lecionar aulas teóricas a Eletromagnetismo I no ano letivo 2023/2024, quantos alunos reprovaram à cadeira (não conta não avaliados)?"];

var changing = false;

const answers = [604, 51, 197];

const colors = ["rgb(255, 94, 58)", "rgb(78, 107, 255)", "rgb(23, 195, 123)","white"];
const contrast_color = ["rgb(255, 149, 125)", "rgb(138, 157, 255)", "rgb(102, 215, 168)", "gray"];
const darker_color = ["rgb(188, 59, 30)", "rgb(49, 74, 201)", "rgb(20, 161, 102)", "gray"]

const next_button = ["Pergunta 2", "Pergunta 3", "Resultados"];

var cur_displayed = 0;
var stats = [-1,-1,-1];
var intervalId;
function fermi_start(){
    const audio = new Audio('cat-laughing-at-you.mp3');

    cur_displayed = parseInt(localStorage.getItem("cur_displayed")); 
    if (isNaN(cur_displayed)){
        cur_displayed = 0; 
        localStorage.setItem("cur_displayed", 0);
        localStorage.setItem("stats", JSON.stringify(stats));
    }
    stats = JSON.parse(localStorage.getItem("stats"));

    fermi_display(false);
    const elems = document
        .getElementById("fermi_mini_nav_bar")
        .querySelectorAll(".fermi_nav_bar_content");

    elems.forEach((elem, i) => {
        elem.addEventListener("click", () => {
            cur_displayed = i;
            fermi_display(true);
        });
    });
    const submit = document.getElementById("fermi_submit");
    submit.addEventListener("click", fermi_validate_guess);

    const guess_box = document.getElementById("fermi_guess_box");
    guess_box.addEventListener("input", ()=>{
        guess_box.value = guess_box.value.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    })

    const calc = document.getElementById("fermi_calculator");
    calc.addEventListener("click",()=>{

        audio.play();
        const img = document.getElementById("imagem");
        
        
        img.style.display = "block"; 
        setTimeout(()=>{
            
            img.style.opacity = "0";
        },0)

        setTimeout(()=>{
            
            img.style.opacity = 1;
            img.style.display = "none"; 
        },3000)
        
    })


    }
function fermi_display(anim){
    clearInterval(intervalId)
    localStorage.setItem("cur_displayed", cur_displayed);
    localStorage.setItem("stats", JSON.stringify(stats));
    const base = document.getElementById("fermi_main_box");
    const hideable_elems = base.querySelectorAll(":scope > .hideable")
    const submit = document.getElementById("fermi_submit");

    submit.style.backgroundColor = darker_color[cur_displayed];

    const elems = document
        .getElementById("fermi_mini_nav_bar")
        .querySelectorAll(".fermi_nav_bar_content");

    elems.forEach((elem, i) => {
        if(i == cur_displayed){
            elem.classList.add("disabled_button");
        }else{
            elem.classList.remove("disabled_button");
        }
    });
    for(elem of hideable_elems){
        elem.style.display = "none";
    }
            base.style.backgroundColor = colors[cur_displayed];
    if(cur_displayed == 3){ //results
        submit.style.display = "none";
        const result = (Math.max(answers[0]/stats[0], stats[0]/answers[0]) + Math.max(answers[1]/stats[1], stats[1]/answers[1]) + Math.max(answers[2]/stats[2], stats[2]/answers[2])) / 3
        console.log(result);
        const final_score = document.getElementById("fermi_final_score");
        final_score.style.display = "flex";
        final_score.innerHTML = result.toFixed(2) + "×";
        document.getElementById("fermi_meme_final_image").style.display = "flex";
        finish(3);
    }else{ 
        
        submit.style.display = "flex"
        if(stats[cur_displayed] == -1){ //no stat, means that question wasnt solved
            const question = document.getElementById("fermi_question");
            const guess_box = document.getElementById("fermi_guess_box");
            const calc = document.getElementById("fermi_calculator");

            calc.style.display = "block"
            question.style.display = "flex";
            question.innerHTML = questions[cur_displayed];
            guess_box.style.display = "block";
            submit.innerHTML = "Submit";
            guess_box.style.backgroundColor = contrast_color[cur_displayed];
            calc.style.backgroundColor = darker_color[cur_displayed];

        }else{ //answer
            const compare_numbers = document.getElementById("fermi_compare_numbers");
            compare_numbers.style.display = "flex";
            guess = document.getElementById("fermi_guess");
            answer = document.getElementById("fermi_answer");
            ratio = document.getElementById("fermi_ratio");
            guess.innerHTML = "Guess: "+stats[cur_displayed];
            guess.style.backgroundColor = contrast_color[cur_displayed];
            answer.style.backgroundColor = darker_color[cur_displayed];
            ratio.style.backgroundColor = darker_color[cur_displayed];
            guess.style.color = "black";
            answer.style.color = "white";
            ratio.style.color = "white";
            answer.innerHTML = "Answer: "+answers[cur_displayed];
            let temp = Number.parseFloat(stats[cur_displayed] / answers[cur_displayed]);
            let digits;
            if(temp <= 0.01 || temp >= 100){
                digits = 0;
            }else if(temp <= 0.1 || temp >= 10){
                digits = 1;
            }else{
                digits = 2;
            }
            if(temp < 1){
                number_smooth_transition(ratio, 500, 0, (1/temp), digits, "", "× Too low"); 
            }else if (temp >1){
                number_smooth_transition(ratio, 500, 0, (temp), digits, "", "× Too high"); 
            }else{
                number_smooth_transition(ratio, 500, 0, 1, digits, "", "×"); 
                //meter animação qualquer aqui
            }
            
            fermi_build_graph();
            submit.innerHTML = next_button[cur_displayed];
        }
    }

}

function fermi_validate_guess(){
    if(stats[cur_displayed] == -1){ //not yet answered, need to validate guess
        const guess_box = document.getElementById("fermi_guess_box");
        const guess = Number(guess_box.value.replace(/\s/g, ""))
        if(isNaN(guess) || guess == "" || guess < 0){
            alert("Introduza um número positivo")
        }else{
            stats[cur_displayed] = guess;
            guess_box.value = "";
            fermi_display(true);
        }
    }else{ 
        if (cur_displayed == 2 && (stats[0] == -1 || stats[1] == -1)){
            alert("Convém acabar as outras perguntas");
        }else{
            cur_displayed++;
            fermi_display(true);
        }

    }

    
}
function fermi_build_graph(){
    const graph = document.getElementById("fermi_graph");
    graph.style.display = "grid";
    graph.innerHTML = '';
    for(i = 0; i < 21; i++){
        let bar = document.createElement("div");
        bar.className = "fermi_graph_bar";
        let n = Math.random()*100;
        bar.style.height = "0px";
            setTimeout(()=>{
 bar.style.height = Math.round(n)+ "%";},10);


        bar.style.backgroundColor = contrast_color[cur_displayed];
        graph.appendChild(bar);
    }
    line = document.createElement("div");
    line.id = "fermi_graph_line";
    let ratio = Number.parseFloat(stats[cur_displayed] / answers[cur_displayed]);
    if (ratio == 1){
        pos = 10;
    }else if( ratio <= 0.1){
        pos = 0;
    }else if(ratio >= 10){
        pos = 20;
    }else if(ratio < 1){
        pos = 11- Math.round(1/ratio) ;
    }else {
        pos = 9 + Math.round(ratio);
    }
    
    line.style.left = (window.innerWidth - 380) /2 + 19   + 7 +pos*16.4+ "px"; 
    line.style.height = "0px";
    setTimeout(()=>{
line.style.height = "190px";},0);
    graph.appendChild(line);
}

function number_smooth_transition(elem, time, start, end, digits, beforeText, afterText){ //times is in milisencond
    let step = digits == 2 ? 0.01 : digits == 1 ? 0.1 : 10**(Math.round(end -start).toString().length -3)
    let interval = time *step / (end -start);
    intervalId = setInterval(()=>{
        elem.innerHTML = beforeText + start.toFixed(digits) + afterText;
        start += step; 
        if(start>= end){ 
            elem.innerHTML = beforeText + end.toFixed(digits) + afterText
            clearInterval(intervalId);
        }
    }, interval);
    
    
     
}









//número de reels já enviados pelo email para o grupo "tocar nos menores"
//