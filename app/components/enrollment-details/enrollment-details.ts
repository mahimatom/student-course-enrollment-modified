import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  enrollmentDate: string;
  status: string;
}

@Component({
  selector: 'app-enrollment-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enrollment-details.html',
  styleUrl: './enrollment-details.css'
})
export class EnrollmentDetailsComponent implements OnInit, OnDestroy {
  private _enrollments$?: Observable<any[]>;

  get enrollments$(): Observable<any[]> {
    if (!this._enrollments$) {
      this._enrollments$ = this.http.get<any>('./enrollments.json').pipe(
        map(data => this.enrichEnrollmentData(data.enrollments)),
        takeUntil(this.destroy$)
      );
    }
    return this._enrollments$;
  }

  error = '';
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Observable is lazily initialized on first access via the getter
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  enrichEnrollmentData(enrollments: Enrollment[]) {
    // In a real app, you'd join this data from services
    return enrollments.map(e => ({
      ...e,
      studentName: this.getStudentName(e.studentId),
      courseName: this.getCourseName(e.courseId)
    }));
  }

  getStudentName(id: number): string {
    const students = ['', 'Asha', 'Bala', 'Charu', 'Dhanesh', 'Emilia', 'Farhan', 'Gita', 'Harsh'];
    return students[id] || 'Unknown';
  }

  getCourseName(id: number): string {
    const courses = ['', 'Angular', 'Python', 'React', 'Java', 'TypeScript', 'Node.js', 'MongoDB', 'SQL'];
    return courses[id] || 'Unknown';
  }
}
