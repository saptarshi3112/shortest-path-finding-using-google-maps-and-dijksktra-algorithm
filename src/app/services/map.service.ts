import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  link: String;

  constructor(private http: HttpClient) {
    this.link = "http://localhost:5000/map";
  }

  shortestPath(connection: any, map: Object, src: Number, dest: Number) {
    return this.http.post(`${this.link}/compute-shortest-path/`, {
      graph: connection,
      map: map,
      src: src,
      dest: dest
    }).pipe( (res:any) => (res) );
    
  }

}
