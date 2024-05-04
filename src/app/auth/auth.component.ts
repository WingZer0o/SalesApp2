import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../modules/material.module';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [RouterModule, MaterialModule ]
})
export class AuthComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
