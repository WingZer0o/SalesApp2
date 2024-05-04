import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../modules/material.module';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule]
})
export class ChatComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }
}
