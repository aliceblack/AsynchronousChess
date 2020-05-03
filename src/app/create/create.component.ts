import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gameId;
  onKey(event: any) { // without type info
    this.gameId = event.target.value;
  }

  goToGameLoad() {
    this.router.navigate(['load']);
  }

  goToGameStart() {
    this.router.navigate(['']);
  }

}
