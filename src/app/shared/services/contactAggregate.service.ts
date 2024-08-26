import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContactDTO } from "../models/ContactDTO.model";
import { APIResponse } from "../models/APIResponse.model";

@Injectable({
    providedIn: 'root'
  })
  export class ContactAggregateService {
    private apiUrl = 'https://localhost:7046/ContactAggregate'; // Update with your API endpoint
    constructor(private http: HttpClient) { }
  
    getUsers(): Observable<APIResponse<ContactDTO[]>> {
      return this.http.get<APIResponse<ContactDTO[]>>(this.apiUrl);
    }
  
    getUserById(id: number): Observable<APIResponse<ContactDTO>> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<APIResponse<ContactDTO>>(url);
  
    }

    
  
    savePerson(person: ContactDTO): Observable<APIResponse<ContactDTO>> {
      if (person.id) {
        // If the person has an ID, update (Assuming your API supports updating)
        const url = `${this.apiUrl}`;//${person.id}
        return this.http.put<APIResponse<ContactDTO>>(url, person);
      } else {
        // If the person does not have an ID, create a new one
        return this.http.post<APIResponse<ContactDTO>>(this.apiUrl, person);
      }
    }
  
    deletePerson(id: number): Observable<any> {
      const url = `${this.apiUrl}?id=${id}`; // Replace with your actual API endpoint
  
      return this.http.delete(url);
    }

    deleteContact(id: number): Observable<APIResponse<ContactDTO>> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<APIResponse<ContactDTO>>(url);
    }
  
    ApiPersonPost(link: string): Observable<any> {
      const url = `${this.apiUrl}/${'link'}?link=${link}`; // Replace with your actual API endpoint
  
      return this.http.post(url,null);
    }
  }