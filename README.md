# Housekeeping SaaS Frontend

Angular application with Kanban board UI for task management, built with Angular Material and Firebase.

## Features

- 🎯 Kanban Board with drag-and-drop functionality
- 🔐 Firebase Authentication (Email/Password & Google)
- ⚡ Real-time updates with Firestore
- 📱 Responsive Material Design UI
- 🎨 Custom SCSS styling
- 🔒 Protected routes with Auth Guards

## Prerequisites

- Node.js (v16.x or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

## Installation

```bash
cd frontend
npm install
```

## Configuration

Update the Firebase configuration in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
  }
};
```

For production, update `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com/api',
  firebase: {
    // Your production Firebase config
  }
};
```

## Development Server

```bash
ng serve
# or
npm start
```

Navigate to `http://localhost:4200/`

The application will automatically reload if you change any of the source files.

## Build

```bash
# Development build
ng build

# Production build
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Running Tests

```bash
# Unit tests
ng test

# End-to-end tests
ng e2e
```

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── kanban-board/       # Main Kanban board component
│   │   │   ├── task-card/          # Individual task cards
│   │   │   ├── login/              # Login/Register page
│   │   │   ├── dashboard/          # Main dashboard
│   │   │   └── header/             # App header/navbar
│   │   ├── services/
│   │   │   ├── auth.service.ts     # Authentication logic
│   │   │   └── task.service.ts     # Task CRUD operations
│   │   ├── models/
│   │   │   ├── task.model.ts       # Task interface
│   │   │   └── user.model.ts       # User interface
│   │   ├── guards/
│   │   │   └── auth.guard.ts       # Route protection
│   │   ├── app.module.ts           # Main module
│   │   ├── app-routing.module.ts   # Routes configuration
│   │   └── app.component.ts        # Root component
│   ├── assets/                      # Static assets
│   ├── environments/                # Environment configs
│   ├── index.html                   # Main HTML
│   ├── main.ts                      # Bootstrap
│   └── styles.scss                  # Global styles
├── angular.json                     # Angular CLI config
├── package.json
├── tsconfig.json
└── README.md
```

## Key Components

### Kanban Board Component
- Drag-and-drop functionality using `@angular/cdk/drag-drop`
- Three columns: To Do, In Progress, Done
- Real-time updates from Firestore
- Task creation, editing, and deletion

### Login Component
- Email/Password authentication
- Google Sign-In
- Registration form with validation
- Material Design UI with tabs

### Dashboard Component
- Protected route (requires authentication)
- Contains header and Kanban board
- User profile menu

### Services

#### AuthService
```typescript
// Login
await this.authService.login(email, password);

// Register
await this.authService.register(email, password);

// Google Sign-In
await this.authService.loginWithGoogle();

// Logout
await this.authService.logout();

// Get current user
const user = this.authService.getCurrentUser();
```

#### TaskService
```typescript
// Get all tasks
this.taskService.getTasks().subscribe(tasks => {
  // Handle tasks
});

// Create task
await this.taskService.createTask(taskData);

// Update task
await this.taskService.updateTask(taskId, updateData);

// Update status (for Kanban)
await this.taskService.updateTaskStatus(taskId, newStatus);

// Delete task
await this.taskService.deleteTask(taskId);
```

## Styling

The application uses Angular Material with custom SCSS:
- Material Design color palette (Indigo/Pink)
- Responsive layout with flexbox
- Custom card styles for tasks
- Drag-and-drop visual feedback

### Customizing Theme

Edit `src/styles.scss` to customize the Material theme:

```scss
@use '@angular/material' as mat;

$custom-primary: mat.define-palette(mat.$indigo-palette);
$custom-accent: mat.define-palette(mat.$pink-palette);
$custom-theme: mat.define-light-theme((
  color: (
    primary: $custom-primary,
    accent: $custom-accent,
  )
));

@include mat.all-component-themes($custom-theme);
```

## Deployment

### Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize hosting:
```bash
firebase init hosting
```

4. Build and deploy:
```bash
ng build --configuration production
firebase deploy --only hosting
```

### Other Hosting Providers

#### Netlify
```bash
ng build --configuration production
# Upload dist/housekeeping-saas folder to Netlify
```

#### Vercel
```bash
npm install -g vercel
ng build --configuration production
vercel --prod
```

## Features Roadmap

- [ ] Task templates
- [ ] Bulk operations
- [ ] Filter and search tasks
- [ ] Task comments
- [ ] File attachments
- [ ] Email notifications
- [ ] Dark mode
- [ ] Calendar view
- [ ] Task analytics

## Troubleshooting

### Firebase Connection Issues
- Check Firebase config in environment files
- Verify Firebase project has Authentication and Firestore enabled
- Check browser console for specific errors

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Angular cache
rm -rf .angular
```

### CORS Errors
- Ensure backend CORS_ORIGIN matches frontend URL
- Check that backend is running

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT
