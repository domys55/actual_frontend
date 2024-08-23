import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Contact } from "../models/contact.model";
import { APIResponse } from "../../../shared/models/APIResponse.model";

@Injectable({
    providedIn: 'root'
  })
  export class ContactService {
    private apiUrl = 'https://localhost:7046/Contact'; // Update with your API endpoint
    constructor(private http: HttpClient) { }
  
    getUsers(): Observable<APIResponse<Contact[]>> {
      return this.http.get<APIResponse<Contact[]>>(this.apiUrl);
    }
  
    getUserById(id: number): Observable<Contact> {
      const url = `${this.apiUrl}/single?id=${id}`;
      return this.http.get<Contact>(url);
  
    }
    
  
    savePerson(person: Contact): Observable<Contact> {
      if (person.id) {
        // If the person has an ID, update (Assuming your API supports updating)
        const url = `${this.apiUrl}`;//${person.id}
        return this.http.put<Contact>(url, person);
      } else {
        // If the person does not have an ID, create a new one
        return this.http.post<Contact>(this.apiUrl, person);
      }
    }
  
    deletePerson(id: number): Observable<any> {
      const url = `${this.apiUrl}?id=${id}`; // Replace with your actual API endpoint
  
      return this.http.delete(url);
    }
  
    ApiPersonPost(link: string): Observable<any> {
      const url = `${this.apiUrl}/${'link'}?link=${link}`; // Replace with your actual API endpoint
  
      return this.http.post(url,null);
    }
  }