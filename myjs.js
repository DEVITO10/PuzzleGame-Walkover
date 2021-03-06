function goToHome(){
    document.getElementById("ttt-game-div").classList.remove("active");
    document.getElementById("sudoku-game-div").classList.remove("active");
}
function openHelp(){
    if(document.getElementById("help").className == "fa fa-question-circle")
    {
        document.getElementById("puzzlehelp").classList.add("active");
        document.getElementById("help").className = "fa fa-times";
    }
    else{
        document.getElementById("puzzlehelp").classList.remove("active");
        document.getElementById("help").className = "fa fa-question-circle";
    }
}
function play_ttt(){
    document.getElementById("ttt-game-div").style.backgroundImage = "url('images/background-ttt.jpg')";
    nextTurn('Player 1');
    document.getElementById("ttt-game-div").classList.add("active");
}
function play_sudoku(){
    create_sudoku();
    document.getElementById("sudoku-game-div").style.backgroundImage = "url('images/background-sudoku.png')";
    document.getElementById("sudoku-game-div").classList.add("active");
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
    document.getElementById("ttt-turn").innerHTML="Turn: "+turn;
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
            declareTttWinner();
            break;
        }
        val="";
    }
}
function declareTttWinner(){
    nextTurn(' ');
    document.getElementById("ttt-winner").innerHTML=next_symbol[2]+" wins !";
    document.getElementById("ttt-winner").classList.add("active")
    document.getElementById("tic-tac-toe-overlay").classList.add("active");
}
function tie(){
    document.getElementById("ttt-winner").innerHTML="It is a Tie !";
    document.getElementById("ttt-winner").classList.add("active")
    document.getElementById("tic-tac-toe-overlay").classList.add("active");
}
function reset_ttt(){
    next_symbol = player[0];
    nextTurn(next_symbol[2]);
    count=0;
    items=[1,2,3,4,5,6,7,8,9];
    for(var i in items){
        document.getElementById(items[i]).style.backgroundImage="url('images/blank.png'";
        document.getElementById(items[i]).style.pointerEvents="all";
    }
    document.getElementById("ttt-winner").innerHTML=" ";
    document.getElementById("tic-tac-toe-overlay").classList.remove("active");
    document.getElementById("ttt-winner").classList.remove("active");
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
var the_sudoku = [
    ['5','4','3','6','1','2'],
    ['1','2','6','3','4','5'],
    ['4','2','5','3','6','1'],
    ['6','1','3','2','5','4'],
    ['2','3','4','1','5','6'],
    ['5','6','1','4','3','2']
]
var ans = [];
var input_ans = [];
function create_sudoku(){
    var inhtml = "";
    let sudoku_element = document.getElementById("sudoku-grid");
    var k = 1;
    ans = [];
    for(let i=0 ; i<6 ; i++){
        inhtml += "<div class='sudoku-grid-smaller'>";
        for(let j=0 ; j<6 ; j++){
            inhtml += "<div class='sudoku-grid-smallest'>";
            if(Math.floor(Math.random() * 2)){
                inhtml += the_sudoku[i][j];
            }
            else{
                inhtml += "<input type='text' class='sudoku-inputs' maxlength='1' oninput='sudoku_input()'>";
                ans.push(the_sudoku[i][j]);
            }
            inhtml += "</div>"
            k += 1;
        }
        inhtml += "</div>";
    }
    sudoku_element.innerHTML = inhtml;
}
function sudoku_input(){
    let sudoku_input_elements = document.getElementsByClassName("sudoku-inputs");
    input_ans = [];
    for(var ele = 0; ele < sudoku_input_elements.length ; ele++)
        input_ans.push(sudoku_input_elements[ele].value);
    let result = check_sudoku();
    if(result)
        declareSudokuWinner();
}
function check_sudoku(){
    for(let i in ans)
        if(ans[i]!=input_ans[i])
            return false;
    return true;
}
function declareSudokuWinner(){
    document.getElementById("sudoku-winner").innerHTML="You win !";
    document.getElementById("sudoku-winner").classList.add("active");
    document.getElementById("sudoku-overlay").classList.add("active");
}
function reset_sudoku(){
    create_sudoku();
    document.getElementById("sudoku-overlay").classList.remove("active");
    document.getElementById("sudoku-winner").classList.remove("active")
}