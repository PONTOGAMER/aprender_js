
const grid = [  'S','I','N','D','R','O','M','E',' ',' ',' ',' ',
                ' ',' ',' ',' ','U',' ',' ','M',' ',' ',' ',' ',
                ' ',' ','A',' ','N',' ',' ','I',' ',' ',' ',' ',
                ' ',' ','L',' ','A',' ',' ','N',' ',' ',' ',' ',
                ' ',' ','D',' ','W',' ',' ','E',' ',' ',' ',' ',
                ' ',' ','E',' ','A',' ',' ','M',' ',' ',' ',' ',
                ' ',' ','I',' ','Y',' ',' ',' ',' ',' ',' ',' ',
                ' ',' ','D',' ',' ',' ',' ',' ',' ',' ',' ',' ',
                ' ','T','A','B','L','E','T','O','P','S',' ',' ',
                ' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',
                ' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',
                ' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',
 ]


 //sindrome de cidade pequena (primeira palavra do título), rap god (artista), last friday night (Yeah, we danced on ____), video do almeida (quem está a cantar), 
 //musica do quim barreiros, musica daquele video de gandia?, alguma musica do espama, musica unicamente instrumental (Runaway kanye), video do pirinha (passa-se na noite ___), aquela musica do natal que tao sempre a pedir no grupo (época a que se refere esta musica)

 const size = 12; 
const sounds_source = ["cat-laughing-at-you.mp3", "cat-laughing-at-you.mp3"]
const sounds = [];
for(i = 0; i<sounds_source.length; i++){
    sounds.push(new Audio(sounds_source[i]));
}
const tips = ["1 blablablaemhjwlhwrkl hjwlkrhjwlkhjwlehjlwj","2 blablabla"];
const prototype_words = [[1, 0, 9], [4,1, 10]]; //first number is start index, second number is 0 for horizontal word and 1 for vertical, third number is length
const colors = ["Green","Red"];
const words = [];
prototype_words.forEach((word)=>{
    let temp = [];
    for(i = 0; i< word[2]; i++){
        temp.push(word[0] + ((word[1] * 11)+1) * i);
    }
    words.push(temp);
})
var saved_grid;
if(localStorage.getItem("crosstunes_saved_grid") === null){
    saved_grid = Array(grid.length);
    for(i = 0; i < grid.length; i++){
        saved_grid[i] = '';
    };
}else{
    console.log("ola")
    saved_grid = JSON.parse(localStorage.getItem("crosstunes_saved_grid"));
}
var cur_word = 1; 
var cur_dir = -1; 
var audio_timeout;
// when clicking backspace focus previous element, only in current word
function crosstunes_input(v) {
    console.log("ola")
    saved_grid[parseInt(v.id)] = v.value;
    localStorage.setItem("crosstunes_saved_grid", JSON.stringify(saved_grid))
    v.style.color = "Black";

    if (v.value.length === 1){

        if (!crosstunes_move(v, (4 -cur_dir)%4)){
            crosstunes_change_word((cur_word+1)%words.length);
            const next = document.getElementById(words[cur_word][0]); 
            next.focus()

        }
    }
}

function crosstunes_previous(v){
    crosstunes_move(v, 2-cur_dir )
}

function crosstunes_move(v, dir){
    const next = document.getElementById(parseInt(v.id) + (dir%2  ? 12 : 1) * (dir < 3 && dir >0  ? -1 : 1));
    try{
        next.focus()
    }catch(error){
        
        return false;
    }
    if(dir%2 != cur_dir){
        for(i = 0; i < words.length; i++){
            if(words[i].includes(parseInt(next.id))){
                crosstunes_change_word(i);
            }
        }
    }
    return true;
    
}

