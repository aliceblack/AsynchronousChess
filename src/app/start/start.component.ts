import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gameId = '';

  onKey(event: any) { 
    this.gameId = event.target.value;
  }

  goToGameCreate() {
    this.router.navigate(['create']);
  }

  goToGameLoad() {
    this.router.navigate(['load'.concat("/").concat(this.gameId)]);
  }

}
