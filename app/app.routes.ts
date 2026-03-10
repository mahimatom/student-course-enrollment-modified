import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list';
import { CourseListComponent } from './components/course-list/course-list';
import { EnrollStudentComponent } from './components/enroll-student/enroll-student';
import { ReactiveEnrollComponent } from './components/reactive-enroll/reactive-enroll';
import { EnrollmentDetailsComponent } from './components/enrollment-details/enrollment-details';
import { RegisterStudentComponent } from './components/register-student/register-student';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'students', component: StudentListComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'register', component: RegisterStudentComponent },
  { path: 'enroll', component: EnrollStudentComponent },
  { path: 'enroll-reactive', component: ReactiveEnrollComponent },
  { path: 'enrollments', component: EnrollmentDetailsComponent },
  { path: '', redirectTo: 'students', pathMatch: 'full' }
];
