import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = './courses.json';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => data.courses)
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => data.courses.find((c: Course) => c.id === id))
    );
  }

  addCourse(course: Course): Observable<Course> {
    // In a real application, this would make a POST request
    return new Observable(observer => {
      observer.next(course);
      observer.complete();
    });
  }
}
