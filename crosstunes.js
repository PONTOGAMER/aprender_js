
const grid = [  ' ','A','A','A','A','A','A','A','A','A',' ',' ',
                ' ',' ',' ',' ','A',' ',' ',' ',' ',' ',' ',' ',
                ' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',
                ' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',
                ' ',' ',' ',' ',' ',' ','A',' ',' ',' ',' ',' ',
                ' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',
                ' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',
                ' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',
                ' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',
                ' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',
                ' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',
                ' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',
 ]
const size = 12; 

// when clicking backspace focus previous element, only in current word

function crosstunes_input(v) {
    if (v.value.length === 1){
        const next = document.getElementById(parseInt(v.id) +1);
        next.focus()
    }
}
function crosstunes_previous(v){
    const previous = document.getElementById(parseInt(v.id) -1);
    previous.focus()
}


function crosstunes_create_boxes(){
    for(i= 0; i < grid.length; i++){
        let v; 
        if(grid[i] == ' '){
            v = document.createElement('a');
            v.class = "crosstunes_empty_cell"
            document.getElementById
        }else{
            v = document.createElement('input');
            v.className = "crosstunes_normal_cell";
            v.id = i
            v.type = "text";
            v.maxLength = 1;

            //prototype
            v.addEventListener("keydown", (event) => {
                // Only handle normal character input
                if (v.value.length === 1 && (event.key.length === 1 || event.key =="Backspace")) {
                    v.select();
                }
                if (v.value.length === 0 && event.key =="Backspace"){
                    crosstunes_previous(v)
                }
            });

            v.addEventListener("input", () => {
                crosstunes_input(v);
            });

        }
        document.getElementById("crosstunes_space").appendChild(v);
    }
}


function crosstunes_check(){
    const elems = document.getElementsByClassName("");
}