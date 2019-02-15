import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddressBook } from 'src/models/address-book.model';
import { AddressBookService } from '../services/address-book.service';
import {
    AddAddressBook,
    Search,
    SearchDone,
    EffectError,
    GetAddressBookDetail,
    GetAddressBookDetailDone,
    EditAddressBook,
    AddAddressBookDone,
    EditAddressBookDone
} from './address-book.action';

export interface AddressBookStateModel {
    loading: boolean;
    searchTerms: string;
    addressBooks: AddressBook[];
    selectedAddressBook: AddressBook;
}

@State<AddressBookStateModel>({
    name: 'addressBooks',
    defaults: {
        loading: false,
        searchTerms: '',
        addressBooks: [],
        selectedAddressBook: null
    }
})
export class AddressBookState {
    constructor(private addressBookService: AddressBookService) {

    }

    @Selector()
    static getAddressBooks(state: AddressBookStateModel) {
        return state.addressBooks;
    }

    @Selector()
    static getAddressBook(state: AddressBookStateModel) {
        return state.selectedAddressBook;
    }

    @Selector()
    static getLoading(state: AddressBookStateModel) {
        return state.loading;
    }

    @Action(Search)
    search(context: StateContext<AddressBookStateModel>, action: Search) {
        context.patchState({
            loading: true
        });

        this.addressBookService.searchAddressBooks(action.searchTerms)
            .subscribe(results => {
                context.dispatch(new SearchDone(results));
            }, err => {
                context.dispatch(new EffectError(err));
            });
    }

    @Action(SearchDone)
    searchDone(context: StateContext<AddressBookStateModel>, action: SearchDone) {
        context.patchState({
            loading: false,
            addressBooks: action.addressBooks
        });
    }

    @Action(GetAddressBookDetail)
    getDetail(context: StateContext<AddressBookStateModel>, action: GetAddressBookDetail) {
        this.addressBookService.getAddressBookDetail(action.id)
            .subscribe(results => {
                context.dispatch(new GetAddressBookDetailDone(results));
            }, err => {
                context.dispatch(new EffectError(err));
            });
    }

    @Action(GetAddressBookDetailDone)
    getDetailDone(context: StateContext<AddressBookStateModel>, action: GetAddressBookDetailDone) {
        context.patchState({
            selectedAddressBook: action.addressBook
        });
    }

    @Action(AddAddressBook)
    add(context: StateContext<AddressBookStateModel>, action: AddAddressBook) {
        this.addressBookService.saveAddressBook(action.addressBook).subscribe(() => {
            context.dispatch(new AddAddressBookDone());
        }, err => {
            context.dispatch(new EffectError(err));
        });
    }

    @Action(AddAddressBookDone)
    addDone(context: StateContext<AddressBookStateModel>, action: AddAddressBookDone) {

    }

    @Action(EditAddressBook)
    edit(context: StateContext<AddressBookStateModel>, action: EditAddressBook) {
        this.addressBookService.saveAddressBook(action.addressBook).subscribe(() => {
            context.dispatch(new EditAddressBookDone());
        }, err => {
            context.dispatch(new EffectError(err));
        });
    }

    @Action(EditAddressBookDone)
    editDone(context: StateContext<AddressBookStateModel>, action: EditAddressBookDone) {

    }

    @Action(EffectError)
    effectError(context: StateContext<AddressBookStateModel>, action: EffectError) {
        console.log(action.error);
        context.patchState({
            loading: false,
            addressBooks: []
        });
    }
}
