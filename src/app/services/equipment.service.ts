import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEquipment } from '@app/Interfaces/IEquipment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  productURL = '/api/equipment';
  constructor(private http: HttpClient) { }
  getEquipment(): Observable<IEquipment[]> {
    return this.http.get<IEquipment[]>(this.productURL);
  }
}
