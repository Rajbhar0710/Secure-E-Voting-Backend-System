# 🎉 Secure E-Voting System - Complete Frontend Setup Guide

Welcome! Here's everything you need to know about the newly generated React frontend.

---

## 📁 What Was Generated

A **production-ready React application** with:
- 7 fully functional pages (Login, Signup, Dashboard, Vote, Candidates, Results, Profile)
- 7 reusable UI components (Layout, Navbar, Sidebar, Cards, Buttons)
- Complete authentication system with JWT
- Real-time voting and results visualization
- Admin dashboard for candidate management
- Modern SaaS-style responsive design

---

## 🚀 Quick Start (5 minutes)

### 1. Start the Backend
```bash
cd backend
npm install
npm start
```
Backend will run on `http://localhost:5000`

### 2. Start the Frontend
```bash
cd frontend
npm run dev
```
Frontend will open at `http://localhost:5173`

### 3. Create Your Account
- Go to Signup page
- Use any 12-digit number for Aadhar (e.g., `123456789012`)
- Set a password
- Click "Create account"

### 4. Login & Vote
- Use your Aadhar + password to login
- Go to Vote page
- Click "Vote" on any candidate
- Check Results to see live vote counts

---

## 📂 Frontend Folder Structure

```
frontend/
├── src/
│   ├── pages/                    # Route pages
│   │   ├── Login.jsx             # Login page
│   │   ├── Signup.jsx            # Registration
│   │   ├── Dashboard.jsx         # Main dashboard
│   │   ├── Vote.jsx              # Voting interface
│   │   ├── Candidates.jsx        # Admin candidate mgmt
│   │   ├── Results.jsx           # Election results
│   │   └── Profile.jsx           # User profile
│   │
│   ├── components/               # Reusable components
│   │   ├── layout/
│   │   │   ├── Layout.jsx        # Main wrapper
│   │   │   ├── Sidebar.jsx       # Left navigation
│   │   │   └── Navbar.jsx        # Top navbar
│   │   └── cards/
│   │       ├── DashboardCard.jsx # Stats card
│   │       ├── CandidateCard.jsx # Candidate voting card
│   │       └── VoteButton.jsx    # Vote button
│   │
│   ├── contexts/                 # Context API
│   │   └── AuthContext.jsx       # Auth state
│   │
│   ├── hooks/                    # Custom hooks
│   │   └── useAuth.js            # Auth hook
│   │
│   ├── services/                 # API services
│   │   ├── api.js                # Axios instance
│   │   └── auth.js               # Auth functions
│   │
│   ├── App.jsx                   # Main app
│   ├── App.css                   # App styles
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Entry point
│
├── public/                       # Static assets
├── vite.config.js                # Build config
├── tailwind.config.js            # Tailwind theme
├── postcss.config.js             # CSS setup
├── package.json                  # Dependencies
├── .env.local                    # Environment vars
└── eslint.config.js              # Code linting
```

---

## 🎯 Page-by-Page Guide

### Login Page (`/login`)
- **Purpose**: Authenticate existing users
- **Fields**: Aadhar Card Number (12 digits), Password
- **After Login**: Redirects to Dashboard
- **Link**: "Sign up" for new users

### Signup Page (`/signup`)
- **Purpose**: Register new voter accounts
- **Fields**: Name, Age, Address, Aadhar (12 digits), Password
- **Validation**: Aadhar must be exactly 12 digits
- **After Signup**: Auto-login and go to Dashboard
- **Link**: "Sign in" for existing users

### Dashboard (`/dashboard`)
- **Purpose**: Overview of election status
- **Cards**: 
  - Total voters
  - Total votes cast
  - Total candidates
- **Chart**: Bar chart showing votes by party
- **Latest Candidates**: Grid of recent candidates
- **Quick Actions**: "Vote Now" and "View Results" buttons

