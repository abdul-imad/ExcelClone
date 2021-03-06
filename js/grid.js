const leftCol = document.querySelector(".left-col");
const topRow = document.querySelector(".top-row");

const grid = document.querySelector(".grid");

const addressField = document.querySelector(".address-feild");

const charStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const fontElem = document.querySelector(".fonts");
const fontSizeElem = document.querySelector(".font-size");

const boldBtn = document.querySelector(".bold");
const italicBtn = document.querySelector(".italic");
const underlineBtn = document.querySelector(".underline");

const fontColorInputBtn = document.querySelector("#font-color-btn");
const cellColorInputBtn = document.querySelector("#bg-color-btn");
const fontColorBtn = document.querySelector("#hoverOnFontColorBtn");
const cellColorBtn = document.querySelector("#hoverOnCellColorBtn");

const leftBtn = document.querySelector(".left");
const centerBtn = document.querySelector(".center");
const rightBtn = document.querySelector(".right");

const allAlignBtns = document.querySelectorAll(".align");

const formulaBar = document.querySelector(".formula-feild");

const pageLoadImg = document.querySelector(".page-load");


// creating top row A-Z
for (let i = 0; i < charStr.length; i++) {
	let eachRow = document.createElement("div");
	eachRow.innerText = charStr[i];
	eachRow.setAttribute("class", "cell");
	eachRow.classList.add("each-top-col");
	topRow.appendChild(eachRow);
}

// creating left col 1-100
for (let i = 0; i < 100; i++) {
	let eachCol = document.createElement("div");
	eachCol.innerText = i + 1;
	eachCol.setAttribute("class", "box");
	eachCol.style.backgroundColor = "lightgray";
	leftCol.appendChild(eachCol);
}

//creating 2d grid excel sheet
for (let i = 0; i < 100; i++) {
	let rowCell = document.createElement("div");
	rowCell.setAttribute("class", "row");
	for (let j = 0; j < 26; j++) {
		let colCell = document.createElement("div");
		// colCell.innerText = `${charStr[j]} , ${i + 1}`;
		colCell.setAttribute("class", "cell");
		colCell.setAttribute("rid", i);
		colCell.setAttribute("cid", j);
		colCell.setAttribute("contenteditable", "true");
		rowCell.appendChild(colCell);
	}
	grid.appendChild(rowCell);
}
// creating sheetDB
let addSheetsBtn = document.querySelector(".add_sheets_btn-container");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let sheetArr = [];

let sheetDB;

firstSheet.addEventListener("click", sheetClick);
firstSheet.click();

addSheetsBtn.addEventListener("click", () => {
	let allSheets = document.querySelectorAll(".sheet");
	let lastSheet = allSheets[allSheets.length - 1];
	let lastIdx = lastSheet.getAttribute("idx");
	lastIdx = Number(lastIdx);
	let newSheet = document.createElement("div");
	newSheet.setAttribute("class", "sheet");
	newSheet.setAttribute("idx", `${lastIdx + 1}`);
	newSheet.innerText = `Sheet ${lastIdx + 2}`;
	sheetList.appendChild(newSheet);
	for (let i = 0; i < allSheets.length; i++) {
		allSheets[i].classList.remove("active");
	}
	newSheet.classList.add("active");
    createSheet();
    // 3d array -> sheetDB
    // current db sheet change
    sheetDB = sheetArr[lastIdx+1];
    setUI();

	newSheet.addEventListener("click", sheetClick);
});

function sheetClick(e) {
	let sheet = e.currentTarget;
	allSheets = document.querySelectorAll(".sheet");
	for (let i = 0; i < allSheets.length; i++) {
		allSheets[i].classList.remove("active");
	}
	sheet.classList.add("active");
	let idx = sheet.getAttribute("idx");
	if (!sheetArr[idx]) {
		createSheet();
	}
	sheetDB = sheetArr[idx];
    if(sheetArr[idx])
	setUI();
}

