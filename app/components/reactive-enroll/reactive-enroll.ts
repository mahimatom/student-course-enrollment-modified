import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { Student } from '../../models/student';
import { Course } from '../../models/course';

@Component({
  selector: 'app-reactive-enroll',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-enroll.html',
  styleUrl: './reactive-enroll.css'
})
export class ReactiveEnrollComponent implements OnInit {
  enrollmentForm!: FormGroup;
  submitted = false;
  successMessage = '';

  get students$() {
    return this.studentService.students$;
  }

  get courses$() {
    return this.courseService.getCourses();
  }

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private courseService: CourseService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    // Observables handle data loading automatically via async pipe in template
  }

  initializeForm() {
    this.enrollmentForm = this.fb.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required],
      enrollmentDate: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.enrollmentForm.valid) {
      this.successMessage = 'Student enrolled successfully!';
      console.log(this.enrollmentForm.value);
      this.enrollmentForm.reset();
      this.submitted = false;
      setTimeout(() => this.successMessage = '', 3000);
    }
  }

  get f() {
    return this.enrollmentForm;
  }
}
