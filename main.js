/* Variables */
let currentState=1;
let elem="";
let game = [[],[],[]];
let column=10;
let row=10;
let counter=0;

/* Set State of Game visible to user */
const setState=(number)=>{
                if (number%2){
                        currentState+=1;
                        put="O"
                        document.getElementById("Indicator").innerHTML="Next Click is X";
                        return put;
                }
                else {
                        currentState+=1;
                        put="X";
                        document.getElementById("Indicator").innerHTML="Next Click is O";
                        return put;
                }
}



/* Store Current Move */
const setValue=(input_id)=>{
        const squares=Array.from(document.getElementsByClassName('InputBox'));
        column=(input_id-1)%3;
        row=Math.floor((input_id-1)/3);
        game[row][column]=squares[input_id-1].innerHTML;
}




/* Check TO see if all cells are filled or winning pattern matched */
const IsTheGameOver=()=>{
        if(game[0][column]===game[1][column] && game[1][column]===game[2][column]){
                DeclareWinner();
                return true;
        }
        else if(game[row][0]===game[row][1] && game[row][1]===game[row][2]){
                DeclareWinner();
                return true;
        }
        else if(game[1][1]!=null && ((game[0][0]===game[1][1] && game[1][1]===game[2][2])||(game[0][2]===game[1][1] && game[1][1]===game[2][0]))){
                DeclareWinner();
                return true;
        }
        else{
       console.log("Game is going on.");
        document.getElementById('Undo_once').style.display="block";
        }
}

const DeclareWinner=()=>{
        document.getElementById('Winner').innerHTML=`The winner is ${game[row][column]}`;
        document.getElementById('Reset').style.display="block";
        document.getElementById('Winner').style.display="block";
       document.getElementById('Undo_once').style.display="none";
}

const End_game=()=>{
        document.getElementById('Winner').innerHTML=`Unfortunately, It's a Tie!`;
        document.getElementById('Reset').style.display="block";
        document.getElementById('Winner').style.display="block";
        document.getElementById('Undo_once').style.display="none";
}





/* Handle Undo, Reset buttons */
const Undo=()=>{
        elem.innerHTML="";
        game[row][column]=null;
        setState(currentState);       
        counter=counter-1;
        document.getElementById('Undo_once').style.display="none";
}

const Reset=()=>{
        game = [[],[],[]];
        const temp=Array.from(document.getElementsByClassName("InputBox"))
        temp.forEach((element)=>{
                element.innerHTML="";
                })
        document.getElementById('Winner').innerHTML="";
        document.getElementById('Reset').style.display="none";
        document.getElementById('Winner').style.display="none";
        document.getElementById('Undo_once').style.display="block";
        counter=0;
}





const handleCellClick=(event)=>{
        let cool=event.target.getAttribute("id");
        console.log(cool);
        current=document.getElementById(cool);
        let x;
        if ((current.innerHTML=='X') || (current.innerHTML=='O'))
                {
                        console.log("Bad Click");
                }
        else
                {
                elem=current;
                current.innerHTML=setState(currentState);
                setValue(cool);
                x=IsTheGameOver();
                counter=counter+1;
                }
        if(counter===9 && x!=true){
                End_game(0);
}
}

