import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {

  @Input() branches = [1, 2, 3];


  constructor() { }

  ngOnInit(): void {
  }

}
