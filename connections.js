


const connections_base_words = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'] /* Since connections_words is altered, map has to stay the same, so its easier to maintain the original words also */

// Sinónimo de dinis: drama queen, vini, condições, kiwi
// Cenas desagradaveis de se perder: jogo, cartão, cabelo, meia;
// Partes do menu de criação de personagens The Sims: nome, idade, voz, andar
// A ver com nomes de professores secundario: amando, calos, lisão, aula



var connections_words = JSON.parse(localStorage.getItem("connections_words"));
if (connections_words == null){
    connections_words = connections_base_words.slice()
    connections_shuffle();
}

const connections_categories = new Map()
for(i = 0; i < 16; i++){
    connections_categories.set(connections_base_words[i], Math.floor(i/4) +1)
}

const connections_categories_styles = [["1", "yellow"],["2", "green"],["3", "blue"],["4", "purple"]]

solved = JSON.parse(localStorage.getItem("connections_solved"))
if (solved == null){
    solved = []
}


function connections_disable_shuffle(){
    const button_shuffle = document.getElementById("connections_shuffle_button");
    button_shuffle.disabled = true;
    setTimeout(function(){button_shuffle.disabled = false;},500);

}






function connections_create_boxes(){
    const button_shuffle = document.getElementById("connections_shuffle_button");
    button_shuffle.addEventListener("click",connections_disable_shuffle);




    for(i = 0; i < solved.length; i++){
        document.getElementById("connections_text_coiso").style.display = "block";
        var v = document.createElement('a'); 
        v.className = 'connections_solved_cat';
        v.innerHTML = connections_categories_styles[solved[i]][0];
        v.style.backgroundColor = connections_categories_styles[solved[i]][1];       
        v.style.gridRow = i+1;
        document.getElementById('connections_space').appendChild(v);       
    }
    for (i = 0; i < 16 - solved.length *4; i++){
        var v = document.createElement('button'); 
        v.className = 'connections_buttons';
        document.getElementById('connections_space').appendChild(v);
        v.addEventListener("click", function(){connections_click_button(this, true);})  
    }
        connections_set_words();


    if (solved.length == 4){
        alert("RESOLVIDO")
        finish(1);
    }
}


var selec = [];



const animation_time = 250;

function connections_click_button(b, animate = false){
    /* to be implemented: fading */
    if (b.className == "connections_buttons"){
        b.classList.remove("connections_buttons");
        b.classList.add("connections_buttons_selected");
        selec.push(b.innerHTML); 
        
        if (selec.length == 4){
            let elems = document.getElementsByClassName('connections_buttons');
            for(let i = 0; i < elems.length; i++){
                elems[i].style.pointerEvents = "none";
            }
            document.getElementById('connections_submit').style.backgroundColor = "white";
            document.getElementById('connections_submit').style.pointerEvents = "auto";
        }
    }else{
        b.classList.remove("connections_buttons_selected");
        b.classList.add("connections_buttons");
        selec.splice(selec.indexOf(b.innerHTML), 1)
        if (selec.length == 3){
            let elems = document.getElementsByClassName('connections_buttons');
            for(let i = 0; i < elems.length; i++){
                elems[i].style['pointer-events'] = "auto";
            }
            document.getElementById('connections_submit').style.backgroundColor = "gray";
            document.getElementById('connections_submit').style.pointerEvents = "none";
        }
    }
    if (animate) {
        // Force the browser to reset the animation
        void b.offsetWidth;

        b.classList.add("connections_select_animation");
        b.classList.add("disabled_button");
        b.addEventListener(
            "animationend",
            () => {
                b.classList.remove("connections_select_animation");
                b.classList.remove("disabled_button");
            },
            { once: true }
        );
    }
    
}
    async function connections_submit(){
        const audio = new Audio('cat-laughing-at-you.mp3');
         //load audio faster maybe
        console.log("submit")
        const counts = {};
        var num;

        const elems = document.getElementById('connections_space').querySelectorAll("button");
        for (const elem of elems){
            if (selec.includes(elem.innerHTML)){
                void elem.offsetWidth;

                elem.classList.add("connections_select_animation");
                elem.classList.add("disabled_button");
                elem.addEventListener(
                    "animationend",
                    () => {
                        elem.classList.remove("connections_select_animation");
                        elem.classList.remove("disabled_button");
                    },
                    { once: true }
                );
                await sleep(200); 
            }
            
        }
        for(i = 0; i < 4; i++){
            num = connections_categories.get(selec[i]);
            counts[num] = (counts[num] || 0) +1
        }
        const frequencies = Object.values(counts);
        if (frequencies.includes(4)){
            
            solved.push(num-1) 
            let search_index = 4;
            for(i = 0; i < 4; i++){ /* moves the non selected elements in first row, to future empty postions, minimizes changes in layout */
                if (!selec.includes(connections_words[i])){
                    while(search_index < connections_words.length){
                        if (selec.includes(connections_words[search_index])){
                            connections_words[search_index] = connections_words[i];
                            search_index+=1;
                            break;
                        }
                        search_index+=1;
                    }
                }
                
            }
            connections_words.splice(0, 4)
            localStorage.setItem("connections_words", JSON.stringify(connections_words))
            localStorage.setItem("connections_solved", JSON.stringify(solved))
            window.location.reload(); 
        }else if (frequencies.includes(3)){
            alert("one away")
        }else{
            
            audio.play();
            const img = document.getElementById("imagem");
            img.style.display = "block"; 
            
            await sleep(100) 
            img.style.opacity = "0";

            await sleep(3000)
            img.style.display = "none"; 
            img.style.opacity = 1;

            

        }

}

function connections_shuffle(){
    let words = connections_words;
    let currentIndex = words.length;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [words[currentIndex], words[randomIndex]] = [
        words[randomIndex], words[currentIndex]];
    }
    localStorage.setItem("connections_words", JSON.stringify(connections_words))

}
function connections_set_words(){

    console.log(connections_words);
    let elems = document.getElementById('connections_space').querySelectorAll("button");
    let selec_copy = selec.slice();
    for(let i = 0; i < elems.length; i++){
        if(elems[i].classList.contains("connections_buttons_selected")){
            connections_click_button(elems[i])
        }
        elems[i].innerHTML = connections_words[i];
    }
    /*
    for(let i = 0; i < elems.length; i++){
        elems[i].innerHTML = connections_words[i];
    }*/
    for(let i = 0; i < elems.length; i++){
            if (selec_copy.includes(connections_words[i])){
            connections_click_button(elems[i], true)
        }
    }

    
    
}
