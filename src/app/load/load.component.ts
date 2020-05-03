import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  gameId="000-000";

  ngOnInit() {
  }


  goToGameBoard() {
    this.router.navigate(['board']);
  }

  goToGameStart() {
    this.router.navigate(['']);
  }

}
