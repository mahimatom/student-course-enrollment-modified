import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { FilterByPipe } from '../../pipes/filter-by.pipe';
import { HighlightLimitedPipe } from '../../pipes/highlight-limited.pipe';
import { LimitedSeatsDirective } from '../../directives/limited-seats.directive';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, FormsModule, FilterByPipe, HighlightLimitedPipe, LimitedSeatsDirective],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  searchText: string = '';
  isLoading: boolean = true;
  error: string = '';

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.isLoading = true;
    this.courseService.getCourses().subscribe({
      next: (data: Course[]) => {
        this.courses = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load courses';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