function createSheet(){
    let newDB = [];
    for (let i = 0; i < 100; i++) {
        let row = [];
        for (let j = 0; j < 26; j++) {
            cellObj = {
                bold: "normal",
                italic: "normal",
                underline: "none",
                font: "sans-serif",
                fontSize: "16",
                align: "left",
                textColor: "#000000",
                backgroundColor: "#ffffff",
                value: "",
                formula: "",
                children: []
            };
            let elem = document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
            elem.style.fontWeight = "normal";
            elem.style.fontStyle = "normal";
            elem.style.textDecoration = "none";
            elem.style.fontFamily = "sans-serif";
            elem.style.fontSize = "16px";
            elem.style.textAlign = "left";
            elem.style.color = "black";
            elem.style.backgroundColor = "white";
            elem.innerText = "";
            row.push(cellObj);
        }
        newDB.push(row);
    }
    sheetArr.push(newDB);
}
console.table(sheetArr)

function setUI() {
	for (let i = 0; i < 100; i++) {
		for (let j = 0; j < 26; j++) {
            let cell = document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
            let cellData = sheetDB[i][j];
            cell.style.fontWeight = cellData.bold;
			cell.style.fontStyle =cellData.italic;
			cell.style.textDecoration =cellData.underline;
			cell.style.fontFamily = cellData.font;
			cell.style.fontSize = cellData.fontSize + "px";
			cell.style.textAlign = cellData.align;
			cell.innerText = cellData.value;
			cell.style.color = cellData.textColor;
			cell.style.backgroundColor = cellData.backgroundColor;
        }
	}
}

window.addEventListener("load", () => {
    setTimeout(() => {
        pageLoadImg.remove();
    },1000);
})

// reading cell address on clicking and displaying on address field
let gridCells = document.querySelectorAll(".grid .cell");
for (let i = 0; i < gridCells.length; i++) {
	gridCells[i].addEventListener("click", () => {
		let rid = Number(gridCells[i].getAttribute("rid"));
		let cid = Number(gridCells[i].getAttribute("cid"));
		addressField.value = `${charStr[cid]}${rid + 1}`;
		let cellObj = sheetDB[rid][cid];

        //value


        // font family
        fontElem.value = cellObj.font;

        // font size
        fontSizeElem.value = cellObj.fontSize;

        // biu btns
		if (cellObj.bold === "normal") {
			boldBtn.classList.remove("biu-active-btn");
		} else {
			boldBtn.classList.add("biu-active-btn");
		}
		if (cellObj.italic === "normal") {
			italicBtn.classList.remove("biu-active-btn");
		} else {
			italicBtn.classList.add("biu-active-btn");
		}
		if (cellObj.underline === "none") {
			underlineBtn.classList.remove("biu-active-btn");
		} else {
			underlineBtn.classList.add("biu-active-btn");
		}

        // alignment btns
		for (let i = 0; i < allAlignBtns.length; i++) {
			allAlignBtns[i].classList.remove("alignment-active");
		}
		if (cellObj.align == "left") {
			// left active
			leftBtn.classList.add("alignment-active");
		} else if (cellObj.align == "right") {
			// right active
			rightBtn.classList.add("alignment-active");
		} else if (cellObj.align == "center") {
			// center active
			centerBtn.classList.add("alignment-active");
		}

        if(cellObj.formula){
            formulaBar.value = cellObj.formula;
        }
        else{
            formulaBar.value = "";
        }
	});
}
gridCells[0].focus();
addressField.value = "A1";

// Menu Container
function getIds(addr) {
	let rid = Number(addr.charCodeAt(0)) - 65;
	let cid = Number(addr.substring(1)) - 1;
	return { rid: rid, cid: cid };
}

// selecting font
let fonts = document.querySelector(".fonts");
fonts.addEventListener("change", () => {
	let val = fonts.value;
	let uiCellElement = findUICellElement();
    let rid = uiCellElement.getAttribute("rid");
    let cid = uiCellElement.getAttribute("cid");
    let cellObj = sheetDB[rid][cid];
    cellObj.font = val;
	uiCellElement.style.fontFamily = val;
});

// selecting font size
// let fontSizeElem = document.querySelector(".font-size");
fontSizeElem.addEventListener("change", function () {
	let val = fontSizeElem.value;
	let uiCellElement = findUICellElement();
    let rid = uiCellElement.getAttribute("rid");
    let cid = uiCellElement.getAttribute("cid");
    let cellObj = sheetDB[rid][cid];
    cellObj.fontSize = val;
	uiCellElement.style.fontSize = val + "px";
});

