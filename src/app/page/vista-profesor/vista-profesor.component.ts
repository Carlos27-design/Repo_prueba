import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vista-profesor',
  templateUrl: './vista-profesor.component.html',
  styleUrls: ['./vista-profesor.component.scss'],
})
export class VistaProfesorComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('ngOnInit llamado');
  }

}
