import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-enroll-student',
  imports: [CommonModule, FormsModule],
  templateUrl: './enroll-student.html',
  styleUrl: './enroll-student.css',
  standalone: true
})
export class EnrollStudentComponent {
  get students$() {
    return this.studentService.students$;
  }

  get courses$() {
    return this.courseService.getCourses();
  }

  constructor(
    private studentService: StudentService,
    private courseService: CourseService
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Data:', form.value);
      alert('Student enrolled successfully!');
      form.resetForm();
    }
  }
}
