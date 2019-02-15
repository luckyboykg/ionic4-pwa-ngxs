import { AddressBookService } from '../address-book.service';

export class AddressBookServiceMock extends AddressBookService {
    constructor() {
        super(undefined);
    }
}
