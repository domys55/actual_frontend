import { ContactDTO } from "./ContactDTO.model";

export interface TablePagingDTO {
    search:string;
    page: number;
    recordNo:number;
    recordCount:number;
    records: ContactDTO[];
  }

  export class TablePaging implements TablePagingDTO {
    search:string;
    page: number;
    recordNo: number;
    recordCount: number;
    records: ContactDTO[];
  
    constructor(search="",page: number = 1, recordNo: number = 0, recordCount: number = 0, records: ContactDTO[] = []) {
      this.search=search;
      this.page = page;
      this.recordNo = recordNo;
      this.recordCount = recordCount;
      this.records = records;
    }
  
    // Method to update the page number
    setPage(newPage: number): void {
      this.page = newPage;
    }

    setSearch(searchterm: string): void {
      this.search = searchterm;
    }
  
    // Method to update the records
    setRecords(newRecords: ContactDTO[]): void {
      this.records = newRecords;
    }
  
    // Method to update record count
    setRecordCount(count: number): void {
      this.recordCount = count;
    }
  
    // Method to get the current page of records
    getCurrentPageRecords(): ContactDTO[] {
      return this.records;
    }
  }