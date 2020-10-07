import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { ISets } from '../Interfaces/ISets';



@Injectable({
  providedIn: 'root',
})
export class SetsService {
  productURL = environment.apiUrl + '/sets';
  currentSet:BehaviorSubject<ISets>;

  constructor(private http: HttpClient) {
    this.currentSet = new BehaviorSubject<ISets>(JSON.parse(localStorage.getItem("set")));
  }

  public get editingSet() {
    return this.currentSet.value;
  }
  public set changingSet(newSet:ISets) {
    localStorage.setItem("set", JSON.stringify(newSet));
    this.currentSet.next(newSet);
  }

  getSets(): Observable<ISets> {
    return this.http.get<ISets>(this.productURL);
  }
  getSetsByUserId(id:number): Observable<ISets[]> {
    return this.http.get<ISets[]>(this.productURL + `?user=${id}`);
  }
  deleteSet(id:number): Observable<ISets> {
    console.log("deleting set" + id);
    return this.http.delete<ISets>(this.productURL + `/${id}`);
  }
  createSet(set): Observable<ISets> {
    console.log("creating set");
    return this.http.post<ISets>(this.productURL, set);
  }
  editSet(set): Observable<ISets> {
    console.log("editing set http");
    this.clearCurrentSet();
    return this.http.put<ISets>(this.productURL + `/${set.id}`, set);
  }
  clearCurrentSet() {
    localStorage.removeItem("set");
    this.currentSet.next(null);
  }
}
