import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEquipment } from '@app/Interfaces/IEquipment';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  productURL = environment.apiUrl + '/equipment';
  constructor(private http: HttpClient) { }
  getEquipment(): Observable<IEquipment[]> {
    return this.http.get<IEquipment[]>(this.productURL);
  }
}
