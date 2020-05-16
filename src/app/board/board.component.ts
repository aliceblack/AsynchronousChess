import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToGameStart() {
    this.router.navigate(['']);
  }
}
