# Secure E-Voting System - Frontend Documentation

## 📋 Project Overview

A modern, professional React-based frontend for a secure e-voting system. Built with **React 19**, **Vite**, **Tailwind CSS 4**, and **React Router**, featuring a SaaS-style admin dashboard with real-time voting capabilities.

---

## 🎯 Features

### Core Features
- ✅ User authentication (Login/Signup)
- ✅ JWT-based session management
- ✅ Dashboard with statistics and quick actions
- ✅ Candidate voting interface
- ✅ Live election results with charts
- ✅ Admin candidate management
- ✅ User profile management
- ✅ Responsive design (mobile-first)
- ✅ Protected routes with authentication

### UI Components
- Sidebar navigation with role-based access
- Responsive navbar with user menu
- Dashboard cards for statistics
- Candidate voting cards
- Interactive charts (Recharts)
- Form validations
- Loading states and error handling

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── assets/                 # Static assets (images, icons)
│   ├── components/
│   │   ├── cards/
│   │   │   ├── CandidateCard.jsx      # Candidate voting card
│   │   │   ├── DashboardCard.jsx      # Statistics card
│   │   │   └── VoteButton.jsx         # Vote action button
│   │   └── layout/
│   │       ├── Layout.jsx             # Main app layout wrapper
│   │       ├── Navbar.jsx             # Top navigation bar
│   │       └── Sidebar.jsx            # Side navigation menu
│   ├── contexts/
│   │   └── AuthContext.jsx            # Global auth state
│   ├── hooks/
│   │   └── useAuth.js                 # Custom auth hook
│   ├── pages/
│   │   ├── Candidates.jsx             # Admin candidate management
│   │   ├── Dashboard.jsx              # Main dashboard (stats + charts)
│   │   ├── Login.jsx                  # Authentication login
│   │   ├── Profile.jsx                # User profile & password change
│   │   ├── Results.jsx                # Election results with charts
│   │   ├── Signup.jsx                 # User registration
│   │   └── Vote.jsx                   # Candidate voting interface
│   ├── services/
│   │   ├── api.js                     # Axios HTTP client
│   │   └── auth.js                    # Authentication service
│   ├── App.jsx                        # Main app with routing
│   ├── App.css                        # Global app styles
│   ├── index.css                      # Tailwind CSS + global styles
│   ├── main.jsx                       # React entry point
│   └── vite-env.d.ts                  # Vite environment types
├── public/                            # Static public assets
├── .env.local                         # Environment variables
├── postcss.config.js                  # PostCSS configuration
├── tailwind.config.js                 # Tailwind CSS configuration
├── vite.config.js                     # Vite build configuration
├── package.json                       # Dependencies
├── eslint.config.js                   # ESLint configuration
└── README.md                          # Frontend readme
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm installed
- Backend API running on `http://localhost:5000`

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo "VITE_API_BASE_URL=http://localhost:5000" > .env.local
```

### Development

```bash
# Start dev server (opens at http://localhost:5173)
npm run dev

# Run ESLint
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔑 Key Technologies

### Core
- **React 19** - UI library with hooks and functional components
- **Vite** - Next-generation build tool (fast HMR, optimized builds)
- **React Router v7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework

### HTTP & State
- **Axios** - HTTP client for API calls
- **React Context API** - Global authentication state

### Charts & Data
- **Recharts** - Composable charting library

### Dev Tools
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS transformations

---

## 🔐 Authentication Flow

### Login
```
User enters Aadhar + Password 
  → /user/login (POST)
  → Receives JWT token
  → Stores in localStorage
  → Sets Authorization header
  → Redirects to dashboard
```

### Signup
```
User fills registration form
  → /user/signup (POST)
  → Validates Aadhar (12 digits)
  → Creates user account
  → Returns JWT token
  → Auto-login and redirect
```

### Protected Routes
All authenticated routes are wrapped with `<ProtectedRoute>` component which:
- Checks for valid token
- Redirects to login if missing
- Shows loading state while verifying

