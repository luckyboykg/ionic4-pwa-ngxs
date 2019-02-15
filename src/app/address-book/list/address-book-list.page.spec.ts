import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressBookListPage } from './address-book-list.page';
import { NgxsModule, Store } from '@ngxs/store';
import { AddressBookState } from '../store/address-book.state';
import { AddressBookService } from '../services/address-book.service';
import { AddressBookServiceMock } from '../services/mocks/address-book.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Search } from '../store/address-book.action';
import { AddressBook } from 'src/models/address-book.model';

export const defaultState = {
  addressBooks: {
    loading: false,
    searchTerms: '',
    addressBooks: [],
    selectedAddressBook: null
  }
};

describe('Address Book List', () => {
  let component: AddressBookListPage;
  let fixture: ComponentFixture<AddressBookListPage>;
  let store: Store;
  let nativeElement: any;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressBookListPage],
      imports: [NgxsModule.forRoot([AddressBookState]), RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: AddressBookService, useClass: AddressBookServiceMock }]
    })
      .compileComponents();

    store = TestBed.get(Store);
    store.reset(defaultState);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBookListPage);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    dispatchSpy = spyOn(store, 'dispatch');
  });

  describe('pre OnInit', () => {
    it('should create the Address Book List page', async(() => {
      expect(component).toBeTruthy();
    }));
  });

  describe('post OnInit', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should not display address books', () => {
      expect(nativeElement.querySelectorAll('.test_addressBookItem').length).toBe(0);
      expect(nativeElement.querySelectorAll('.test_loading').length).toBe(0);
    });

    it('should display address books', () => {
      const addressBooksState = {
        addressBooks: {
          loading: false,
          searchTerms: '',
          addressBooks: [
            <AddressBook>{
              company: 'Ejecta',
              email: 'DeniseDCriss1@teleworm.us',
              id: '29828b21-4133-41c8-b3d1-71de23f447b7',
              linkedIn: 'linkedin.com/in/DeniseDCriss1',
              name: 'Denise D. Criss1',
              phone: '907-324-58341',
              position: 'Director1',
              skype: 'DeniseDCriss1'
            },
            <AddressBook>{
              company: 'Ejecta10',
              email: 'DeniseDCriss10@teleworm.us',
              id: '8c4db8ff-f6b3-4ec2-a4fa-baee4ac1b323',
              linkedIn: 'linkedin.com/in/DeniseDCriss10',
              name: 'Denise D. Criss10',
              phone: '907-324-583410',
              position: 'Director10',
              skype: 'DeniseDCriss10'
            }
          ],
          selectedAddressBook: null
        }
      };

      store.reset(addressBooksState);

      fixture.detectChanges();

      expect(nativeElement.querySelectorAll('.test_addressBookItem').length).toBe(2);
      expect(nativeElement.querySelectorAll('.test_loading').length).toBe(0);
    });


    it('should dispatch search action', async () => {
      spyOn(component.searchTextChanged, 'next').and.callFake(function () {
        store.dispatch(new Search('1'));
      });

      component.onInput('1');

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(new Search('1'));
    });
  });
});
