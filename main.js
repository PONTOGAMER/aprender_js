function teste(){
    let result = "";
    if (localStorage.getItem("connections") == '1'){
        result = result + "PA"
    }else{
        result = result + "__"
    }
    if (localStorage.getItem("crosstunes") == '1'){
        result = result + "RA"
    }else{
        result = result + "__"
    }
    if (localStorage.getItem("mini") == '1'){
        result = result + "BÉNS"
    }else{
        result = result + "____"
    }    
    document.getElementById("final_button").innerHTML = result;  
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
    if (document.getElementById("final_button").innerHTML == "PARABÉNS"){
        window.location.href = "PARABÉNS.html"
    } 
}


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}