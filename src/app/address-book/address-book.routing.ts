import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookListPage } from './list/address-book-list.page';
import { AddressBookDetailPage } from './detail/address-book-detail.page';
import { AddressBookAddPage } from './add/address-book-add.page';
import { AddressBookEditPage } from './edit/address-book-edit.page';

const routes: Routes = [{
    path: '',
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: AddressBookListPage },
        { path: 'detail/:id', component: AddressBookDetailPage },
        { path: 'add', component: AddressBookAddPage },
        { path: 'edit/:id', component: AddressBookEditPage }
    ]
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AddressBookRoutingModule { }

export const RouteComponents = [
    AddressBookListPage,
    AddressBookDetailPage,
    AddressBookAddPage,
    AddressBookEditPage
];
