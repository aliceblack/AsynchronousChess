import { Injectable } from '@angular/core';
import { Item } from './item';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ItemService {


  private itemsUrl = '/api/item';

    constructor (private http: HttpClient) {}

    getitems(): Promise<void | Item[]> {
      return this.http.get(this.itemsUrl)
                 .toPromise()
                 .then(response => response as Item[])
                 .catch(this.handleError);
    }

    createitem(newitem: Item): Promise<void | Item> {
      return this.http.post(this.itemsUrl, newitem)
                 .toPromise()
                 .then(response => response as Item)
                 .catch(this.handleError);
    }

    deleteitem(delitemId: String): Promise<void | String> {
      return this.http.delete(this.itemsUrl + '/' + delitemId)
                 .toPromise()
                 .then(response => response as String)
                 .catch(this.handleError);
    }

    updateitem(putitem: Item): Promise<void | Item> {
      var putUrl = this.itemsUrl + '/' + putitem._id;
      return this.http.put(putUrl, putitem)
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
