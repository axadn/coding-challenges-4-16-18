document.addEventListener("DOMContentLoaded", ()=>{
    let root = document.getElementById('board');
    let button = document.createElement('button');
    button.innerText = "click to play";
    button.onclick = ()=>{
        root.innerHTML = "";
        let board = new Game(root);
    }
    root.appendChild(button);
});

class Game{
    constructor(node){
        this.currentPlayer = 0;
        this.handleClick = this.handleClick.bind(this);
        this.board = new Board(node,this.handleClick);
    }

    playerToken(index){
        if(index == 0) return "X";
        if(index == 1) return "O";
    }
    checkWinner(){
        return this.checkRows() || this.checkCols() || this.checkDiagonals();
    }
    checkRows(){
        let firstToken;
        for(let y = 0; y <3; ++y){
            firstToken = this.board.getToken(0, y);
            if(this.board.getToken(1,y) == firstToken &&
                this.board.getToken(2, y) == firstToken) return firstToken;
        }
        return false;
    }
    checkCols(){
        let firstToken;
        for(let x = 0; x <3; ++x){
            firstToken = this.board.getToken(x, 0);
            if(this.board.getToken(x, 1) == firstToken &&
                this.board.getToken(x, 2) == firstToken) return firstToken;
        }
        return false;
    }
    checkDiagonals(){
        let firstToken;
        firstToken = this.board.getToken(0, 0);
        if(this.board.getToken(1, 1) == firstToken &&
            this.board.getToken(2, 2) == firstToken) return firstToken;
        firstToken = this.board.getToken(0, 2);
        if(this.board.getToken(1, 1) == firstToken &&
            this.board.getToken(2, 0) == firstToken) return firstToken;
        return false;
    }
    handleClick(e){
        if(e.target.classList.contains("board-cell")){
            const x = e.target.dataset.row;
            const y = e.target.dataset.col;
            if(this.board.getToken(x, y) == ""){
                this.board.makeMove(x,y, this.playerToken(this.currentPlayer));
                this.currentPlayer = this.currentPlayer + 1;
                if(this.currentPlayer > 1) this.currentPlayer = 0;
                const winner = this.checkWinner();
                if(winner){
                    alert(`${winner} won`);
                    this.board.clear();
                }
            }
        }
    }
}
class Board{
    constructor(node, onClick){
        this.node = node;
        this.onClick = onClick;
        this.fillRoot();
    }

    fillRoot(){
        let newRow, newCell;
        for(let i  = 0; i < 3; ++i){
            newRow = document.createElement('div');
            newRow.classList.add("board-row");
            for(let j = 0; j <3; ++j){
                newCell = (document.createElement('div'));
                newCell.classList.add("board-cell");
                newCell.setAttribute("data-row", i);
                newCell.setAttribute("data-col", j);
                newRow.appendChild(newCell);
            }
            this.node.appendChild(newRow);
        }
        this.node.addEventListener("click", this.onClick);
    }
    clear(){
        for(let x = 0; x <3; ++x){
            for(let y =0; y <3; ++y){
                this.makeMove(x,y,"");
            }
        }
    }
    makeMove(x, y, token){
        this.getCell(x, y).textContent = token;
    }
    getCell(x, y){
        return this.node.children[x].children[y];
    }
    getToken(x, y){
        return this.getCell(x, y).textContent;
    }
}