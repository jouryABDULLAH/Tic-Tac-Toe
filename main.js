

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

        console.log(boardWithCellValues);
    }

    markBoard = (row, column, mark) => {
        let cell = board[row][column];
        if( mark && cell.getMark() === ''){
            cell.setMark(mark);
            return true;
        }else{
            console.log('cell is occupied\nchoose another one');
            return false;
        }
    }

  
    return {
        getBoard,
        printBoard,
        markBoard,
    };

};


function Players(name, mark){
    playerName = name;
    playerMark = mark;
    markCount = 0;
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

function gameController(){
    const playerOne = Players('p1','x');
    const playerTwo = Players('p2','o');
   

    const board = Gameboard();

    let activePlayer = playerOne;

    const switchTurn = () => {
        activePlayer = activePlayer=== playerOne? playerTwo : playerOne;
    };

    const getActivePlayer = () => activePlayer;
    
    const printNewRound = () => {
        console.log(`${activePlayer.playerName}'s turn`);
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
        let array = boardArray.filter((row) => row[column].getMark() === '').map(row => row[column]);
        let arrIsFull = !array.length ? true : false;
        let win = false;
        let draw = false;

        if(arrIsFull){
            draw = true;
            return {
                draw,
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

        if (row + column === 2) {
            if (boardArray[0][2].getMark() === boardArray[1][1].getMark() && boardArray[1][1].getMark() === boardArray[2][0].getMark()) {
                win = true;
            }
        }
        

        return {
            win,
            draw
        };
    };

    const resetGame = () => {
        
        board.getBoard().map((row) => row.map((cell) => cell.setMark('')));
        playerOne.markCount = 0;
        playerTwo.markCount = 0;
        
    };

    const playRound = ( row, column) => {
        console.log(`marking ${activePlayer.playerName} into cell: column ${column}, row ${row}`);
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
            console.log(`${activePlayer.playerName} is the winner`);
            resetGame();
            return;
        }else if(result.draw){
            console.log(`draw`);
            resetGame();
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
        playRound
    };
}

// const game = gameController();
