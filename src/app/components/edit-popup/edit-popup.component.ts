import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Post } from '../../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, ButtonModule, CommonModule, FormsModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css'
})
export class EditPopupComponent {
  @Input() display: boolean = true;
  @Input() header!: string;
  @Output() confirm = new EventEmitter<Post>();
  @Output() cancel = new EventEmitter<boolean>();

  @Input() post: Post = { // init as empty
    'userId': 0,
    'id': 0,
    'title': '',
    'body': '',
  }

  onConfirm() {
    if (this.post.userId == 0) this.post.userId = Math.round((Math.random() * 10) + 1); // generate an int from 1 to 10
    this.confirm.emit(this.post); // emitting event to home component
  }

  onCancel() {
    this.display = false;
    this.cancel.emit(this.display);
  }

}
