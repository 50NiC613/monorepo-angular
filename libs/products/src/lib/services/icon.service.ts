import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class IconService {
  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) { }

  icons: any[] = [];

  selectedIcon: any;

  apiUrl = '../../assets/icons.json';

  getBaseUrl() {
    return `${this.document.location.protocol}//${this.document.location.host}/`;
  }

  getIcons() {
    const apiUrl = this.getBaseUrl() + this.apiUrl;

    return this.http.get('assets/demo/data/icons.json').pipe(
      map((response: any) => {
        console.log(response)
        this.icons = response.icons;
        return this.icons;
      })
    );
  }
  getCountries() {
    return this.http.get<any>('assets/demo/data/countries.json')
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
  }
}
