// const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

// const dropdown = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");

// for(let select of dropdown){
//     for (currCode in countryList){
//         // console.log(code, countryList[code]);
//         let newOption = document.createElement("option");
//         newOption.innerHTML = currCode;
//         newOption.value = currCode;
//         if(select.name === "from" && currCode === "USD"){
//             newOption.selected = "selected"; 
//         }else if(select.name === "to" && currCode === "INR"){
//             newOption.selected = "selected"; 
//         }
//         select.append(newOption);
//     }

//     select.addEventListener("change", (event)=>{
//         updateFlag(event.target);
//     })
// }

// const updateFlag= (element) =>{
//     // console.log(element);
//     let currCode = element.value;
//     // console.log(currCode);
//     let countryCode = countryList[currCode];
//     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//     let img = element.parentElement.querySelector("img");
//     img.src = newSrc;
// }

// btn.addEventListener("click", async (evt) => {
//     evt.preventDefault();
//     let amount = document.querySelector(".amount input");
//     let amtval = amount.value;
//     if(amtval === "" || amtval < 1){
//         amtVal = 1;
//         amount.value = "1";
//     }

//     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

//     let response = await fetch(URL);
//     let data = await response.json();
//     let rate = data[fromCurr.value.toLowerCase()];
//     // console.log(rate);

//     let finalAmount = amount * rate;
//     msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
// })

const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = parseFloat(amount.value);
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        // Log the response to inspect the data structure
        console.log(data);

        // The new API structure has rates inside the base currency key
        let rates = data[fromCurr.value.toLowerCase()];
        if (rates && rates[toCurr.value.toLowerCase()]) {
            let rate = rates[toCurr.value.toLowerCase()];
            let finalAmount = (amtval * rate).toFixed(2);

            msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
        } else {
            msg.innerText = "Error: Unable to retrieve conversion rate.";
        }
    } catch (error) {
        msg.innerText = "Error: Unable to retrieve conversion rate.";
        console.error("Fetch error:", error);
    }
});