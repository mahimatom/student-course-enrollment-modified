# Student Enrollment System

A modern Angular-based student enrollment management system built with standalone components, reactive and template-driven forms, and real-time data persistence.

## Features

✅ **Student Management**
- Register new students with validation
- View all registered students
- Search and filter students
- Automatic duplicate email prevention
- localStorage persistence with auto-deduplication

✅ **Course Management**
- Browse available courses
- View course details (instructor, duration, available seats)
- Highlight courses with limited seats
- Search courses by title

✅ **Student Enrollment**
- Two enrollment methods:
  - **Template-Driven Forms**: Simple dropdown selection
  - **Reactive Forms**: Advanced form control with validation
- Dynamic student and course selection
- Enrollment date tracking
- Real-time form status validation

✅ **Technology Stack**
- **Framework**: Angular 21+
- **Forms**: Reactive & Template-Driven
- **Styling**: Material Design, SCSS
- **HTTP**: HttpClient with Interceptors
- **State Management**: RxJS Observables & BehaviorSubjects
- **Routing**: Angular Router with Route Guards
- **SSR**: Server-Side Rendering support
- **Testing**: Vitest

## Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/student-enrollment-system.git
cd student-enrollment-system

# Install dependencies
npm install

# Start development server
npm start
```

Navigate to `http://localhost:4201/` in your browser.

## Project Routes

- `/students` - View all registered students
- `/courses` - Browse available courses
- `/register` - Register a new student
- `/enroll` - Enroll student using template-driven form
- `/enroll-reactive` - Enroll student using reactive form
- `/enrollments` - View enrollment details

## Project Structure

```
src/app/
├── components/
│   ├── student-list/           # Display all students
│   ├── course-list/            # Display all courses
│   ├── register-student/       # Student registration form
│   ├── enroll-student/         # Template-driven enrollment form
│   ├── reactive-enroll/        # Reactive enrollment form
│   ├── enrollment-details/     # Show enrollment records
│   └── navbar/                 # Navigation component
├── services/
│   ├── student.service.ts      # Student CRUD operations
│   └── course.service.ts       # Course operations
├── models/
│   ├── student.ts
│   ├── course.ts
│   └── enrollment.ts
├── pipes/
│   ├── filter-by.pipe.ts       # Filter by name/title
│   └── highlight-limited.pipe.ts
├── directives/
│   ├── highlight.directive.ts
│   └── limited-seats.directive.ts
├── guards/
│   └── auth.guard.ts
└── interceptors/
    └── error.interceptor.ts
```

## Key Features Explained

### Duplicate Prevention
The system automatically prevents duplicate student registrations by:
- Checking email uniqueness before registration
- Auto-deduplicating on data load
- Manual deduplication available via service method

### Real-Time Updates
- New students immediately appear in enrollment dropdowns
- Course list updates in real-time
- BehaviorSubject ensures data consistency across components

### localStorage Persistence
- Student data persists across page refreshes
- Automatic backup to browser storage
- Data recovery on app restart

## Build

```bash
# Development build
npm run build

# Production build with optimization
npm run build -- --configuration production
```

## Testing

```bash
# Run unit tests
npm test
```

## API Data Sources

The application loads data from JSON files:
- `public/students.json` - Initial student data
- `public/courses.json` - Course catalog
- `public/enrollments.json` - Enrollment records

## GitHub Upload

See [GITHUB_SETUP.md](./GITHUB_SETUP.md) for detailed instructions on uploading this project to GitHub.

## Technologies Used

- **Angular 21+**: Modern web framework
- **TypeScript 5.9+**: Type-safe JavaScript
- **RxJS 7.8+**: Reactive programming
- **Angular Material**: UI components
- **Vitest**: Unit testing
- **Express**: Server-side rendering
- **Standalone Components**: Modern Angular pattern

## Known Limitations

- Data is stored in browser localStorage, not persisted to backend
- Enrollment form doesn't persist to database
- Authentication is mock-based only
- No real email validation

## Future Enhancements

- [ ] Connect to backend API
- [ ] Add database integration
- [ ] Implement real authentication
- [ ] Add email notifications
- [ ] Student dashboard
- [ ] Admin panel
- [ ] Mobile responsiveness improvements

## License

This project is open source and available under the MIT License.

## Author

Created as a student project for learning Angular standalone components and modern web development practices.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
