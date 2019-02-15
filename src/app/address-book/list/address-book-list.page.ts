import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AddressBook } from 'src/models/address-book.model';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { AddressBookState } from '../store/address-book.state';
import { Store } from '@ngxs/store';
import { Search } from '../store/address-book.action';
import { Router } from '@angular/router';
import { UriConstant } from 'src/app/constants/uri.constant';

@Component({
  selector: 'app-address-book-list',
  templateUrl: 'address-book-list.page.html',
  styleUrls: ['address-book-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressBookListPage implements OnInit, OnDestroy {
  public searchTextChanged = new Subject<string>();
  private ngUnsubscribe: Subject<any> = new Subject<any>();

  public isShowCancel = false;

  @Select(AddressBookState.getAddressBooks)
  addressBooks: Observable<AddressBook[]>;

  @Select(AddressBookState.getLoading)
  loading: Observable<Boolean>;

  constructor(private store: Store, private router: Router) {

  }

  ngOnInit(): void {
    this.searchTextChanged.pipe(debounceTime(200), takeUntil(this.ngUnsubscribe))
      .subscribe(searchTerms => {
        this.store.dispatch(
          new Search(searchTerms)
        );
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onInput(searchTerms: string): void {
    this.searchTextChanged.next(searchTerms.toLowerCase().trim());
  }

  public onCancel(): void {

  }

  public goToAddressBookDetail(addressBook: AddressBook) {
    this.router.navigate([UriConstant.addressBookDetail, addressBook.id]);
  }

  public add() {
    this.router.navigate([UriConstant.addressBookAdd]);
  }

  public edit(addressBook: AddressBook) {
    this.router.navigate([UriConstant.addressBookEdit, addressBook.id]);
  }

  get runChangeDetection() {
    console.log('Checking the view of AddressBookPage');
    return '';
  }
}
