import { Component, OnInit } from '@angular/core';
import { SetsService } from '../services/sets.service';
import { ISets } from '../Interfaces/ISets';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit {
  userId: number = 1;
  sets: any[] = [];

  constructor(
    private set: SetsService,
  ) { }

  ngOnInit(): void {
    this.set.getSets().subscribe({
      next: (data) => {
        this.sets = data as unknown as ISets[];
        console.log(this.set);
        console.log(this.sets);
      }
    });
  }

}
