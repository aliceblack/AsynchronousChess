import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { ItemDetailsComponent } from '../item-details/item-details.component';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[]
  selectedItem: Item

  constructor(private itemService: ItemService) { }

  ngOnInit() {
     this.itemService
      .getItems()
      .then((items: Item[]) => {
        this.items = items.map((item) => {
          if (!item.phone) {
            item.phone = {
              mobile: '',
              work: ''
            }
          }
          return item;
        });
      });
  }

  private getIndexOfItem = (itemId: String) => {
    return this.items.findIndex((item) => {
      return item._id === itemId;
    });
  }

  selectItem(item: Item) {
    this.selectedItem = item
  }

  createNewItem() {
    var item: Item = {
      name: '',
      email: '',
      phone: {
        work: '',
        mobile: ''
      }
    };

    // By default, a newly-created item will have the selected state.
    this.selectItem(item);
  }

  deleteItem = (itemId: String) => {
    var idx = this.getIndexOfItem(itemId);
    if (idx !== -1) {
      this.items.splice(idx, 1);
      this.selectItem(null);
    }
    return this.items;
  }

  addItem = (item: Item) => {
    this.items.push(item);
    this.selectItem(item);
    return this.items;
  }

  updateItem = (item: Item) => {
    var idx = this.getIndexOfItem(item._id);
    if (idx !== -1) {
      this.items[idx] = item;
      this.selectItem(item);
    }
    return this.items;
  }

}
