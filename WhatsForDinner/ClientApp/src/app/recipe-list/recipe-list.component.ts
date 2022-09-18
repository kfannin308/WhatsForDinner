import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public detailId: number = 0;
  constructor() { }
  @Input() public id: number = 0;
  @Input() public title: string = "";
  @Input() public image: string = "";
  @Input() public imageType: string = "";

  ngOnInit(): void {
  }

  public assignID(myId:number) {
    this.detailId = myId;
  }
  

}
