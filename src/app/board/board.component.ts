import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Moveresult } from '../moveresult';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService) { }

  letters = ["a","b","c","d","e","f","g","h"];
  gameId;
  white;
  black;
  state;
  ascii;
  board;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.gameId = params.get('gameId');
        this.apiService.gameGet(this.gameId).subscribe(game=>{
          if(game===null){
            this.gameNotFound=true;
          }else{
            this.gameNotFound=false;
            this.white=game.white;
            this.black=game.black;
            this.state=game.state;
            this.ascii=game.ascii;
            this.board=game.board;
            this.getMoves(this.gameId);
          }
        });
      }
    )
  }

  gameNotFound=false;

  moves;
  getMoves(gameId){
    this.apiService.gameMoves(gameId).subscribe(moves=>{
      this.moves=moves;
    });
  }


  selectedMove;
  makeMove(){
    this.apiService.gameMove(this.gameId, this.selectedMove.from, this.selectedMove.to).subscribe(game=>{
      this.white=game.white;
        this.black=game.black;
        this.state=game.state;
        this.ascii=game.ascii;
        this.board=game.board;
        this.getMoves(this.gameId);
    });
  }

  goToGameStart() {
    this.router.navigate(['']);
  }

  onClickCell(event) {
    console.log(event.target.id)
  }
}
