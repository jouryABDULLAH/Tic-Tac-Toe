// import { playerOneName as playerOneName, playerTwoName as playerTwoName} from "./main";


function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];


    for(let i = 0; i < rows; i++){
        board[i]=[];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }
    

    getBoard = () =>  board;

    printBoard = () => {
        let boardWithCellValues = board.map((row) => row.map((cell) => cell.getMark()));

        // console.log(boardWithCellValues);
    };

    resetBoard = () => {
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                board[i][j].setMark("");
            }
        }
    };

    markBoard = (row, column, mark) => {
        let cell = board[row][column];
        if( mark && cell.getMark() === ''){
            cell.setMark(mark);
            return true;
        }else{
            // console.log('cell is occupied\nchoose another one');
            return false;
        }
    };

  
    return {
        getBoard,
        printBoard,
        markBoard,
        resetBoard
    };

};


function Players(name, mark, count){
    playerName = name;
    playerMark = mark;
    markCount = count;
    return {playerName, playerMark, markCount};
}


function Cell(){
    
    let mark = '';

    const getMark = () => mark;

    const setMark = (playerMark) => mark = playerMark;

    return{
        getMark,
        setMark
    };
}

function gameController(playerOneName = 'p1', playerTwoName = 'p2'){

    const playerOne = Players(playerOneName,'X',0);
    const playerTwo = Players(playerTwoName,'O',0);
   

    const board = Gameboard();

    let activePlayer = playerOne;

    const switchTurn = () => {
        activePlayer = activePlayer=== playerOne? playerTwo : playerOne;
    };

    const getActivePlayer = () => activePlayer;
    
    const printNewRound = () => {
        // console.log(`${activePlayer.playerName}'s turn`);
        board.printBoard();
    };

    // const checkWinner = (row, column) => {
        
    //     const boardArray = board.getBoard();
    //     let array = boardArray.filter((row) => row[column].getMark() === '').map(row => row[column]);
    //     let arrIsFull = !array.length? true : false;
    //     let win = false;
    //     let draw = false;
    //     // let markRowFlage = 1;
    //     // let markColFlage = 1; 
        
    //     let markRowFlage = 0;
    //     let markColFlage = 0;

    //     if(arrIsFull){
    //         draw = true;
    //         return {
    //             draw,
    //             win
    //         };
    //     }

    //     let Istart = (row === 0)? 1: (row === 1)? -1 : -2; 
    //     let Ilimit = (row === 0)? 2: (row === 1)? 1: 0;

        
    //     // search rows
    //     for(let i = Istart; i < Ilimit; i++){
    //         let tempRow = row + i;
    //         for(let j = 0; j < 3; j++){

    //             if(boardArray[row][column].getMark() === boardArray[tempRow][j].getMark()){
    //                 console.log( boardArray[row][column].getMark() , markRowFlage);
    //                 markRowFlage++;
    //             }
    //         }
    //         // if(boardArray[row][column].getMark() === boardArray[row + i][column].getMark()) 
    //         // {
    //         //     console.log( boardArray[row][column].getMark() , markRowFlage);
    //         //     markRowFlage++;
    //         // }                   
    //     }

    //     if(markRowFlage != 3){
    //         // search columns
    //         let Jstart = (column === 0)? 1: (column === 1)? -1 : -2; // col 2 limit 0, col 1 limit 1, col 0 limit 2
    //         let Jlimit = (column === 0)? 2: (column === 1)? 1: 0;

    //         for(let j = Jstart; j < Jlimit; j++ ){

    //             if(boardArray[row][column].getMark() === boardArray[row][column + j].getMark()) // c = 2, j = -2 =>> 0, 2 + -1 =>> 1, 2 + 0 =>> 2   // c = 1, j = -2 =>> skip->j=1 =>> 2 ,
    //             { 
    //                 markColFlage++;
    //             }  
    //         }
    //     }
        
    //     if (markColFlage === 3 || markRowFlage === 3){

    //         console.log({markColFlage,markRowFlage,win,draw});
    //         win = true;
    //         console.log({markColFlage,markRowFlage,win,draw});

    //     }else if(markColFlage < 3 || markRowFlage < 3){ // was != 3
    //         // row === column, diagonal
    //         if(row === column){
    //             let diagonal_i_1 = ( row === 0 && column === 0)? 1 : (row === 1 && column === 1)? -1 : -2; // last one: (row === 2 && column === 2)
    //             let diagonal_j_1 = ( row === 0 && column === 0)? 1 : (row === 1 && column === 1)? -1 : -2;

    //             let diagonal_i_2 = ( row === 0 && column === 0)? 2 : (row === 1 && column === 1)? 1 : -1;
    //             let diagonal_j_2 = ( row === 0 && column === 0)? 2 : (row === 1 && column === 1)? 1 : -1;

    //             let diagonal_i_1_reversed = 1;
    //             // let diagonal_j_1_reversed = -1;

    //             let diagonal_i_2_reversed = -1;
    //             // let diagonal_j_2_reversed = 1;
                
    //             if ((row + diagonal_i_1) && (row + diagonal_i_2)){ // when the marks form a (/) shape, these values become undefined (out of the array's bound), so we check here in case it isn't before using it in the next step
    //                 if(boardArray[row + diagonal_i_1][column + diagonal_j_1].getMark() === activePlayer.playerMark
    //                 && boardArray[row + diagonal_i_2][column + diagonal_j_2].getMark() === activePlayer.playerMark)
    //                 {
    //                     win = true;
    //                 }
    //             }else{ // the marks ('x' or 'o') form the digonal (/) shape and not the (\), we need to change the value of i so it would be within the bound of the board array
    //                 if(boardArray[row + diagonal_i_1][column + diagonal_j_1].getMark() === activePlayer.playerMark
    //                 && boardArray[row + diagonal_i_2][column + diagonal_j_2].getMark() === activePlayer.playerMark)
    //                 {
    //                     win = true;
    //                 }
    //             }
    //         }
    //     }

    //     return {
    //         win,
    //         draw
    //     };
    // };

    const checkWinner = (row, column) => {

        let boardArray = board.getBoard();
        // let array = boardArray.filter((rows) => rows[columns].getMark() === '').map(rows => rows[columns]);
        
        let arrIsFull = true;
        boardArray.forEach((rows, rowIndex) => {
    
            rows.forEach((columns, columnIndex) => {

                if(boardArray[rowIndex][columnIndex].getMark() === "")
                {
                    arrIsFull = false;
                    return;
                };

            });
        })

        
        let win = false;
        let tie = false;

        if(arrIsFull){
            tie = true;
            return {
                tie,
                win
            };
        }

        // check rows
        let rowEqual = true;
        for (let j = 0; j < 3; j++) {
            if (boardArray[row][j].getMark() !== boardArray[row][column].getMark()) {
                rowEqual = false;
                break;
            }
        }
        if (rowEqual) {
            win = true;
        }

        // check columns
        let colEqual = true;
        for (let i = 0; i < 3; i++) {
            if (boardArray[i][column].getMark() !== boardArray[row][column].getMark()) {
                colEqual = false;
                break;
            }
        }
        if (colEqual) {
            win = true;
        }

        // check diognals
        if (row === column) {
            if (boardArray[0][0].getMark() === boardArray[1][1].getMark() && boardArray[1][1].getMark() === boardArray[2][2].getMark()) {
                win = true;
            }
        }

        if (parseInt(row) + parseInt(column) === 2) {
            if (boardArray[0][2].getMark() === boardArray[1][1].getMark() && boardArray[1][1].getMark() === boardArray[2][0].getMark()) {
                win = true;
            }
        }
        

        return {
            win,
            tie
        };
    };

    const gameStatus = {
        win: false,
        tie: false
    };

    const getGameStatus = () => gameStatus;
    
    const resetGame = () => {

        playerOne.markCount = 0;
        playerTwo.markCount = 0;
        gameStatus.tie = false;
        gameStatus.win = false;
        activePlayer = playerOne;
        board.resetBoard();
        
    };

    const playRound = ( row, column) => {
        // console.log(`marking ${activePlayer.playerName} into cell: column ${column}, row ${row}`);
        let validMove = board.markBoard(row, column, activePlayer.playerMark);
        let result = '';

        do {
            activePlayer.markCount++;
            board.printBoard();
            if(activePlayer.markCount >= 3){

                result = checkWinner(row, column);
                
            }

        } while (!validMove);

        if(result.win){
            // console.log(`${activePlayer.playerName} is the winner`);
            gameStatus.win = true;
            playerOne.markCount = 0;
            playerTwo.markCount = 0;
            return;
        }else if(result.tie){
            // console.log(`tie`);
            gameStatus.tie = true;
            playerOne.markCount = 0;
            playerTwo.markCount = 0;
            return;
        }else{
            switchTurn();
            printNewRound();
        }
    };   

    printNewRound();


    return {
        getActivePlayer,
        getBoard: board.getBoard,
        playRound,
        getGameStatus,
        resetGame
    };
}


