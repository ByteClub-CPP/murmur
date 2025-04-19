## Development Setup

1. Clone the repository
```bash
git clone <repository-url>
cd murmur
```

2. Install dependencies
```bash
cd client
npm install
```

3. Request Firebase credentials from team lead

4. Create `.env` file with provided credentials

5. Start development server
```bash
npm run dev
```

## Authentication Setup

### Required Dependencies
```bash
npm install firebase @types/firebase react-router-dom
```

### Environment Configuration
Create `.env` file in client directory:
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Available Auth Features
- Email/Password Authentication
- Protected Routes
- User Context Access
- Automatic & Manual Sign Out

### Accessing Current User
```typescript
import { useAuth } from '../hooks/useAuth';

function YourComponent() {
  const { user } = useAuth();
  // Access user.uid for database operations
}
```

## Testing Authentication

1. Start the development server
2. Navigate to /signin
3. Create a test account using /signup
4. Verify protected routes at /dashboard
5. Test logout functionality