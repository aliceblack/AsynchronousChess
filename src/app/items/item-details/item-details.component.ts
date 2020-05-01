import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  @Input()
  item: Item;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private itemService: ItemService) {}
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  createitem(item: Item) {
    this.itemService.createitem(item).then((newitem: Item) => {
      this.createHandler(newitem);
    });
  }

  updateitem(item: Item): void {
    this.itemService.updateitem(item).then((updateditem: Item) => {
      this.updateHandler(updateditem);
    });
  }

  deleteitem(itemId: String): void {
    this.itemService.deleteitem(itemId).then((deleteditemId: String) => {
      this.deleteHandler(deleteditemId);
    });
  }

}
