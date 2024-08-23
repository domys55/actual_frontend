import { Component } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { NgFor } from '@angular/common';
import { APIResponse } from '../../../../shared/models/APIResponse.model';

@Component({
  selector: 'app-contacts-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './contacts-home.component.html',
  styleUrl: './contacts-home.component.css'
})
export class ContactsHomeComponent {
  contacts: Contact[] = [];
  errorMessage?: string | null;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getUsers().subscribe({
      next: (response: APIResponse<Contact[]>) => {
        if (response.success) {
          this.contacts = response.data;
        } else {
          this.errorMessage = response.errorMessage;
        }
      },
      error: (error) => {
        console.error('Error fetching contacts', error);
        this.errorMessage = 'An error occurred while fetching contacts.';
      }
    });
  }
}
