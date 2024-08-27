import { Routes } from '@angular/router';
import { ContactsHomeComponent } from './modules/contacts/components/contacts-home/contacts-home.component';
import { HomeComponent } from './shared/components/home/home.component';
import { ContactFormComponent } from './modules/contacts/components/contact-form/contact-form.component';
import { ContactDetailsComponent } from './modules/contacts/components/contact-details/contact-details.component';
import { ContactDeleteComponent } from './modules/contacts/components/contact-delete/contact-delete.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'contacts', component: ContactsHomeComponent },
    { path: 'contact-form', component: ContactFormComponent },
    { path: 'contact-form/:id', component: ContactFormComponent },
    { path: 'contact-details/:id', component: ContactDetailsComponent },
    { path: 'contact-delete/:id', component: ContactDeleteComponent }
];
