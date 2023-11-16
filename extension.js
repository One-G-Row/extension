
let myLeads = [];
const save = document.getElementById("input-btn");
const input = document.getElementById("input-el"); // we use const keyword when we don't want a varialble reassigned
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStorage){
myLeads = leadsFromLocalStorage;
render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      myLeads.push(tabs[0].url)
      localStorage.setItem("myLeads", JSON.stringify(myLeads))
     render(myLeads)
    
})

})

function render(leads){
  let listItems = "";
  for(let i = 0; i < leads.length; i++){ 
          listItems += `
          <li>
          <a target = '_blank' href = '${leads[i]}'> 
          ${leads[i]} 
          </a>
          </li>
          `
  }
  ulEl.innerHTML = listItems;
  }
  

deleteBtn.addEventListener('dblclick', function(){ 
  localStorage.clear() // clear the localStorage
  myLeads = [] //clear the myLeads array
  render(myLeads) // we use the renderLeads() function to clear the DOM because myLeads in the function is empty
})


save.addEventListener("click", function (){
  myLeads.push(input.value); // Push the value from the inputEl into the myLeads array 
 input.value = ""; //clears the input field after an input is saved/submitted.
 localStorage.setItem("myLeads", JSON.stringify(myLeads) ) //stringify myLeads array
                                                           // Save the myLeads array to localStorage 

  render(myLeads);

})

