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

  value = '';

  onKey(event: any) { 
    this.value = event.target.value;
  }

  goToGameCreate() {
    this.router.navigate(['create']);
  }

  goToGameLoad() {
    this.router.navigate(['load']);
  }

}
