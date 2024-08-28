import { Component } from '@angular/core';
import { ContactDTO } from '../../../../shared/models/ContactDTO.model';
import { ContactAggregateService } from '../../../../shared/services/contactAggregate.service';
import { APIResponse } from '../../../../shared/models/APIResponse.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent {
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
}
