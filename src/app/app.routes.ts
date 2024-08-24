import { Routes } from '@angular/router';
import { ContactsHomeComponent } from './modules/contacts/components/contacts-home/contacts-home.component';
import { HomeComponent } from './shared/components/home/home.component';
import { ContactFormComponent } from './modules/contacts/components/contact-form/contact-form.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'contacts', component: ContactsHomeComponent },
    { path: 'contact-form', component: ContactFormComponent },
    { path: 'contact-form/:id', component: ContactFormComponent }
];
