"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || 'http://localhost:5000/api';

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'light'; // Light mode by default
  });

  // Global states
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [startups, setStartups] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [payments, setPayments] = useState([]);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Sync theme class with document element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 1. Fetch current user session (Auto Login after Refresh)
  const fetchMe = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.user);
      } else {
        setCurrentUser(null);
      }
    } catch (err) {
      console.error('Session check failed:', err);
      setCurrentUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  // 2. Fetch Registry Data (Startups & Opportunities)
  const fetchStartups = async () => {
    try {
      const res = await fetch(`${API_URL}/startups?all=true`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setStartups(data.startups);
      }
    } catch (err) {
      console.error('Failed to fetch startups:', err);
    }
  };

  const fetchOpportunities = async (params = {}) => {
    try {
      const query = new URLSearchParams();
      if (params.search) query.append('search', params.search);
      if (params.industry) query.append('industry', params.industry);
      if (params.workType) query.append('workType', params.workType);
      if (params.commitment) query.append('commitment', params.commitment);
      if (params.sort) query.append('sort', params.sort);
      if (params.page) query.append('page', params.page);
      if (params.limit) query.append('limit', params.limit);

      const res = await fetch(`${API_URL}/opportunities?${query.toString()}`);
      const data = await res.json();
      if (data.success) {
        setOpportunities(data.opportunities);
        return data; // Return full response for pagination handling in UI
      }
    } catch (err) {
      console.error('Failed to fetch opportunities:', err);
    }
    return null;
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch(`${API_URL}/applications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    }
  };

  const fetchPayments = async () => {
    if (currentUser?.role !== 'admin') return;
    try {
      const res = await fetch(`${API_URL}/payments`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setPayments(data.payments);
      }
    } catch (err) {
      console.error('Failed to fetch bank ledgers:', err);
    }
  };

  const fetchUsersList = async () => {
    if (currentUser?.role !== 'admin') return;
    try {
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setUsersList(data.users);
      }
    } catch (err) {
      console.error('Failed to fetch users list:', err);
    }
  };

  // Sync contextual registries when user roles change
  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchStartups();
      fetchOpportunities({ page: 1, limit: 100 });
      fetchApplications();
      if (currentUser.role === 'admin') {
        fetchUsersList();
        fetchPayments();
      }
    } else {
      // Fetch public directories even when logged out
      fetchStartups();
      fetchOpportunities({ page: 1, limit: 10 });
    }
  }, [currentUser]);

  // Auth Operations
  const loginAction = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        setCurrentUser(data.user);
        addToast(`Welcome back, ${data.user.name}!`, 'success');
        return { success: true };
      } else {
        addToast(data.message || 'Login credentials rejected.', 'error');
        return { success: false, message: data.message };
      }
    } catch (err) {
      addToast('Network connection error. Failed to reach server.', 'error');
      return { success: false, message: 'Server unreachable.' };
    }
  };

  const googleLoginAction = async (email, name, image) => {
    try {
      const res = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, image }),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        setCurrentUser(data.user);
        addToast(`Google Authentication successful: Signed in as ${data.user.name}`, 'success');
        return { success: true };
      } else {
        addToast(data.message || 'Google Login failed.', 'error');
        return { success: false, message: data.message };
      }
    } catch (err) {
      addToast('Google Auth Network error.', 'error');
      return { success: false, message: 'Server error during Google auth.' };
    }
  };

  const registerAction = async (name, email, password, role, imageFile) => {
    try {
      let body;
      let headers = {};

      if (imageFile) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);
        formData.append('imageFile', imageFile);
        body = formData;
      } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify({ name, email, password, role });
      }

      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          ...headers,
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body,
        credentials: 'include'
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        setCurrentUser(data.user);
        addToast('Registration complete! Welcome to StartupForge.', 'success');
        return { success: true };
      } else {
        addToast(data.message || 'Registration failed.', 'error');
        return { success: false, message: data.message };
      }
    } catch (err) {
      addToast('Server registration network error.', 'error');
      return { success: false, message: 'Server connection error during signup.' };
    }
  };

  const logoutAction = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        credentials: 'include'
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('token');
    setCurrentUser(null);
    setApplications([]);
    setPayments([]);
    setUsersList([]);
    addToast('You have logged out successfully.', 'info');
  };

  // Mutators
  const addStartup = async (newS) => {
    try {
      const res = await fetch(`${API_URL}/startups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(newS)
      });
      const data = await res.json();
      if (data.success) {
        addToast('Startup company profile submitted. Pending admin approval.', 'success');
        fetchStartups();
        return data.startup;
      } else {
        addToast(data.message || 'Failed to submit startup profile.', 'error');
      }
    } catch (err) {
      addToast('Network error saving startup profile.', 'error');
    }
    return null;
  };

  const updateStartup = async (updatedS) => {
    try {
      const res = await fetch(`${API_URL}/startups/${updatedS.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(updatedS)
      });
      const data = await res.json();
      if (data.success) {
        addToast('Startup company profile updated successfully.', 'success');
        fetchStartups();
      } else {
        addToast(data.message || 'Failed to update startup profile.', 'error');
      }
    } catch (err) {
      addToast('Network error updating startup.', 'error');
    }
  };

  const deleteStartup = async (id) => {
    try {
      const res = await fetch(`${API_URL}/startups/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      const data = await res.json();
      if (data.success) {
        addToast('Startup company profile deleted.', 'info');
        fetchStartups();
        fetchOpportunities({ page: 1, limit: 100 });
      } else {
        addToast(data.message || 'Failed to delete startup profile.', 'error');
      }
    } catch (err) {
      addToast('Network error deleting startup.', 'error');
    }
  };

  const approveStartup = async (id) => {
    try {
      const res = await fetch(`${API_URL}/admin/startups/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      const data = await res.json();
      if (data.success) {
        addToast('Startup profile APPROVED for public display.', 'success');
        fetchStartups();
      } else {
        addToast(data.message || 'Failed to approve startup.', 'error');
      }
    } catch (err) {
      addToast('Network error approving startup.', 'error');
    }
  };

  const addOpportunity = async (newO) => {
    try {
      const res = await fetch(`${API_URL}/opportunities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(newO)
      });
      const data = await res.json();
      if (data.success) {
        addToast('Opportunity vacancy posted successfully!', 'success');
        fetchOpportunities({ page: 1, limit: 100 });
        return data.opportunity;
      } else {
        addToast(data.message || 'Failed to post opportunity.', 'error');
      }
    } catch (err) {
      addToast('Network error posting opportunity.', 'error');
    }
    return null;
  };

  const updateOpportunity = async (updatedO) => {
    try {
      const res = await fetch(`${API_URL}/opportunities/${updatedO.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(updatedO)
      });
      const data = await res.json();
      if (data.success) {
        addToast('Opportunity details updated.', 'success');
        fetchOpportunities({ page: 1, limit: 100 });
      } else {
        addToast(data.message || 'Failed to update opportunity.', 'error');
      }
    } catch (err) {
      addToast('Network error updating opportunity.', 'error');
    }
  };

  const deleteOpportunity = async (id) => {
    try {
      const res = await fetch(`${API_URL}/opportunities/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      const data = await res.json();
      if (data.success) {
        addToast('Opportunity listing removed.', 'info');
        fetchOpportunities({ page: 1, limit: 100 });
        fetchApplications();
      } else {
        addToast(data.message || 'Failed to delete listing.', 'error');
      }
    } catch (err) {
      addToast('Network error deleting opportunity.', 'error');
    }
  };

  const addApplication = async (newApp) => {
    try {
      const res = await fetch(`${API_URL}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(newApp)
      });
      const data = await res.json();
      if (data.success) {
        addToast('Candidature pitch submitted to founder!', 'success');
        fetchApplications();
        return data.application;
      } else {
        addToast(data.message || 'Failed to submit application pitch.', 'error');
      }
    } catch (err) {
      addToast('Network error submitting pitch application.', 'error');
    }
    return null;
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/applications/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        addToast(`Candidature status set to: ${status}`, 'success');
        fetchApplications();
      } else {
        addToast(data.message || 'Failed to update application decision.', 'error');
      }
    } catch (err) {
      addToast('Network error updating application status.', 'error');
    }
  };

  const addPayment = async (amount, planName) => {
    try {
      const res = await fetch(`${API_URL}/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ amount, planName })
      });
      const data = await res.json();
      if (data.success && data.url) {
        addToast('Redirecting to Stripe payment gateway...', 'info');
        window.location.href = data.url;
      } else {
        addToast(data.message || 'Stripe payment gateway failed to load.', 'error');
        throw new Error(data.message || 'Stripe payment gateway failed to load.');
      }
    } catch (err) {
      addToast('Network error contacting Stripe.', 'error');
      throw err;
    }
  };

  const verifyPaymentSession = async (sessionId) => {
    try {
      const res = await fetch(`${API_URL}/payments/verify-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ sessionId })
      });
      const data = await res.json();
      if (data.success) {
        addToast('Upgrade successful! You are now a Premium Founder.', 'success');
        fetchMe(); // Refresh profile info to reflect Premium status
        return true;
      } else {
        addToast(data.message || 'Transaction verification failed.', 'error');
      }
    } catch (err) {
      addToast('Network error verifying transaction session.', 'error');
    }
    return false;
  };

  const updateUserStatus = async (id, status) => {
    try {
      const isBlocked = status === 'blocked';
      const res = await fetch(`${API_URL}/admin/users/${id}/block`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ isBlocked })
      });
      const data = await res.json();
      if (data.success) {
        addToast(`Account user status changed: ${status.toUpperCase()}`, 'success');
        fetchUsersList();
        if (currentUser.id === id) {
          fetchMe();
        }
      } else {
        addToast(data.message || 'Failed to update user account status.', 'error');
      }
    } catch (err) {
      addToast('Network error updating user account status.', 'error');
    }
  };

  const setUserPremium = async (id, isPremium) => {
    try {
      const res = await fetch(`${API_URL}/admin/users/${id}/premium`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ isPremium })
      });
      const data = await res.json();
      if (data.success) {
        addToast(`User premium rank updated successfully.`, 'success');
        fetchUsersList();
        if (currentUser.id === id) {
          fetchMe();
        }
      } else {
        addToast(data.message || 'Failed to change premium status.', 'error');
      }
    } catch (err) {
      addToast('Network error modifying premium level.', 'error');
    }
  };

  const updateProfileCV = async (name, skills, bio, experience, image) => {
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ name, skills, bio, experience, image })
      });
      const data = await res.json();
      if (data.success) {
        addToast('Your collaborator CV has been updated.', 'success');
        setCurrentUser(data.user);
        return true;
      } else {
        addToast(data.message || 'Failed to save CV details.', 'error');
      }
    } catch (err) {
      addToast('Network error updating CV settings.', 'error');
    }
    return false;
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currentUser,
        setCurrentUser,
        authLoading,
        usersList,
        startups,
        opportunities,
        applications,
        payments,
        
        // Auth actions
        login: loginAction,
        googleLogin: googleLoginAction,
        register: registerAction,
        logout: logoutAction,
        updateProfileCV,
        
        // Registry actions
        fetchOpportunities,
        fetchStartups,
        addStartup,
        updateStartup,
        deleteStartup,
        approveStartup,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        addApplication,
        updateApplicationStatus,
        addPayment,
        verifyPaymentSession,
        updateUserStatus,
        setUserPremium,
        
        // Custom Toasts system
        addToast
      }}
    >
      {children}

      {/* Floating UI Toast notifications container */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-xl flex items-center gap-3 border text-xs font-semibold font-sans animate-bounce-short ${
              t.type === 'success' 
                ? 'bg-emerald-50 dark:bg-emerald-950/90 border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300' 
                : t.type === 'error'
                ? 'bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300'
                : 'bg-indigo-50 dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/30 text-indigo-800 dark:text-indigo-300'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              t.type === 'success' ? 'bg-emerald-400' : t.type === 'error' ? 'bg-rose-400' : 'bg-indigo-400'
            }`} />
            <div className="flex-1">{t.message}</div>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
