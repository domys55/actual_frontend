import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { APIResponse } from '../../../../shared/models/APIResponse.model';
import { ContactDTO } from '../../../../shared/models/ContactDTO.model';
import { ContactAggregateService } from '../../../../shared/services/contactAggregate.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit {

  contactrouteId!: number;
  errorMessage: string | null = null;
  form!: FormGroup;
  constructor(private contactService: ContactAggregateService, private fb: FormBuilder,
    private router: Router,private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      id:[0],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      

      phoneNumbers: this.fb.array([this.createPhoneGroup(true)]), // Initial phone number
      addresses: this.fb.array([this.createAddressGroup(true)]) // Initial address
    });
    

    this.route.params.subscribe((params) => {
      this.contactrouteId = +params['id'];
  });

  if (this.contactrouteId) {
    this.getContact(this.contactrouteId);
  }
}

createPhoneGroup(first:Boolean): FormGroup {
  return this.fb.group({
    id: [0], // Assuming new phone starts with ID 0
    contactId: [0],
    number: ['', Validators.required],
    primary: [first, Validators.required]
  });
}

createAddressGroup(first:Boolean): FormGroup {
  return this.fb.group({
    id: [0], // Assuming new address starts with ID 0
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    primary: [first, Validators.required],
    contactId: [0] // This should be set when creating a new contact
  });
}

  savePerson(form: FormGroup): void {
    console.log(this.form.value);
    if (this.form.valid) {
      const formData = this.form.value;
      const contact: ContactDTO= {
        firstName: formData.firstName,
        lastName: formData.lastName,
        id:formData.id,
        phoneNumbers:formData.phoneNumbers,
        addresses:formData.addresses
        
        // Other properties...
      };
      this.contactService.savePerson(contact).subscribe(savedPerson => {
        console.log('Person saved:', savedPerson);
        // Do additional actions if needed
        if (savedPerson != null) {
          this.router.navigate(['/contacts'])
        }
      });
    }
  }

  getContact(id: number): void {
    this.contactService.getContactById(id).subscribe({
      next: (response: APIResponse<ContactDTO>) => {
        if (response.success) {
          //this.contact = response.data;
          for (let i = 0; i < response.data.addresses.length-1; i++) {
            this.addAddress(false);
          }
          for (let i = 0; i < response.data.phoneNumbers.length-1; i++) {
            this.addPhoneNumber(false);
          }

          this.form.patchValue(response.data);
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

  getFormGroup(index: number): FormGroup {
    return this.phoneNumbers.at(index) as FormGroup;
  }
  getFormGroupaddr(index: number): FormGroup {
    return this.addresses.at(index) as FormGroup;
  }

  get phoneNumbers(): FormArray {
    return this.form.get('phoneNumbers') as FormArray;
  }

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  addPhoneNumber(first:Boolean) {
    
    this.phoneNumbers.push(this.createPhoneGroup(first));
  }

  addAddress(first:Boolean) {
    this.addresses.push(this.createAddressGroup(first));
  }

  removePhoneNumber(index: number) {
    if(index!=0){
      

      if(this.phoneNumbers.at(index).get('primary')?.value===true){
        this.getFormGroup(index--)
          .get('primary')
          ?.setValue(true);
      }
      this.phoneNumbers.removeAt(index);
    }
    
    
  }

  removeAddress(index: number) {
    if(index!=0){
      if(this.addresses.at(index).get('primary')?.value===true){
        this.getFormGroupaddr(index--)
          .get('primary')
          ?.setValue(true);
      }
      this.addresses.removeAt(index);
    }
    
  }

  onIsPrimaryContactChecked(index: number, grp:string) {

    if(grp==="addr"){
      for (let i = 0; i < this.addresses.length; i++) {
     
        if (i == index) continue;
    
        this.getFormGroupaddr(i)
          .get('primary')
          ?.setValue(false);
      }

    }else{
      for (let i = 0; i < this.phoneNumbers.length; i++) {
     
        if (i == index) continue;
    
        this.getFormGroup(i)
          .get('primary')
          ?.setValue(false);
      }

    }

   
  }
}
