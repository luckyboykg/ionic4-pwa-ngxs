import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressBook } from 'src/models/address-book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { GetAddressBookDetail, EditAddressBook } from '../store/address-book.action';
import { AddressBookState } from '../store/address-book.state';
import { UriConstant } from 'src/app/constants/uri.constant';

@Component({
    styleUrls: ['./address-book-edit.page.scss'],
    selector: 'page-address-book-edit',
    templateUrl: 'address-book-edit.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressBookEditPage implements OnInit, OnDestroy {
    @Select(AddressBookState.getAddressBook)
    addressBook: Observable<AddressBook>;

    public addressBookForm: FormGroup;
    public phoneControl: FormControl;
    public emailControl: FormControl;
    public linkedInControl: FormControl;
    public skypeControl: FormControl;

    public editedAddressBook = <AddressBook>{};

    private ngUnsubscribe: Subject<any> = new Subject<any>();

    constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
        this.createControls();
        this.createFormWithControls();
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const addressBookId = params['id'] as string;
            this.store.dispatch(
                new GetAddressBookDetail(addressBookId)
            );

            this.addressBook.subscribe(p => {
                if (!p) {
                    return;
                }
                this.loadControlValues(p);
            });
        });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public createControls(): void {
        this.phoneControl = new FormControl('', [Validators.required]);
        this.emailControl = new FormControl('', [Validators.required, Validators.email]);
        this.linkedInControl = new FormControl('');
        this.skypeControl = new FormControl('');
    }

    public createFormWithControls(): void {
        this.addressBookForm = new FormGroup({
            phone: this.phoneControl,
            email: this.emailControl,
            linkedIn: this.linkedInControl,
            skype: this.skypeControl
        });
    }

    private loadControlValues(addressBook: AddressBook): void {
        this.phoneControl.setValue(addressBook.phone);
        this.emailControl.setValue(addressBook.email);
        this.linkedInControl.setValue(addressBook.linkedIn);
        this.skypeControl.setValue(addressBook.skype);
        this.editedAddressBook.id = addressBook.id;
        this.editedAddressBook.name = addressBook.name;
    }

    public onSubmit(): void {
        if (!this.isValidForm()) {
            return;
        }

        this.editedAddressBook.phone = this.addressBookForm.controls.phone.value;
        this.editedAddressBook.email = this.addressBookForm.controls.email.value;
        this.editedAddressBook.linkedIn = this.addressBookForm.controls.linkedIn.value;
        this.editedAddressBook.skype = this.addressBookForm.controls.skype.value;

        this.store.dispatch(new EditAddressBook(this.editedAddressBook));

        this.back();
    }

    private back(): void {
        this.router.navigate([UriConstant.addressBookList]);
    }

    private isValidForm(): boolean {
        return this.addressBookForm.valid;
    }
}
