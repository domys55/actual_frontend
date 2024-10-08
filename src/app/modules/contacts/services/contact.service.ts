import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Contact } from "../models/contact.model";
import { APIResponse } from "../../../shared/models/APIResponse.model";
import { TablePagingDTO } from "../../../shared/models/TablePaging.model";
import { ContactTableDTO } from "../models/ContactTableDTO.model";

@Injectable({
    providedIn: 'root'
  })
  export class ContactService {
    private apiUrl = 'https://localhost:7046/Contact'; // Update with your API endpoint
    constructor(private http: HttpClient) { }
  
    getUsers(): Observable<APIResponse<Contact[]>> {
      return this.http.get<APIResponse<Contact[]>>(this.apiUrl);
    }
  
    getUserById(id: number): Observable<APIResponse<Contact>> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<APIResponse<Contact>>(url);
  
    }

    ContactPaged(tablePaging: TablePagingDTO): Observable<APIResponse<Contact[]>> {
      return this.http.post<APIResponse<Contact[]>>(`${this.apiUrl}/getpage`, tablePaging);

    }

    ContactPagedTable(tablePaging: TablePagingDTO): Observable<APIResponse<ContactTableDTO[]>> {
      return this.http.post<APIResponse<ContactTableDTO[]>>(`${this.apiUrl}/getpageTable`, tablePaging);

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

    deleteContact(id: number): Observable<APIResponse<Contact>> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<APIResponse<Contact>>(url);
    }
  
    ApiPersonPost(link: string): Observable<any> {
      const url = `${this.apiUrl}/${'link'}?link=${link}`; // Replace with your actual API endpoint
  
      return this.http.post(url,null);
    }
  }