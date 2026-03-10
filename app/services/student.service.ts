import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = './students.json';
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  public students$ = this.studentsSubject.asObservable();
  private dataLoaded = false;
  private readonly STORAGE_KEY = 'enrollmentSystem_students';

  constructor(private http: HttpClient) {
    this.loadInitialStudents();
  }

  private loadInitialStudents() {
    // First, try to load from localStorage (persisted students)
    let storedStudents = this.getStoredStudents();
    
    if (storedStudents.length > 0) {
      // Deduplicate stored students by email before using them
      storedStudents = this.deduplicateStudents(storedStudents);
      // If we have stored students, use them
      this.studentsSubject.next(storedStudents);
      this.dataLoaded = true;
    } else {
      // Otherwise, load from JSON file
      this.http.get<any>(this.apiUrl).pipe(
        map((data: any) => data.students || [])
      ).subscribe(students => {
        this.studentsSubject.next(students);
        this.saveStudentsToStorage(students);
        this.dataLoaded = true;
      });
    }
  }

  getStudents(): Observable<Student[]> {
    // Return the observable from the BehaviorSubject directly
    // This preserves newly added students
    return this.students$;
  }

  getStudentById(id: number): Observable<Student | undefined> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data: any) => (data.students || []).find((s: Student) => s.id === id))
    );
  }

  addStudent(student: Student): Observable<Student> {
    // Add to the BehaviorSubject immediately for real-time updates
    const currentStudents = this.studentsSubject.value;
    const updatedStudents = [...currentStudents, student];
    this.studentsSubject.next(updatedStudents);
    
    // Persist to localStorage
    this.saveStudentsToStorage(updatedStudents);

    // In a real application, this would make a POST request
    return new Observable(observer => {
      observer.next(student);
      observer.complete();
    });
  }

  // Save students to localStorage
  private saveStudentsToStorage(students: Student[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(students));
    } catch (error) {
      console.error('Failed to save students to localStorage:', error);
    }
  }

  // Get students from localStorage
  private getStoredStudents(): Student[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to retrieve students from localStorage:', error);
      return [];
    }
  }

  // Get current students synchronously
  getCurrentStudents(): Student[] {
    return this.studentsSubject.value;
  }

  // Remove duplicate students - keeps first occurrence of each email
  private deduplicateStudents(students: Student[]): Student[] {
    const seen = new Set<string>();
    return students.filter(student => {
      const emailLower = student.email.toLowerCase();
      if (seen.has(emailLower)) {
        return false;
      }
      seen.add(emailLower);
      return true;
    });
  }

  // Check if a student with given email already exists
  emailExists(email: string): boolean {
    const currentStudents = this.studentsSubject.value;
    return currentStudents.some(student => student.email.toLowerCase() === email.toLowerCase());
  }

  // Remove duplicate students (keep first occurrence of each email)
  removeDuplicates(): void {
    const currentStudents = this.studentsSubject.value;
    const deduplicatedStudents = this.deduplicateStudents(currentStudents);
    
    this.studentsSubject.next(deduplicatedStudents);
    this.saveStudentsToStorage(deduplicatedStudents);
  }

  // Clear all registered students (useful for testing)
  clearRegisteredStudents(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      this.loadInitialStudents();
    } catch (error) {
      console.error('Failed to clear students:', error);
    }
  }
}
