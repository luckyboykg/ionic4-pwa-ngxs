import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressBook } from 'src/models/address-book.model';
import { Storage } from '@ionic/storage';

@Injectable()
export class AddressBookService {
    constructor(private storage: Storage) { }
    // public getAddressBooks(): Observable<any> {
    //     return this.httpService.get('./assets/addressBooks.json');
    // }

    public getAddressBooks(): Observable<any> {
        return from(this.getAllValue());
    }

    public searchAddressBooks(query: string): Observable<AddressBook[]> {
        return this.getAddressBooks().pipe(
            map(p => p as AddressBook[]),
            map(res =>
                res.filter(
                    ab =>
                        query !== '' &&
                        (query === '#' ||
                            ab.name.toLowerCase().indexOf(query) !== -1)
                )
            )
        );
    }

    public getAddressBookDetail(id: string): Observable<AddressBook> {
        return this.getAddressBooks().pipe(
            map(p => p as AddressBook[]),
            map(res => res.find(p => p.id === id))
        );
    }

    public saveAddressBook(addressBook: AddressBook): Observable<any> {
        return this.setValue(addressBook.id, addressBook);
    }

    public setValue(key: string, value: any): Observable<any> {
        return from(this.storage.set(key, value));
    }

    public getValue(key: string): Observable<any> {
        return from(this.storage.get(key));
    }

    private async getAllValue(): Promise<any[]> {
        const arrayValue = [];
        await this.storage.forEach((value: any, key: string, iterationNumber: Number) => {
            // console.log("key " + key);
            // console.log("iterationNumber " + iterationNumber);
            // console.log("value " + value);
            if (key === value.id) {
                arrayValue.push(value);
            }
        });
        return arrayValue;
    }
}
