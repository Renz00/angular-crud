import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Post } from '../../../types';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CardModule, EditPopupComponent, ConfirmPopupModule],
  providers: [ConfirmationService],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  constructor(
    private confirmationService: ConfirmationService
  ){}

  @ViewChild('deleteButton') deleteButton: any;

  @Input() post!: Post; // passing data to post component from home component, similar to Vue props
  @Output() edit: EventEmitter<Post> = new EventEmitter<Post>() // passing data from post to home component, similar to emits in Vue
  @Output() delete: EventEmitter<number> = new EventEmitter<number>() // passing data from post to home component, similar to emits in Vue

  editPost() {
    this.edit.emit(this.post); // using the emit to send post data to home component when edit button is clicked
  }

  deletePost() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement, // assign the confirm dialog to the HTML element of deleteButton
      message: "Are your sure?",
      accept: () => {
        if (this.post.id === 0 || !this.post.id) return;
        this.delete.emit(this.post.id);
      }
    })
  }

  ngOnInit() {
  }
}
