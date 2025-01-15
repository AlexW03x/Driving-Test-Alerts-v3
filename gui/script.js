document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("tab1").classList.add("bg-[#5c9c40]");
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