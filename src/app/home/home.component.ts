import { Component, ViewChild } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../../types';
import { PostComponent } from '../components/post/post.component';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostComponent, CommonModule, PaginatorModule, EditPopupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private postsService: PostsService
  ){}

  posts: Array<Post> = [];
  defaultPage: number = 1;
  perPage: number = 10;
  totalRecords: number = 100;

  displayAddPopup: boolean = false;
  displayEditPopup: boolean = false;

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  toggleEditPopup(post: Post) {
    this.displayEditPopup = true;
    this.selectedPost = post;
  }

  selectedPost: Post = {
    'userId': 0,
    'id': 0,
    'title': '',
    'body': '',
  }

  onClosePopup(display: boolean) {
    console.log('Display edit dialog: ', display);
    this.displayAddPopup = display;
    this.displayEditPopup = display;
  }

  onConfirmAdd(post: Post) {
    this.addPost(post);
    this.displayAddPopup = false;
  }

  onConfirmEdit(post: Post) {
    if (this.selectedPost.id == 0 || !this.selectedPost.id) {
      alert('No post id.')
      return;
    }
    this.editPost(post, this.selectedPost.id);
    this.displayEditPopup = false;
  }

  onConfirmDelete(id: number) {
    console.log('Deleting: ', id);
    this.deletePost(id);
  }

  onPostOutput(post: Post) {
    console.log('Post output: ', post);
  }

  onPageChange(event: any) {
    console.log('Page: ', event.page);
    console.log('Rows: ', event.rows);
    this.fetchPosts(event.page, event.rows);
  }

  fetchPosts(page: number, perPage: number) {
    this.postsService
    .getPosts(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_per_page=${perPage}`,
      { /* params obj here */ }
    )
    .subscribe({
        next: (posts: Array<Post>) => {
          this.posts = posts;
          console.log('Total records', posts.length);
        },
        error: (error: any) => {
          console.log('Failed: ', error)
        },
      });
  }

  addPost(post: Post) {
    this.postsService
    .addPost(
      `https://jsonplaceholder.typicode.com/posts/`,
      post
    )
    .subscribe({
        next: (data: any) => {
          console.log('Success: ', data)
        },
        error: (error: any) => {
          console.log('Failed: ', error)
        },
      });
  }

  editPost(post: Post, id: number) {
    this.postsService
    .editPost(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      post
    )
    .subscribe({
        next: (data: any) => {
          console.log('Success: ', data)
        },
        error: (error: any) => {
          console.log('Failed: ', error)
        },
      });
  }

  deletePost(id: number) {
    this.postsService
    .deletePost(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    )
    .subscribe({
        next: (data: any) => {
          console.log('Success: ', data)
        },
        error: (error: any) => {
          console.log('Failed: ', error)
        },
      });
  }

  ngOnInit() {
    this.fetchPosts(this.defaultPage, this.perPage);
  }

}
