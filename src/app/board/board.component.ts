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
    this.move(this.selectedMove.from, this.selectedMove.to)
  }

  goToGameStart() {
    this.router.navigate(['']);
  }

  from=null;
  to=null;
  onClickCell(event) {
    console.log(event.target.id)
    let cell=event.target.id;
    console.log(this.from===null)
    if(this.from===null){
      this.from=cell;
    }else{
      this.to=cell;
      this.move(this.from, this.to);
    }
  }

  move(from, to){
    this.apiService.gameMove(this.gameId, from, to).subscribe(game=>{
      this.white=game.white;
        this.black=game.black;
        this.state=game.state;
        this.ascii=game.ascii;
        this.board=game.board;
        this.getMoves(this.gameId);
        this.from=null;
        this.to=null;
    }, error=>{
        this.from=null;
        this.to=null;
    });
  }
}
