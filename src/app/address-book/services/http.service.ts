import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
    constructor(private httpClient: HttpClient) { }

    public get(url: string): Observable<any> {
        return this.httpClient.get(url);
    }

    public post(url: string, args: any): Observable<any> {
        return this.httpClient.post(url, args);
    }

    public put(url: string, args: any): Observable<any> {
        return this.httpClient.put(url, args);
    }

    public patch(url: string, args: any): Observable<any> {
        return this.httpClient.patch(url, args);
    }

    public delete(url: string): Observable<any> {
        return this.httpClient.delete(url);
    }
}
