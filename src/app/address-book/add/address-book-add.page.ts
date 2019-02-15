import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressBook } from 'src/models/address-book.model';
import { UriConstant } from 'src/app/constants/uri.constant';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddAddressBook } from '../store/address-book.action';
import { v4 as uuid } from 'uuid';

@Component({
    styleUrls: ['./address-book-add.page.scss'],
    selector: 'page-address-book-add',
    templateUrl: 'address-book-add.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressBookAddPage {
    public addressBookForm: FormGroup;

    public nameControl: FormControl;
    public phoneControl: FormControl;
    public emailControl: FormControl;
    public linkedInControl: FormControl;
    public skypeControl: FormControl;

    public addedAddressBook = <AddressBook>{};

    constructor(private store: Store, private router: Router) {
        this.createControls();
        this.createFormWithControls();
    }

    private createControls(): void {
        this.nameControl = new FormControl('', [Validators.required]);
        this.phoneControl = new FormControl('', [Validators.required]);
        this.emailControl = new FormControl('', [Validators.required, Validators.email]);
        this.linkedInControl = new FormControl('');
        this.skypeControl = new FormControl('');
    }

    private createFormWithControls(): void {
        this.addressBookForm = new FormGroup({
            name: this.nameControl,
            phone: this.phoneControl,
            email: this.emailControl,
            linkedIn: this.linkedInControl,
            skype: this.skypeControl
        });
    }

    public onSubmit(): void {
        if (!this.isValidForm()) {
            return;
        }

        this.addedAddressBook.id = uuid();
        this.addedAddressBook.name = this.addressBookForm.controls.name.value;
        this.addedAddressBook.phone = this.addressBookForm.controls.phone.value;
        this.addedAddressBook.email = this.addressBookForm.controls.email.value;
        this.addedAddressBook.linkedIn = this.addressBookForm.controls.linkedIn.value;
        this.addedAddressBook.skype = this.addressBookForm.controls.skype.value;

        this.store.dispatch(new AddAddressBook(this.addedAddressBook));

        this.back();
    }

    private back(): void {
        this.router.navigate([UriConstant.addressBookList]);
    }

    private isValidForm(): boolean {
        return this.addressBookForm.valid;
    }
}
