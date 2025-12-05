// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { authApi } from '../api/authApi';
// import { jwtDecode } from 'jwt-decode';

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');
    
//     if (token && storedUser) {
//       try {
//         const decoded = jwtDecode(token);
//         if (decoded.exp * 1000 > Date.now()) {
//           setUser(JSON.parse(storedUser));
//         } else {
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//         }
//       } catch (error) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await authApi.login({ email, password });
//       const { token, user } = response.data;
      
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);
      
//       return { success: true, role: user.role };
//     } catch (error) {
//       return { 
//         success: false, 
//         message: error.response?.data?.message || 'Login failed' 
//       };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     window.location.href = '/login';
//   };

//   const updateUser = (updatedUser) => {
//     setUser(updatedUser);
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     updateUser,
//     isAuthenticated: !!user,
//     isAdmin: user?.role === 'admin',
//     isTeacher: user?.role === 'teacher',
//     isStudent: user?.role === 'student',
//     isParent: user?.role === 'parent',
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // MOCK LOGIN
  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const demoUsers = {
      "admin@school.com": { password: "admin123", role: "admin" },
      "teacher@school.com": { password: "teacher123", role: "teacher" },
      "student@school.com": { password: "student123", role: "student" },
      "parent@school.com": { password: "parent123", role: "parent" },
    };

    const userData = demoUsers[email];

    if (!userData || userData.password !== password) {
      return { success: false, message: "Invalid email or password" };
    }

    const fakeToken = "mock-jwt-token";

    const userObj = {
      email,
      role: userData.role,
      name: userData.role.toUpperCase() + " USER"
    };

    localStorage.setItem("token", fakeToken);
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);

    return { success: true, role: userObj.role };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
