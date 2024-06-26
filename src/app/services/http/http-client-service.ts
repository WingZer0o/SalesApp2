import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class HttpClientService {
    constructor(private httpClient: HttpClient) {

    }

    public get(url: string): Observable<any> {
        return this.httpClient.get(url);
    }

    public post(url: string, body: any): Observable<any> {
        return this.httpClient.post(url, body);
    }

    public delete(url: string): Observable<any> {
        return this.httpClient.delete(url);
    }
}