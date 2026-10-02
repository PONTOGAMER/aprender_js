function teste(){
    let result = "";
    if (localStorage.getItem("connections") == '1'){
        result = result + "A S "
    }else{
        result = result + "_ _ "
    }
    if (localStorage.getItem("crosstunes") == '1'){
        result = result + "D F "
    }else{
        result = result + "_ _ "
    }
    if (localStorage.getItem("mini") == '1'){
        result = result + "G H"
    }else{
        result = result + "_ _"
    }    
    document.getElementById("final_button").innerHTML = result;  
    console.log(result);
}

function refresh(){
    localStorage.clear();


}

function finish(arg){
    if (arg == 1){ 
        localStorage.setItem("connections",'1');
    }else if (arg == 2){ 
        localStorage.setItem("crosstunes",'1');
    }else{ 
        localStorage.setItem("mini",'1');
    }
}

function redirect_final(){
    if (document.getElementById("final_button").innerHTML == "A S D F G H"){
        window.location.href = "ASDFGH.html"
    } 
}


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}