import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vista-alumno',
  templateUrl: './vista-alumno.component.html',
  styleUrls: ['./vista-alumno.component.scss'],
})
export class VistaAlumnoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('ngOnInit llamado');
  }

}
