import { AddressBook } from 'src/models/address-book.model';

export class AddAddressBook {
    static readonly type = '[AddressBook] Add';
    constructor(public addressBook: AddressBook) { }
}

export class Search {
    static readonly type = '[AddressBook] Search';
    constructor(public searchTerms: string) { }
}

export class GetAddressBookDetail {
    static readonly type = '[AddressBook] GetAddressBookDetail';
    constructor(public id: string) { }
}

export class EditAddressBook {
    static readonly type = '[AddressBook] EditAddressBook';
    constructor(public addressBook: AddressBook) { }
}

export class SearchDone {
    static readonly type = '[AddressBook] SearchDone';
    constructor(public addressBooks: AddressBook[]) { }
}

export class GetAddressBookDetailDone {
    static readonly type = '[AddressBook] GetAddressBookDetailDone';
    constructor(public addressBook: AddressBook) { }
}

export class AddAddressBookDone {
    static readonly type = '[AddressBook] AddAddressBookDone';
    constructor() { }
}

export class EditAddressBookDone {
    static readonly type = '[AddressBook] EditAddressBookDone';
    constructor() { }
}

export class EffectError {
    static readonly type = 'Effect Error';
    constructor(public error: any) { }
}
