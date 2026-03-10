import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import { FilterByPipe } from '../../pipes/filter-by.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule, FormsModule, FilterByPipe, HighlightDirective],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.css'
})
export class StudentListComponent implements OnInit, OnDestroy {
  students: Student[] = [];
  searchText: string = '';
  isLoading: boolean = true;
  error: string = '';
  private studentSubscription: Subscription | undefined;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  ngOnDestroy() {
    if (this.studentSubscription) {
      this.studentSubscription.unsubscribe();
    }
  }

  loadStudents() {
    this.isLoading = true;
    // Unsubscribe from previous subscription if any
    if (this.studentSubscription) {
      this.studentSubscription.unsubscribe();
    }
    
    this.studentSubscription = this.studentService.getStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
        this.isLoading = false;
        console.log('Students loaded:', data);
      },
      error: (err) => {
        this.error = 'Failed to load students';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