### Vote Page (`/vote`)
- **Purpose**: Cast your vote
- **Display**: All candidates in card format
- **Card Info**: Avatar, name, party, age
- **Status**: Shows if you've already voted
- **Voting**: Click "Vote" button to cast vote
- **Feedback**: Success/error messages

### Results Page (`/results`)
- **Purpose**: View election results
- **Chart**: Interactive bar chart of votes
- **Breakdown**: Table of votes per party
- **Live**: Updates in real-time as votes are cast
- **Total**: Shows total votes cast

### Candidates Page (`/candidates`)
- **Purpose**: Admin candidate management
- **Required**: Admin role
- **Add Candidate**: Form with name, party, age
- **List**: Current candidates with edit/delete buttons
- **Edit**: Click "Edit" to change candidate details
- **Delete**: Confirm before deleting candidate

### Profile Page (`/profile`)
- **Purpose**: User account settings
- **Info Shown**: Name, age, address, aadhar, role, voting status
- **Change Password**: Current password, new password, confirm
- **Validation**: Passwords must match
- **Feedback**: Success/error messages

---

## 🔑 Key Features Explained

### Authentication System
```javascript
// Automatic flow:
User Login → JWT Token Generated → Stored in localStorage
  → Token attached to all API requests
  → Auto-logout on token expiry
  → Protected routes redirect to login if no token
```

### Protected Routes
```javascript
// Only logged-in users can access:
/dashboard, /vote, /candidates, /results, /profile

// Public routes:
/login, /signup
```

### One Vote Per User
```javascript
// System prevents:
- Multiple votes by same user
- Voting twice
- Admin voting
// Reasons:
- User.isVoted flag set to true after voting
- Backend enforces this rule
- Vote button disabled after voting
```

### Admin Features
```javascript
// Only users with role='admin' can:
- Access /candidates page
- Create new candidates
- Edit candidate details
- Delete candidates
// Regular voters:
- Can only vote
- Cannot access admin panel
```

---

## 🎨 Design System

### Colors
- **Primary**: #6366f1 (Indigo) - Main brand color
- **Dark**: #4f46e5 (Deep Indigo) - Hover states
- **Success**: #10b981 (Emerald) - Success messages
- **Error**: #ef4444 (Rose) - Error messages
- **Neutral**: Slate 50-900 - Gray tones

### Spacing
- 4px, 8px, 16px, 24px, 32px, 48px increments
- Consistent padding and margins

### Typography
- System fonts (high performance)
- Sizes: 12px, 14px, 16px, 18px, 20px, 24px, 32px

### Responsive Breakpoints
```
Mobile:   320px - 640px  (default)
Tablet:   640px - 1024px  (sm: and md:)
Desktop:  1024px+        (lg:, xl:)
```

---

## 🔌 API Integration

### How It Works
```javascript
1. Frontend makes request to backend
2. Axios includes JWT token automatically
3. Backend validates token
4. If valid: returns data
5. If invalid: returns 401 → Frontend redirects to login
```

### Error Handling
```javascript
// Common error codes:
401 - Unauthorized (invalid token)
403 - Forbidden (no permission)
404 - Not found
500 - Server error

// Frontend response:
- Shows user-friendly error message
- Redirects to login if unauthorized
- Logs error to console for debugging
```

---

## 🛠️ Getting Help

### Common Issues & Solutions

**Issue**: "API calls are failing"
```
Solution: 
1. Check if backend is running on port 5000
2. Check .env.local has correct VITE_API_BASE_URL
3. Check browser console for exact error
4. Check Network tab in DevTools
```

**Issue**: "Stuck on login page"
```
Solution:
1. Clear localStorage: right-click → Clear Site Data
2. Check if token is valid
3. Try signing up as new user
4. Check backend JWT_SECRET in .env
```

**Issue**: "Tailwind styles not showing"
```
Solution:
1. Check @tailwindcss/postcss is installed
2. Check postcss.config.js has correct config
3. Run npm install again
4. Restart dev server
```

