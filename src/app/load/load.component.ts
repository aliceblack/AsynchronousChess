import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  gameId="000-000";

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.gameId = params.get('gameId');
      }
    )
  }


  goToGameBoard() {
    this.router.navigate(['board'.concat("/").concat(this.gameId)]);
  }

  goToGameStart() {
    this.router.navigate(['']);
  }

}
