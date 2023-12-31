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

function chooseGridTemplate(numberRow, numberCol) {
    let header = document.querySelector("header");
    let grid = document.querySelector("main")
    for (let i=0; i<numberRow; i++){
        let row = document.createElement("div")
        row.setAttribute("class", `row-${i}`)
        for (let y=0; y<numberCol; y++) {
            let col = document.createElement("div")
            col.setAttribute("class", `col-${y}`);
            row.appendChild(col)
        }
        grid.appendChild(row)
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
        
    let submitTableau = document.getElementById("submitTableau")
    let numberOfCol = document.getElementById("numberOfCol");
    let numberOfRow = document.getElementById("numberOfRow");
    submitTableau.addEventListener("click", function(event) {
    event.preventDefault();
    let oldDiv = document.querySelectorAll("main > div");
    for (let i = oldDiv.length - 1; i >= 0; i--) {
  oldDiv[i].remove();
}
     chooseGridTemplate(numberOfRow.value, numberOfCol.value);
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
    })
    
});