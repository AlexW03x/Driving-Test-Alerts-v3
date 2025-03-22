document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("tab1").classList.add("bg-[#5c9c40]");

    eel.loadScriptSettings("hidden", "settings.ini");
    eel.loadAppSettings()
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
let theme = "";
let time = 5;

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
    if(type == "time"){
        time = document.getElementById("cooldownTimer").value;
        console.log(time);
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

eel.expose(updateApp);
function updateApp(var1){
    theme = var1;

    if(String(theme).toLowerCase() == "light mode"){
        document.getElementById("theme").value = "Light Mode";
    }
    else{
        document.getElementById("theme").value = "Dark Mode";
    }
}

let autorun = false;
function enableAutoRun(){
    if(autorun == false){
        document.getElementById("autorunBtn").innerHTML = "✅";
        autorun = true;
    }   
    else{
        document.getElementById("autorunBtn").innerHTML = "❌";
        autorun = false;
    }
}

eel.expose(saveOthers);
function saveOthers(){
    let theme = document.getElementById("theme").value;

    eel.saveAppSettings(theme);
}

eel.expose(saveOthersCheck);
function saveOthersCheck(passed){
    if(String(passed) == "true"){
        document.getElementById("error2").classList.add("hidden");
        document.getElementById("error2").innerHTML = "";
        document.getElementById("success2").classList.remove("hidden");
        document.getElementById("success2").innerHTML = "File saved successfully!";         
    }
    else{
        document.getElementById("error2").classList.remove("hidden");
        document.getElementById("error2").innerHTML = "Failed to save file!";
        document.getElementById("success2").classList.add("hidden");
        document.getElementById("success2").innerHTML = ""; 
    }
}

let scriptLaunch = false;

eel.expose(beginScript);
function beginScript(){
    if(drivingLicense == "" || postcode == "" || date == "" || email == ""){
        document.getElementById("script_status").innerHTML = "Incorrect Settings!";
        document.getElementById("script_status").classList.remove("text-blue-200");
        document.getElementById("script_status").classList.add("text-red-200");
    }
    else{
        document.getElementById("script_status").innerHTML = "Launching...!";
        document.getElementById("script_status").classList.remove("text-red-200");
        document.getElementById("script_status").classList.add("text-blue-200");

        if(scriptLaunch == false){
            eel.launchScript(drivingLicense, postcode, date, autorun, time);
            scriptLaunch = true;
        }
        else{
            console.log("Script is already running!");
            eel.printStatement("Script is already running!");
        }
    }
}

eel.expose(scriptLaunchChange);
function scriptLaunchChange(bool){
    scriptLaunch = bool == "False" ? false : true;
}

eel.expose(updateStatus);
function updateStatus(statusText, statusColourToRemove, statusColourToAdd){
    let ss = document.getElementById("script_status");
    ss.innerHTML = statusText;
    ss.classList.remove(statusColourToRemove);
    ss.classList.add(statusColourToAdd);
}
