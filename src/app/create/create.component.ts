import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { ApiService } from '../api.service';
import { Game } from '../game';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  whiteName;
  onWhite(event: any) { // without type info
    this.whiteName = event.target.value;
  }

  blackName;
  onBlack(event: any) { // without type info
    this.blackName = event.target.value;
  }

  goToGameLoad() {
    this.apiService.gameCreate(this.whiteName, this.blackName).subscribe((game) => {
      let gameId = game.id;
      this.router.navigate(['load'.concat("/").concat(gameId)]);
    });
  }

  goToGameStart() {
    this.router.navigate(['']);
  }

}
