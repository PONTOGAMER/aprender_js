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
            v.type = "text";
            v.maxLength = 1;

        }
        document.getElementById("crosstunes_space").appendChild(v);
    }
}