**Issue**: "Can't submit form"
```
Solution:
1. Check all validation passes (e.g., 12-digit aadhar)
2. Check form fields are filled
3. Check backend is running
4. Look at console for specific error
```

---

## 🧪 Testing Checklist

Before going to production, test:

- [ ] Can signup with valid Aadhar (12 digits)
- [ ] Can login with created account
- [ ] Dashboard shows correct stats
- [ ] Can vote for candidate
- [ ] Vote button disables after voting
- [ ] Results page shows updated counts
- [ ] Can change password in profile
- [ ] Can edit profile info
- [ ] Admin can add candidate
- [ ] Admin can edit candidate
- [ ] Admin can delete candidate
- [ ] Logout clears session
- [ ] Can't access protected pages without login
- [ ] Signup link works from login
- [ ] Login link works from signup

---

## 📊 Component Props Reference

### DashboardCard
```jsx
<DashboardCard
  title="Total votes"           // Card label
  value={42}                    // Number to show
  icon={<span>🗳️</span>}       // Icon
  color="bg-indigo-500"         // Background color
>
  Optional description text
</DashboardCard>
```

### CandidateCard
```jsx
<CandidateCard
  candidate={{                  // Candidate object
    _id: "...",
    name: "John Doe",
    party: "Party A",
    age: 45
  }}
  hasVoted={false}              // User's voting status
  loading={false}               // Loading indicator
  onVote={(id) => {}}           // Vote handler
/>
```

### VoteButton
```jsx
<VoteButton
  onClick={() => handleVote()}   // Click handler
  disabled={hasVoted}            // Disable if voted
  loading={false}                // Loading state
/>
```

---

## 🚀 Deployment Guide

### Build for Production
```bash
cd frontend
npm run build
```
Creates optimized files in `dist/` folder.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
# Follow prompts to deploy
```

### Deploy to Netlify
1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add env var: `VITE_API_BASE_URL`

### Deploy to AWS S3
```bash
# Build
npm run build

# Upload dist folder to S3 bucket
aws s3 sync dist/ s3://your-bucket-name/
```

---

## 🔒 Security Notes

1. **Tokens**: Stored in localStorage (not ideal, use httpOnly cookies in production)
2. **HTTPS**: Always use HTTPS in production
3. **CORS**: Configure backend to allow only your frontend domain
4. **Rate Limiting**: Backend should rate-limit login attempts
5. **Input Validation**: Frontend validates, backend must too

---

## 💡 Tips for Customization

### Change Brand Color
Edit `tailwind.config.js`:
```javascript
colors: {
  brand: {
    500: '#your-color-here'
  }
}
```

### Add New Page
1. Create file in `src/pages/NewPage.jsx`
2. Add route in `App.jsx`:
```jsx
<Route path="/newpage" element={<ProtectedRoute><NewPage /></ProtectedRoute>} />
```
3. Add navigation link in `Sidebar.jsx`

### Modify Layout
Edit `src/components/layout/Layout.jsx` to change sidebar, navbar, or main area.

### Change API URL
Update `VITE_API_BASE_URL` in `.env.local`

---

## 📚 Useful Resources

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)
- [Recharts](https://recharts.org)
- [Vite Docs](https://vitejs.dev)

---

## ✅ Checklist Before Production

- [ ] Backend running and stable
- [ ] MongoDB connected and seeded
- [ ] All environment variables set
- [ ] Frontend builds without errors
- [ ] All pages tested
- [ ] API calls working
- [ ] Error handling working
- [ ] Responsive design tested
- [ ] Security measures in place
- [ ] Documentation updated

---

## 🎉 You're All Set!

Your secure e-voting system is ready to use. Start the servers and begin voting!

```bash
# Terminal 1: Start Backend
cd backend && npm start

# Terminal 2: Start Frontend
cd frontend && npm run dev

# Browser: http://localhost:5173
```

Happy voting! 🗳️

---

**Questions?** Check the [FRONTEND_DOCUMENTATION.md](./FRONTEND_DOCUMENTATION.md) for detailed component documentation.

