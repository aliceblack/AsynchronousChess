import { Injectable } from '@angular/core';
import { Item } from './item';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ItemService {


  private itemsUrl = '/api/item';

    constructor (private http: HttpClient) {}

    getItems(): Promise<void | Item[]> {
      return this.http.get(this.itemsUrl)
                 .toPromise()
                 .then(response => response as Item[])
                 .catch(this.handleError);
    }

    createItem(newItem: Item): Promise<void | Item> {
      return this.http.post(this.itemsUrl, newItem)
                 .toPromise()
                 .then(response => response as Item)
                 .catch(this.handleError);
    }

    deleteItem(deleteItem: String): Promise<void | String> {
      return this.http.delete(this.itemsUrl + '/' + deleteItem)
                 .toPromise()
                 .then(response => response as String)
                 .catch(this.handleError);
    }

    updateItem(putItem: Item): Promise<void | Item> {
      var putUrl = this.itemsUrl + '/' + putItem._id;
      return this.http.put(putUrl, putItem)
                 .toPromise()
                 .then(response => response as Item)
                 .catch(this.handleError)
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