async function crosstunes_create_boxes(){
    for(i= 0; i < grid.length; i++){
        let v; 
        if(grid[i] == ' '){
            v = document.createElement('a');
            v.class = "crosstunes_empty_cell";
        }else{
            v = document.createElement('input');
            v.className = "crosstunes_normal_cell";
            v.id = i
            v.type = "text";
            v.maxLength = 1;
            v.style.textTransform = "uppercase"; 
            v.value = saved_grid[i];
            //prototype
            v.addEventListener("keydown", (event) => {
                // Only handle normal character input
                if (v.value.length === 1 && (event.key.length === 1 || event.key =="Backspace")) {
                    v.select();
                }else if (v.value.length === 0 && event.key =="Backspace"){
                    crosstunes_previous(v)
                }

                switch(event.key){
                    case "ArrowRight":
                        crosstunes_move(v,0);
                        break;
                    case "ArrowUp":
                        crosstunes_move(v,1);
                        break;
                    case "ArrowLeft":
                        crosstunes_move(v,2);
                        break;
                    case "ArrowDown":
                        crosstunes_move(v,3);
                        break;
                }
                
            });

            v.addEventListener("input", () => {
                crosstunes_input(v);
            });
            v.addEventListener("click", ()=> {
                let first = null;
                let second = null;
                for(i = 0; i < words.length; i++){
                    if(words[i].includes(parseInt(v.id))){
                        if(first === null){
                            first = i;
                        }else{
                            second = i; 
                        }
                    }
                }
                if(cur_word != first){
                    crosstunes_change_word(first);
                }else if(second != null){
                    crosstunes_change_word(second);
                }
            })


        }
        document.getElementById("crosstunes_space").appendChild(v);
    }
    crosstunes_change_word(0);
    const v = document.getElementById(words[0][0]); 
    v.focus();
    const prev = document.getElementById("crosstunes_previous"); 
    prev.addEventListener("click",()=>{

        crosstunes_change_word((cur_word-1 + words.length)%words.length)
        const next = document.getElementById(words[cur_word][0]); 
        next.focus()
    })
    const next_song = document.getElementById("crosstunes_next"); 
    next_song.addEventListener("click",()=>{
        crosstunes_change_word((cur_word+1)%words.length)
        const next = document.getElementById(words[cur_word][0]); 
        next.focus()
    })
    const play = document.getElementById("crosstunes_play"); 


    play.addEventListener("mousedown",(event)=>{
        if(play.style.backgroundImage == 'url("pause.png")'){
            clearTimeout(audio_timeout)
            sounds[cur_word].pause();
            sounds[cur_word].currentTime = 0; 
            play.style.backgroundImage = "url('play.png')";
        }else{

            play.style.backgroundImage = "url('pause.png')";
            sounds[cur_word].play();
        audio_timeout = setTimeout(()=>{
            play.style.backgroundImage = "url('play.png')";
        },sounds[cur_word].duration *1000)
        }
        event.preventDefault();
    })
    const check = document.getElementById("crosstunes_check");
    check.addEventListener("click", crosstunes_check);
}


async function crosstunes_check(){
    const audio = new Audio('cat-laughing-at-you.mp3');
    const elems = document.getElementsByClassName("crosstunes_normal_cell");
    let correct = true; 
    for(let e of elems){
        if(e.value.toUpperCase() != grid[parseInt(e.id)]){
            if(e.value != '' && e.value != ' '){}
            e.style.color = "Red";
            correct = false;
        }
    }
    if (correct){
        finish(2);
        alert("RESOLVIDO");
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

function crosstunes_change_word(word){
    
    if(word != cur_word){
        clearTimeout(audio_timeout)
        const play = document.getElementById("crosstunes_play");
        play.style.backgroundImage = "url('play.png')"
        sounds[cur_word].pause();
        sounds[cur_word].currentTime = 0;

        cur_word = word;
 
        cur_dir = prototype_words[cur_word][1];
        const elems = document.getElementsByClassName("crosstunes_normal_cell");
        for(const e of elems){
            e.style.backgroundColor = "White";
        }
        words[cur_word].forEach((i)=>{
            const v = document.getElementById(i);
            v.style.backgroundColor = colors[cur_word];
        })
        //change button variables...
        const tip = document.getElementById("crosstunes_tip")
        tip.innerHTML = tips[cur_word]


    }
}