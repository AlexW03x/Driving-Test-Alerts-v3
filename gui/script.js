document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("tab1").classList.add("bg-[#5c9c40]");

    eel.loadScriptSettings("hidden", "settings.ini");
})

let tab = 1;

function changeTabs(tabs){
    if(tabs == 1 && tab != 1){
        document.getElementById("tab1").classList.add("bg-[#5c9c40]");
        document.getElementById("tab2").classList.remove("bg-[#5c9c40]");
        document.getElementById("tab3").classList.remove("bg-[#5c9c40]");
        document.getElementById("tab1_panel").classList.remove("w-[0%]", "h-0");
        document.getElementById("tab1_panel").classList.add("w-[100%]", "h-max");
        document.getElementById("tab2_panel").classList.remove("w-[100%]", "h-max");
        document.getElementById("tab2_panel").classList.add("w-[0%]",  "h-0");
        document.getElementById("tab3_panel").classList.remove("w-[100%]", "h-max");
        document.getElementById("tab3_panel").classList.add("w-[0%]",  "h-0");
    }
    else if(tabs == 2 && tab != 2){
        document.getElementById("tab2").classList.add("bg-[#5c9c40]");
        document.getElementById("tab1").classList.remove("bg-[#5c9c40]");
        document.getElementById("tab3").classList.remove("bg-[#5c9c40]");
        document.getElementById("tab2_panel").classList.remove("w-[0%]", "h-0");
        document.getElementById("tab2_panel").classList.add("w-[100%]", "h-max");
        document.getElementById("tab1_panel").classList.remove("w-[100%]", "h-max");
        document.getElementById("tab1_panel").classList.add("w-[0%]",  "h-0");
        document.getElementById("tab3_panel").classList.remove("w-[100%]", "h-max");
        document.getElementById("tab3_panel").classList.add("w-[0%]",  "h-0");
    }
    else if(tabs == 3 && tab != 3){
        document.getElementById("tab3").classList.add("bg-[#5c9c40]");
        document.getElementById("tab2").classList.remove("bg-[#5c9c40]");
        document.getElementById("tab1").classList.remove("bg-[#5c9c40]");
        document.getElementById("tab3_panel").classList.remove("w-[0%]", "h-0");
        document.getElementById("tab3_panel").classList.add("w-[100%]", "h-max");
        document.getElementById("tab1_panel").classList.remove("w-[100%]", "h-max");
        document.getElementById("tab1_panel").classList.add("w-[0%]",  "h-0");
        document.getElementById("tab2_panel").classList.remove("w-[100%]", "h-max");
        document.getElementById("tab2_panel").classList.add("w-[0%]",  "h-0");
    }
    else{
        console.log("incorrect tab value!");
    }
    tab = tabs;
}

let drivingLicense = "";
let postcode = "";
let email = "";
let alerts = false;
let date = "";

function updatevar(type){
    if(type == "license"){
        drivingLicense = document.getElementById("license").value;
        console.log(drivingLicense);
    }
    if(type == "postcode"){
        postcode = document.getElementById("postcode").value;
        console.log(postcode);
    }
    if(type == "email"){
        email = document.getElementById("email").value;
        console.log(email);
    }
    if(type == "alerts"){
        if(document.getElementById("alerts").value == "True" || String(document.getElementById("alerts").value).toLowerCase() == "true"){
            alerts = true;
        }
        else{
            alerts = false;
        }
        console.log(alerts);
    }
    if(type == "date"){
        date = document.getElementById("date").value;
        console.log(date);
    }
}

function saveVar(){
    document.getElementById("success").classList.add("hidden");
    document.getElementById("success").innerHTML = ""; 
    if(drivingLicense.length > 14){
        if(postcode.length > 3){
            if(email.includes("@") && email.includes(".")){
                if(date.includes("-") && date.length > 3){
                    const curDate = new Date().setHours(0, 0, 0, 0);
                    if(curDate < new Date(date)){
                        document.getElementById("error").classList.add("hidden");
                        document.getElementById("error").innerHTML = ""; 
                        document.getElementById("success").classList.remove("hidden");
                        document.getElementById("success").innerHTML = "Proceeding to save..."; 

                        eel.saveScriptSettings(drivingLicense, postcode, email, alerts, date)
                    }
                    else{
                        document.getElementById("error").classList.remove("hidden");
                        document.getElementById("error").innerHTML = "Please select a date ahead of time!";                         
                    }
                }
                else{
                    document.getElementById("error").classList.remove("hidden");
                    document.getElementById("error").innerHTML = "Please select a date!";                    
                }
            }
            else{
                document.getElementById("error").classList.remove("hidden");
                document.getElementById("error").innerHTML = "Please enter a correct email!";
            }
        }
        else{
            document.getElementById("error").classList.remove("hidden");
            document.getElementById("error").innerHTML = "Please enter a postcode!";
        }
    }
    else{
        document.getElementById("error").classList.remove("hidden");
        document.getElementById("error").innerHTML = "Please enter the correct license number!";
    }
}

eel.expose(returnSaveUpdate);
function returnSaveUpdate(value){
    if(value.toLowerCase() == "true"){
        document.getElementById("error").classList.add("hidden");
        document.getElementById("error").innerHTML = "";
        document.getElementById("success").classList.remove("hidden");
        document.getElementById("success").innerHTML = "File saved successfully!"; 
    }
    else{
        document.getElementById("error").classList.remove("hidden");
        document.getElementById("error").innerHTML = "Failed to save file! Try again.";
        document.getElementById("success").classList.add("hidden");
        document.getElementById("success").innerHTML = ""; 
    }
}

eel.expose(returnLoadSaveUpdate);
function returnLoadSaveUpdate(value){
    if(value.toLowerCase() == "true"){
        document.getElementById("error").classList.add("hidden");
        document.getElementById("error").innerHTML = "";
        document.getElementById("success").classList.remove("hidden");
        document.getElementById("success").innerHTML = "Save loaded successfully!"; 
    }
    else{
        document.getElementById("error").classList.remove("hidden");
        document.getElementById("error").innerHTML = "Save is corrupt/incorrect!";
        document.getElementById("success").classList.add("hidden");
        document.getElementById("success").innerHTML = ""; 
    }
}

eel.expose(loadScriptSave)
function loadScriptSave(){

}

function loadSave(){
    eel.loadFromFile("show", "");
}

eel.expose(updateNewSettings);
function updateNewSettings(var1, var2, var3, var4, var5){
    drivingLicense = var1;
    postcode = var2;
    email = var3;
    alerts = var4;
    date = var5;
    console.log(drivingLicense + "\n" + postcode + "\n" + email + "\n" + alerts + "\n" + date);

    document.getElementById("license").value = drivingLicense;
    document.getElementById("postcode").value = postcode;
    document.getElementById("email").value = email;
    document.getElementById("alerts").value = alerts;
    document.getElementById("date").value = date;
}