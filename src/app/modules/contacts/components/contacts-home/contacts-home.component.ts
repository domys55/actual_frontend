import { Component } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { NgFor } from '@angular/common';
import { APIResponse } from '../../../../shared/models/APIResponse.model';
import {TablePaging, TablePagingDTO } from '../../../../shared/models/TablePaging.model';

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
  tablePaging = new TablePaging();
  totalItems:number=0;

  currentPage = 1;
  pageSize = 5; // Adjust page size as needed
  totalPages = 0;
  pagesArray: number[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  this.tablePaging.page=this.currentPage;
  this.tablePaging.recordNo=this.pageSize;

    this.getContacts(this.tablePaging);
  }

  getContacts(model:TablePagingDTO): void {
    this.contactService.ContactPaged(model).subscribe({
      next: (response: APIResponse<Contact[]>) => {
        if (response.success) {
          this.contacts = response.data;
          this.calculateTotalPages(response.recordCount);
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

  deleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe({
      next: (response: APIResponse<Contact>) => {
        if (response.success) {
          console.log('Contact deleted successfully:', response.data);
          //this.getContacts();
          // Optionally refresh the contact list or remove the deleted item from the list
        } else {
          this.errorMessage = response.errorMessage;
        }
      },
      error: (error) => {
        console.error('Error deleting contact:', error);
        this.errorMessage = 'An error occurred while deleting the contact.';
      }
    });
  }

  calculateTotalPages(total:number) {
    this.totalPages = Math.ceil(total / this.pageSize);
    this.pagesArray = Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.tablePaging.page=this.currentPage;
    this.tablePaging.recordNo=this.pageSize;

    this.getContacts(this.tablePaging);
  }
}
