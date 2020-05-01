import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'item-details',
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

  createItem(item: Item) {
    this.itemService.createItem(item).then((newitem: Item) => {
      this.createHandler(newitem);
    });
  }

  updateItem(item: Item): void {
    this.itemService.updateItem(item).then((updateditem: Item) => {
      this.updateHandler(updateditem);
    });
  }

  deleteItem(itemId: String): void {
    this.itemService.deleteItem(itemId).then((deleteditemId: String) => {
      this.deleteHandler(deleteditemId);
    });
  }

}
