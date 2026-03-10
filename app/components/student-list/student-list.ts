import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import { FilterByPipe } from '../../pipes/filter-by.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule, FormsModule, FilterByPipe, HighlightDirective],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
  standalone: true
})
export class StudentListComponent implements OnInit, OnDestroy {
  get students$() {
    return this.studentService.students$;
  }
  
  searchText: string = '';
  error: string = '';
  private destroy$ = new Subject<void>();

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    // Observable is already initialized as a property from StudentService
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadStudents() {
    this.error = '';
  }
}
