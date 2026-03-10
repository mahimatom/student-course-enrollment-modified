import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { FilterByPipe } from '../../pipes/filter-by.pipe';
import { HighlightLimitedPipe } from '../../pipes/highlight-limited.pipe';
import { LimitedSeatsDirective } from '../../directives/limited-seats.directive';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, FormsModule, FilterByPipe, HighlightLimitedPipe, LimitedSeatsDirective],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
  standalone: true
})
export class CourseListComponent implements OnInit, OnDestroy {
  private _courses$?: Observable<Course[]>;

  get courses$(): Observable<Course[]> {
    if (!this._courses$) {
      this._courses$ = this.courseService.getCourses();
    }
    return this._courses$;
  }

  searchText: string = '';
  error: string = '';
  private destroy$ = new Subject<void>();

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    // Observable is already initialized as a property
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCourses() {
    this.error = '';
  }
}