---

## 📱 Page Documentation

### 1. Login (`/login`)
**Unprotected page**
- Aadhar card number (12 digits)
- Password input
- Link to signup
- Error handling
- Loading state

### 2. Signup (`/signup`)
**Unprotected page**
- Collects: name, age, address, aadhar, password
- Validates aadhar format
- Creates voter or admin accounts
- Auto-login on success

### 3. Dashboard (`/dashboard`)
**Protected page**
- Statistics cards:
  - Total voters
  - Total votes cast
  - Total candidates
- Bar chart: Vote distribution by party
- Latest candidates grid
- Quick action buttons (Vote Now, View Results)
- Responsive grid layout

### 4. Vote (`/vote`)
**Protected page**
- Display all candidates
- Each candidate card shows:
  - Generated avatar
  - Name
  - Party affiliation
  - Age
  - Vote button
- Disables vote button if user already voted
- Shows voting status
- Success/error messages

### 5. Results (`/results`)
**Protected page**
- Bar chart: Votes per party
- Vote breakdown table
- Total votes cast
- Real-time updates

### 6. Candidates (`/candidates`)
**Admin-only page**
- Form to add new candidates
  - Name, party, age inputs
  - Create button
- Current candidates list
  - Edit (updates via prompt)
  - Delete with confirmation
- Role check (redirects non-admins)

### 7. Profile (`/profile`)
**Protected page**
- View account details:
  - Name, age, address, aadhar
  - Role, voting status
- Change password:
  - Current password
  - New password
  - Confirm password
  - Validation

---

## 🔌 API Integration

### Base URL
```
http://localhost:5000
```

### Authentication
All authenticated requests use Bearer token:
```javascript
Authorization: Bearer <JWT_TOKEN>
```

### API Endpoints Used

| Method | Endpoint | Protected | Purpose |
|--------|----------|-----------|---------|
| POST | `/user/signup` | No | Register new user |
| POST | `/user/login` | No | Authenticate user |
| GET | `/user/profile` | Yes | Get user details |
| PUT | `/user/profile/password` | Yes | Change password |
| GET | `/candidates` | No | List all candidates |
| POST | `/candidates` | Yes | Create candidate (admin) |
| PUT | `/candidates/:id` | Yes | Update candidate (admin) |
| DELETE | `/candidates/:id` | Yes | Delete candidate (admin) |
| GET | `/candidates/vote/:id` | Yes | Cast vote |
| GET | `/candidates/vote/count` | No | Get vote tallies |

---

## 🎨 Design System

### Color Palette
- **Brand Primary**: `#6366f1` (Indigo)
- **Brand Secondary**: `#4f46e5` (Deep Indigo)
- **Success**: `#10b981` (Emerald)
- **Error**: `#ef4444` (Rose)
- **Neutral**: Slate scale (50-900)

### Component Styles
- **Spacing**: Tailwind scale (4px, 8px, 16px, etc.)
- **Border Radius**: Rounded (8px) to rounded-full (999px)
- **Shadows**: Subtle shadows for depth
- **Typography**: System fonts with brand colors

### Responsive Breakpoints
- **Mobile**: Default styles
- **Tablet**: `sm:` (640px), `md:` (768px)
- **Desktop**: `lg:` (1024px), `xl:` (1280px)

---

## 🛠️ Core Services

### `services/api.js`
Axios instance with base configuration:
```javascript
// Create requests
api.post('/user/login', data)
api.get('/candidates')
api.put('/candidates/:id', data)

// Auto-includes Authorization header
```

### `services/auth.js`
Authentication utilities:
```javascript
login({ aadharCardNumber, password })    // Returns token
signup(userData)                          // Returns token
getProfile()                              // Returns user
logout()                                  // Clears token
setToken(token)                           // Stores token
getToken()                                // Retrieves token
```

### `hooks/useAuth.js`
Custom hook to access auth context:
```javascript
const { token, user, setUser, login, logout, loading } = useAuth();
```

