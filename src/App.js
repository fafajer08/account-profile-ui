// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './components/Login/LoginPage';
// import RegisterPage from './components/Register/RegisterPage';
// import AccountProfile from './components/AccountProfile/AccountProfile';
// import ProtectedRoute from './components/ProtectedRoute';  // Ensure this component exists

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Redirect root to login */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
        
//         {/* Routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
        
//         {/* Protected route for Account Profile */}
//         <Route
//           path="/account-profile"
//           element={
//             <ProtectedRoute>
//               <AccountProfile />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AccountProfile from './components/AccountProfile/AccountProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect the root path to /account-profile */}
        <Route path="/" element={<Navigate to="/account-profile" replace />} />
        
        {/* Define the AccountProfile route */}
        <Route path="/account-profile" element={<AccountProfile />} />
      </Routes>
    </Router>
  );
};

export default App;


