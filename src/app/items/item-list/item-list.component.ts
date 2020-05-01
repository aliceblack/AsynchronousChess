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
      .getitems()
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

  private getIndexOfitem = (itemId: String) => {
    return this.items.findIndex((item) => {
      return item._id === itemId;
    });
  }

  selectitem(item: Item) {
    this.selectedItem = item
  }

  createNewitem() {
    var item: Item = {
      name: '',
      email: '',
      phone: {
        work: '',
        mobile: ''
      }
    };

    // By default, a newly-created item will have the selected state.
    this.selectitem(item);
  }

  deleteitem = (itemId: String) => {
    var idx = this.getIndexOfitem(itemId);
    if (idx !== -1) {
      this.items.splice(idx, 1);
      this.selectitem(null);
    }
    return this.items;
  }

  additem = (item: Item) => {
    this.items.push(item);
    this.selectitem(item);
    return this.items;
  }

  updateitem = (item: Item) => {
    var idx = this.getIndexOfitem(item._id);
    if (idx !== -1) {
      this.items[idx] = item;
      this.selectitem(item);
    }
    return this.items;
  }

}
