import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-student.html',
  styleUrl: './register-student.css'
})
export class RegisterStudentComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;
  private submitInProgress = false; // Prevent duplicate submissions

  departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'CHL'];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    // Form initialized in constructor
  }

  initializeForm() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required]
    });
  }

  onSubmit() {
    // Prevent duplicate submissions
    if (this.submitInProgress) {
      return;
    }

    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registrationForm.valid) {
      const email = this.registrationForm.get('email')?.value;
      
      // Check if email already exists
      if (this.studentService.emailExists(email)) {
        this.errorMessage = `A student with email "${email}" is already registered.`;
        this.submitted = false;
        return;
      }

      this.isSubmitting = true;
      this.submitInProgress = true;

      // Get current students to generate next ID
      this.studentService.getStudents().subscribe({
        next: (students: Student[]) => {
          const nextId = Math.max(...students.map(s => s.id), 0) + 1;

          const newStudent: Student = {
            id: nextId,
            name: this.registrationForm.get('name')?.value,
            email: this.registrationForm.get('email')?.value,
            department: this.registrationForm.get('department')?.value
          };

          // Add student to the service
          this.studentService.addStudent(newStudent).subscribe({
            next: () => {
              this.successMessage = `Student "${newStudent.name}" registered successfully!`;
              console.log('New student registered:', newStudent);
              this.registrationForm.reset();
              this.submitted = false;
              this.isSubmitting = false;
              this.submitInProgress = false;

              // Redirect to students page after 2 seconds
              setTimeout(() => {
                this.router.navigate(['/students']);
              }, 2000);
            },
            error: (err) => {
              this.errorMessage = 'Failed to register student. Please try again.';
              this.isSubmitting = false;
              this.submitInProgress = false;
              console.error(err);
            }
          });
        },
        error: (err) => {
          this.errorMessage = 'Failed to load existing students. Please try again.';
          this.isSubmitting = false;
          this.submitInProgress = false;
          console.error(err);
        }
      });
    }
  }

  get f() {
    return this.registrationForm.controls;
  }
}
