import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { APIResponse } from '../../../../shared/models/APIResponse.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit {

  contactrouteId!: number;

  form!: FormGroup;
  constructor(private contactService: ContactService, private fb: FormBuilder,
    private router: Router,private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      id:[0],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });
    

    this.route.params.subscribe((params) => {
      this.contactrouteId = +params['id'];
  });

  if (this.contactrouteId) {
    this.getContact(this.contactrouteId);
  }
}

  savePerson(form: FormGroup): void {
    console.log(this.form.value);
    if (this.form.valid) {
      const formData = this.form.value;
      const person: Contact = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        id:formData.id
        // Other properties...
      };
      this.contactService.savePerson(person).subscribe(savedPerson => {
        console.log('Person saved:', savedPerson);
        // Do additional actions if needed
        if (savedPerson != null) {
          this.router.navigate(['/contacts'])
        }
      });
    }
  }

  getContact(id: number): void {
    this.contactService.getUserById(id).subscribe({
      next: (response: APIResponse<Contact>) => {
        if (response.success) {
          //this.contact = response.data;
          this.form.patchValue(response.data);
        } else {
          //this.errorMessage = response.errorMessage;
        }
      },
      error: (error) => {
        console.error('Error fetching contact:', error);
        //this.errorMessage = 'An error occurred while fetching the contact.';
      }
    });
  }

}
