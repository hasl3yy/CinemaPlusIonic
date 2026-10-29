import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCardTitle, IonCardHeader, IonCard, IonContent, IonBadge, IonButton } from '@ionic/angular';


@Component({
    selector: 'app-funciones',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './funciones.component.html', // <-- Asegúrate de que coincida la extensión
    styleUrls: ['./funciones.component.css'],     // <-- Asegúrate de que coincida la extensión


})
export class FuncionesComponent implements OnInit { // <-- ¡Importante el 'export' y que sea 'Component'!

    constructor() { }

    ngOnInit() {
    }

}