function findUICellElement() {
	let address = addressField.value;
	let ricidObj = getRIDCIDfromAddress(address);
	let rid = ricidObj.rid;
	let cid = ricidObj.cid;
	let uiCellElement = document.querySelector(
		`.cell[rid="${rid}"][cid="${cid}"]`
	);
	return uiCellElement;
}

function getRIDCIDfromAddress(address) {
	let cid = Number(address.charCodeAt(0)) - 65;
	let rid = Number(address.slice(1)) - 1;
	return { rid: rid, cid: cid };
}

// left align
leftBtn.addEventListener("click", (e) => {
	let address = addressField.value;
	let { rid, cid } = getRIDCIDfromAddress(address);
	let cellElem = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
	cellElem.style.textAlign = "left";
	for (let i = 0; i < allAlignBtns.length; i++) {
		allAlignBtns[i].classList.remove("alignment-active");
	}
	leftBtn.classList.add("alignment-active");
	let cellObj = sheetDB[rid][cid];
	cellObj.align = "left";
})
// right align
rightBtn.addEventListener("click", (e) => {
	let address = addressField.value;
	let { rid, cid } = getRIDCIDfromAddress(address);
	let cellElem = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
	cellElem.style.textAlign = "right";
	for (let i = 0; i < allAlignBtns.length; i++) {
		allAlignBtns[i].classList.remove("alignment-active");
	}
	rightBtn.classList.add("alignment-active");
	let cellObj = sheetDB[rid][cid];
	cellObj.align = "right";
})
// center align
centerBtn.addEventListener("click", (e) => {
	let address = addressField.value;
	let { rid, cid } = getRIDCIDfromAddress(address);
	let cellElem = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
	cellElem.style.textAlign = "center";
	for (let i = 0; i < allAlignBtns.length; i++) {
		allAlignBtns[i].classList.remove("alignment-active");
	}
	centerBtn.classList.add("alignment-active");
	let cellObj = sheetDB[rid][cid];
	cellObj.align = "center";
})

// text formatting BIU
let fontFormatArr = ["bolder", "italic", "underline"];
let fontFormat = document.querySelectorAll(".biu");
for (let i = 0; i < fontFormat.length; i++) {
	fontFormat[i].addEventListener("click", () => {
		let uiCellElement = findUICellElement();
		let rid = uiCellElement.getAttribute("rid");
		let cid = uiCellElement.getAttribute("cid");
		let cellObj = sheetDB[rid][cid];
		if (i == 0) {
			if (cellObj.bold === "normal") {
				cellObj.bold = "bolder";
				fontFormat[i].classList.add("biu-active-btn");
				uiCellElement.style.fontWeight = "bolder";
			} else {
				cellObj.bold = "normal";
				fontFormat[i].classList.remove("biu-active-btn");
				uiCellElement.style.fontWeight = "normal";
			}
		} else if (i == 1) {
			if (cellObj.italic === "normal") {
				cellObj.italic = "italic";
				fontFormat[i].classList.add("biu-active-btn");
				uiCellElement.style.fontStyle = "italic";
			} else {
				cellObj.italic = "normal";
				fontFormat[i].classList.remove("biu-active-btn");
				uiCellElement.style.fontStyle = "normal";
			}
		} else if (i == 2) {
			if (cellObj.underline === "none") {
				cellObj.underline = "underline";
				fontFormat[i].classList.add("biu-active-btn");
				uiCellElement.style.textDecoration = "underline";
			} else {
				cellObj.underline = "none";
				fontFormat[i].classList.remove("biu-active-btn");
				uiCellElement.style.textDecoration = "none";
			}
		}
	});
}

fontColorInputBtn.addEventListener("change", function() {
    let uiCellElement = findUICellElement();
    let rid = uiCellElement.getAttribute("rid");
    let cid = uiCellElement.getAttribute("cid");
    let cellObj = sheetDB[rid][cid];
    let fontColor = fontColorInputBtn.value;
    uiCellElement.style.color = fontColor;
    cellObj.textColor = fontColor;
})

cellColorInputBtn.addEventListener("change", () => {
    let uiCellElement = findUICellElement();
    let rid = uiCellElement.getAttribute("rid");
    let cid = uiCellElement.getAttribute("cid");
    let cellObj = sheetDB[rid][cid];
    let backgroundColor = cellColorInputBtn.value;
    uiCellElement.style.backgroundColor = backgroundColor;
    cellObj.backgroundColor = backgroundColor;
})