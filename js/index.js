$(document).ready(main());

function main(){
  
  //Variable for display
  var calcDisplay = "";
  
  //Variable to store buttons
  var btnMem = [""];
  
  //last button pushed
  var lastBtn;
  
  //Receives user input
  function btnVal(btn) {
    
    if(btn === "AC") {
      btnMem = [""];
      calcDisplay = "";
      newDisplay(calcDisplay);
    } else if (btn === "CE") {
      if(btnMem.length <= 1) {
        btnMem = [""];
        calcDisplay = "";
        newDisplay(calcDisplay);
      } else {
        btnMem.pop();
        calcDisplay = btnMem.join("");
        newDisplay(calcDisplay);
      }
    } else if (btn === "%") {
      btnMem.push("/100");
      calcDisplay = btnMem.join("");
      newDisplay(calcDisplay);
    } else if (btn === "=") {
      //Evaluate problem
      evaluate();
    } else {
      //For Numbers and Operations
      if((btn === "+" || btn === "-" || btn === "/" || btn === "*") &&
               (btnMem[btnMem.length-1] === "+" || btnMem[btnMem.length-1] === "-" || 
                btnMem[btnMem.length-1] === "/" || btnMem[btnMem.length-1] === "*")){
        //if input is an operator, checks if last input was an operator
        //updates last operator with new one
        btnMem[btnMem.length-1] = btn;
        calcDisplay = btnMem.join("");
        newDisplay(calcDisplay);
      } else if(btn === "." && btnMem[btnMem.length-1] === "."){
        //checks if more than one dot is being inputted
        btnMem[btnMem.length-1] = btn;
      } else {
        if(lastBtn === "=" && (!isNaN(btn))) btnMem = [""];
        btnMem.push(btn);
        calcDisplay = btnMem.join("");
        newDisplay(calcDisplay);
      }
    }
    lastBtn = btn;
  }
  
  //Evaluates the expression
  function evaluate(){
    //Protect against dividing by 0
    if(btnMem[btnMem.length-2] === "/" && btnMem[btnMem.length-1] === "0"){
      console.log("Cannot divide by 0!");
      btnMem.pop();
      calcDisplay = btnMem.join("");
      newDisplay(calcDisplay);
      return;
    }
    var total = btnMem.join("");
    calcDisplay = eval(total);
    newDisplay(calcDisplay);
    btnMem = [calcDisplay];
  }
  
  //Updates the display
  function newDisplay(value){
    document.getElementById("calcOut").innerHTML = value;
  }
  
  $("button").on("click", function(){
    btnVal(this.innerHTML);
  });
}