import { Component } from '@angular/core';
import { ContactDTO } from '../../../../shared/models/ContactDTO.model';
import { ContactAggregateService } from '../../../../shared/services/contactAggregate.service';
import { ActivatedRoute } from '@angular/router';
import { APIResponse } from '../../../../shared/models/APIResponse.model';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-contact-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-delete.component.html',
  styleUrl: './contact-delete.component.css'
})
export class ContactDeleteComponent {
    contact?: ContactDTO;
    contactId: number | null = null;
    errorMessage: string | null = null;
  
    constructor(private contactService: ContactAggregateService,private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.contactId = +params['id'];
      });
      
        if (this.contactId) {
          this.getContact(this.contactId);
        }
    
  }
  
    getContact(id: number): void {
      this.contactService.getContactById(id).subscribe({
        next: (response: APIResponse<ContactDTO>) => {
          if (response.success) {
            this.contact = response.data;
          } else {
            this.errorMessage = response.errorMessage;
          }
        },
        error: (error) => {
          console.error('Error fetching contact:', error);
          this.errorMessage = 'An error occurred while fetching the contact.';
        }
      });
    }

    deleteContact(id: number): void {
      this.contactService.deleteContact(id).subscribe({
        next: (response: APIResponse<ContactDTO>) => {
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

}
