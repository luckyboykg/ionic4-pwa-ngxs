import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressBook } from 'src/models/address-book.model';
import { Select, Store } from '@ngxs/store';
import { AddressBookState } from '../store/address-book.state';
import { ActivatedRoute } from '@angular/router';
import { GetAddressBookDetail } from '../store/address-book.action';

@Component({
    styleUrls: ['./address-book-detail.page.scss'],
    selector: 'page-address-book-detail',
    templateUrl: 'address-book-detail.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressBookDetailPage implements OnInit {
    @Select(AddressBookState.getAddressBook)
    addressBook: Observable<AddressBook>;

    constructor(private store: Store, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const addressBookId = params['id'] as string;
            this.store.dispatch(
                new GetAddressBookDetail(addressBookId)
            );
        });
    }

    get runChangeDetection() {
        console.log('Checking the view of AddressBookDetailPage');
        return '';
    }
}
