import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: string[];
  xIsNext: boolean; //determine the current player
  winner: string;

  constructor() { }

  ngOnInit(){
    this.newGame();
  }

  // for starting a new game, every time
  newGame(){
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  //who is currently using the game
  get player(){
    return this.xIsNext ? 'X' : 'O'; //
  }

  makeMove(idx: number){
    if (!this.squares[idx]){
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  // defining the logic for the winner
  calculateWinner(){
    const lines = [ //combinations of array positions which define the winning combinations.
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] && 
        this.squares[a] === this.squares[b] && // comparing the value of first and second box
        this.squares[a] === this.squares[c] // comparing the value of the first and third box
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
