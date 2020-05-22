import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { HttpClient } from '@angular/common/http';
import { Gamecreate } from './gamecreate';
import { Move } from './move';
import { Game } from './game';
import { Observable } from 'rxjs';
import { Moveresult } from './moveresult';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private configurationService: ConfigurationService, private http: HttpClient) { }

  gameCreate(whiteName: string, blackName: string) : Observable<Game> {
    let url = this.configurationService.getApiHost().concat("/api/game")
    let gameCreate = new Gamecreate();
    gameCreate.blackName = blackName;
    gameCreate.whiteName = whiteName;
    return this.http.put<Game>(url, gameCreate);
  }

  gameGet(gameId: string){
    let url = this.configurationService.getApiHost().concat("/api/game/").concat(gameId);
    return this.http.get<Game>(url);
  }

  gameMoves(gameId: string){
    let url = this.configurationService.getApiHost().concat("/api/game/").concat(gameId).concat("/moves")
    return this.http.get<Move[]>(url);
  }

  gameMove(gameId: string, from: string, to: string){
    let url = this.configurationService.getApiHost().concat("/api/game/").concat(gameId).concat("/move")
    let move: Move;
    move.from = from;
    move.to = to;
    return this.http.post<Moveresult>(url, move);
  }

}