### `contexts/AuthContext.jsx`
Global auth state provider:
- Manages token and user data
- Handles auto-login on app load
- Provides `login()` and `logout()` methods

---

## 📊 Component Props

### DashboardCard
```javascript
<DashboardCard
  title="Total votes"           // Card label
  value={42}                    // Main number
  icon={<span>🗳️</span>}       // Icon element
  color="bg-indigo-500"         // Background color
  children="Additional info"    // Optional description
/>
```

### CandidateCard
```javascript
<CandidateCard
  candidate={candidateObj}      // Candidate data
  hasVoted={false}              // Voting status
  onVote={(id) => {...}}        // Vote handler
  loading={false}               // Loading state
/>
```

### VoteButton
```javascript
<VoteButton
  onClick={() => {...}}         // Click handler
  disabled={false}              // Disable button
  loading={false}               // Loading state
/>
```

---

## 🔒 Security Features

1. **JWT Authentication**: Secure token-based auth
2. **Protected Routes**: Prevents unauthorized access
3. **Password Hashing**: Backend-handled via bcrypt
4. **CORS Support**: Frontend and backend communicate securely
5. **Local Storage**: Tokens stored securely
6. **Input Validation**: Client-side form validation

---

## 🐛 Error Handling

### Global Error Handling
- Try-catch blocks in all API calls
- User-friendly error messages
- Toast/alert notifications

### Common Errors
- **401 Unauthorized**: Invalid or expired token → redirect to login
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource doesn't exist
- **500 Server Error**: Backend issue

---

## 📈 Performance Optimization

1. **Code Splitting**: Dynamic imports via React Router
2. **Lazy Loading**: Components load on demand
3. **Caching**: Axios cache for repeated requests
4. **Minification**: Production build optimization
5. **Tree Shaking**: Unused code elimination
6. **CSS Optimization**: Tailwind purges unused styles

---

## 🧪 Development Tips

### Hot Module Replacement (HMR)
Vite provides instant updates on file changes. Edit components and see changes immediately.

### Environment Variables
Create `.env.local` file:
```
VITE_API_BASE_URL=http://localhost:5000
```

### Browser DevTools
- React DevTools Extension
- Redux DevTools (if used)
- Network tab for API debugging

### Debugging
```javascript
// Log auth context
const { token, user } = useAuth();
console.log('Current user:', user);

// Log API responses
api.interceptors.response.use(res => {
  console.log('API Response:', res.data);
  return res;
});
```

---

## 📝 Code Conventions

### Component Structure
```javascript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

export default function ComponentName() {
  // State
  const [loading, setLoading] = useState(false);
  
  // Hooks
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Effects
  useEffect(() => {
    // Load data
  }, []);
  
  // Handlers
  const handleClick = () => {};
  
  // Render
  return <div>Content</div>;
}
```

### CSS Classes
- Use Tailwind shorthand: `px-4 py-2` instead of inline styles
- Mobile-first: `px-4 md:px-6 lg:px-8`
- Responsive: `grid gap-4 md:grid-cols-2 lg:grid-cols-3`

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
# Creates optimized build in `dist/` directory
```

### Deployment Options
1. **Vercel**: `vercel deploy`
2. **Netlify**: Connect GitHub repo
3. **AWS S3 + CloudFront**: Static hosting
4. **Docker**: Container deployment

### Environment Variables for Deployment
Set `VITE_API_BASE_URL` to your production API URL.

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Router Guide](https://reactrouter.com)
- [Recharts Examples](https://recharts.org)
- [Axios Documentation](https://axios-http.com)

---

## 🤝 Contributing

Follow these guidelines:
1. Use functional components
2. Implement proper error handling
3. Add loading states
4. Follow the naming conventions
5. Test all features before commit

---

## 📞 Support

For issues, refer to:
- Backend API error responses
- Browser console for client errors
- Network tab for API debugging

---

**Version**: 1.0.0  
**Last Updated**: March 10, 2026  
**Status**: Production Ready ✅
