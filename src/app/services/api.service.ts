import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from
'@angular/common/http';
import { retry} from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*'
    })
    }
    // Se establece la base url del API a consumir
    apiURL = 'https://jsonplaceholder.typicode.com/users';
    // Se declara la variable http de tipo HttpClient
    constructor(private http:HttpClient) { }

    getUsers():Observable<any>{
      return this.http.get(this.apiURL).pipe(
      retry(3)
      )
    }
}