function screenController(playerOneName, playerTwoName){
    
    const game = gameController(playerOneName, playerTwoName);
    const screenBoard = document.getElementById('board');
    const message = document.getElementById('message');
    const restart = document.getElementById('restart');
    const playForm = document.getElementById('playForm');
    const gameContainer = document.getElementById('gameContainer');

    const updateScreen = () => {
        const board = game.getBoard(); 
        const reset = game.getGameStatus();

        message.textContent = `${game.getActivePlayer().playerMark}: ${game.getActivePlayer().playerName}'s trun`;
        screenBoard.textContent = '';


        board.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {

                let cellButton = document.createElement('button');
                cellButton.setAttribute('data-row',`${rowIndex}`);
                cellButton.setAttribute('data-column',`${columnIndex}`);
                cellButton.classList.add('cell');
                cellButton.textContent = board[rowIndex][columnIndex].getMark();
                screenBoard.appendChild(cellButton);

            });
        });

        if(reset.win){
            message.textContent = `${game.getActivePlayer().playerName} is the winner`;
            restart.style.display = 'inline-block';
            const cells = document.getElementsByClassName('cell');
            [...cells].forEach((cell) => {
                cell.disabled = true; 
                cell.style.color = 'rgb(214, 136, 136)';
                cell.style.backgroundColor = 'rgba(255, 190, 190, 0.662)';
            });
            return false;            
        }

        if(reset.tie){
            message.textContent = `a tie `;
            restart.style.display = 'inline-block';
            const cells = document.getElementsByClassName('cell');
            [...cells].forEach((cell) => {
                cell.disabled = true; 
                cell.style.backgroundColor = 'rgb(126, 80, 80)';
                cell.style.color = 'rgba(255, 190, 190, 0.662)';
            });
            return;
        }
       
    };

    const clickCell = (target) => {
        const boardRow = target.dataset.row;
        const boardColumn = target.dataset.column;

        if(!boardRow || !boardColumn) return;

        game.playRound(target.dataset.row, target.dataset.column);
        updateScreen();
    };

    screenBoard.addEventListener('click', (e) => {
        let {target} = e;
        clickCell(target);
    });

    restart.addEventListener('click', () => {
        game.resetGame();
        updateScreen();
        gameContainer.style.display = 'none';
        playForm.style.display = 'block';
    });

   
    updateScreen();

    

};


document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('playForm');
    const gameContainer = document.getElementById('gameContainer');
    
    playerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const playerOneName = document.getElementById('p1').value;
        const playerTwoName = document.getElementById('p2').value;

        playerForm.style.display = 'none';
        gameContainer.style.display = 'flex';

        screenController(playerOneName, playerTwoName);

    });
});
