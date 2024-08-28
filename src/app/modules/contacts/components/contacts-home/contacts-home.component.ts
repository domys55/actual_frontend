import { Component } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { NgFor } from '@angular/common';
import { APIResponse } from '../../../../shared/models/APIResponse.model';
import {TablePaging, TablePagingDTO } from '../../../../shared/models/TablePaging.model';
import { CommonModule } from '@angular/common';  
import { ContactTableDTO } from '../../models/ContactTableDTO.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts-home',
  standalone: true,
  imports: [NgFor,CommonModule,FormsModule],
  templateUrl: './contacts-home.component.html',
  styleUrl: './contacts-home.component.css'
})
export class ContactsHomeComponent {
  contacts: ContactTableDTO[] = [];
  errorMessage?: string | null;
  tablePaging = new TablePaging();
  totalItems:number=0;
  searchTerm: string = '';

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

  onSearch(){
    this.tablePaging.page=this.currentPage;
    this.tablePaging.recordNo=this.pageSize;
    this.tablePaging.search=this.searchTerm;
    this.getContacts(this.tablePaging);
  }

  onClearSearch(){
    this.tablePaging.page=this.currentPage;
  this.tablePaging.recordNo=this.pageSize;
  this.searchTerm='';
  this.tablePaging.search=this.searchTerm;
    this.getContacts(this.tablePaging);
  }

  getContacts(model:TablePagingDTO): void {
    this.contactService.ContactPagedTable(model).subscribe({
      next: (response: APIResponse<ContactTableDTO[]>) => {
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
