function show_hide_game_button(){
    if(document.getElementById("tic-tac-toe-button").style.display == "block"){
        document.getElementById("tic-tac-toe-button").style.display = "none";
        document.getElementById("sudoku-button").style.display = "none";
    }
    else{
        document.getElementById("tic-tac-toe-button").style.display = "block";
        document.getElementById("sudoku-button").style.display = "block";
    }
}
function play_ttt(){
    document.getElementById("ttt-game-div").style.backgroundImage = "url('images/background-ttt.jpg')";
    nextTurn('Player 1');
    show_hide_game_button();
    document.getElementById("ttt-game-div").classList.add("active");
}
function play_sudoku(){

}


//JS for tic-toc-toe
var player = [["images/x.png","x","Player 1"],["images/o.png","o","Player 2"]];
var next_symbol = player[0];
var count = 0;
var wins = [
    new Map([[1,"n"],[2,"n"],[3,"n"]]),
    new Map([[4,"n"],[5,"n"],[6,"n"]]),
    new Map([[7,"n"],[8,"n"],[9,"n"]]),
    new Map([[1,"n"],[4,"n"],[7,"n"]]),
    new Map([[2,"n"],[5,"n"],[8,"n"]]),
    new Map([[3,"n"],[6,"n"],[9,"n"]]),
    new Map([[1,"n"],[5,"n"],[9,"n"]]),
    new Map([[3,"n"],[5,"n"],[7,"n"]]),
];
function nextTurn(turn){
    document.getElementById("turn").innerHTML="Turn: "+turn;
}
function check(item){
    var url="url('"+next_symbol[0]+"')";
    document.getElementById(item).style.backgroundImage=url;
    document.getElementById(item).style.pointerEvents="none";
    fill_win(item);
    if(next_symbol[0]=="images/x.png"){
        next_symbol = player[1];
    }
    else{
        next_symbol = player[0];
    }
    count+=1;
    if(count==9)
        tie();
    nextTurn(next_symbol[2]);
}
function fill_win(item){
    for(var w in wins){
        if(wins[w].has(item)){
            wins[w].set(item,next_symbol[1]);
        }
    }
    isWinner();
}
function isWinner(){
    let val="";
    for(var x in wins){
        var arr = wins[x].values();
        val+=arr.next().value
               +arr.next().value
               +arr.next().value;
        if(val=="xxx" || val=="ooo"){
            declareWinner();
            break;
        }
        val="";
    }
}
function declareWinner(){
    nextTurn(' ');
    document.getElementById("winner").innerHTML=next_symbol[2]+" wins !";
    document.getElementById("winner").classList.add("active")
    document.getElementById("tic-tac-toe-overlay").classList.add("active");
}
function tie(){
    document.getElementById("winner").innerHTML="It is a Tie !";
    document.getElementById("winner").classList.add("active")
    document.getElementById("tic-tac-toe-overlay").classList.add("active");
}
function reset(){
    next_symbol = player[0];
    nextTurn(next_symbol[2]);
    count=0;
    items=[1,2,3,4,5,6,7,8,9];
    for(var i in items){
        document.getElementById(items[i]).style.backgroundImage="url('images/blank.png'";
        document.getElementById(items[i]).style.pointerEvents="all";
    }
    document.getElementById("winner").innerHTML=" ";
    document.getElementById("tic-tac-toe-overlay").classList.remove("active");
    document.getElementById("winner").classList.remove("active");
    wins = [
        new Map([[1,"n"],[2,"n"],[3,"n"]]),
        new Map([[4,"n"],[5,"n"],[6,"n"]]),
        new Map([[7,"n"],[8,"n"],[9,"n"]]),
        new Map([[1,"n"],[4,"n"],[7,"n"]]),
        new Map([[2,"n"],[5,"n"],[8,"n"]]),
        new Map([[3,"n"],[6,"n"],[9,"n"]]),
        new Map([[1,"n"],[5,"n"],[9,"n"]]),
        new Map([[3,"n"],[5,"n"],[7,"n"]]),
    ];
}


//JS for Sudoku
