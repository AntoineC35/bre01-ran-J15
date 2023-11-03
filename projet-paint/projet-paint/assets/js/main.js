import html2canvas from 'html2canvas';

function selectColor(event)
{
    let colorBox = event.target;
    let color = colorBox.style.backgroundColor;

    sessionStorage.setItem("selectedColor", color);
}

function getSelectedColor()
{
    if(sessionStorage.getItem("selectedColor"))
    {
        return sessionStorage.getItem("selectedColor");
    }

    return null;
}

function loadPalette(palette)
{
    let colors = palette;
    for (let i=0; i<colors.length; i++) {
        let header = document.querySelector("header");
        let newDiv = document.createElement("div");
        let input = document.createElement("input");
        input.setAttribute("type", "color");
        newDiv.appendChild(input)
        header.appendChild(newDiv);
        let div = document.querySelector(`body > header > div:nth-child(${i + 1})`)
        div.style.backgroundColor = colors[i];
        input.addEventListener("input", function(event){
            div.style.backgroundColor = input.value;
            sessionStorage.setItem("selectedColor", input.value)
        })
    }
}


window.addEventListener("DOMContentLoaded", function(){
    loadPalette(["#22f6f3", "#3daf7e", "#ffffff", "#ec8236", "#a9a7ee", "#ecc606", "#f783f2", "#e89e80", "#33FF80"]);
    
    let selectedColorDivs = document.querySelectorAll('header > div');
    
    selectedColorDivs.forEach(function(div) {
        div.addEventListener("click", function(event) {
            selectColor(event);
            console.log(getSelectedColor());
    });
});

    let selectedCaseToColor = document.querySelectorAll("main > div > div");
        selectedCaseToColor.forEach(function(divToColor) {
    divToColor.addEventListener("click", function(event) {
        let colorToApply = getSelectedColor();
        let currentColor = divToColor.style.backgroundColor;

        if (!currentColor || currentColor === "transparent") {
            divToColor.style.backgroundColor = colorToApply;
        } else {
            divToColor.style.backgroundColor = "transparent";
        }
    });
});

    html2canvas(document.querySelector("#capture")).then(canvas => {
        document.body.appendChild(canvas)
    });

});