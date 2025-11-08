/**
 * In-memory data storage for development
 * 
 * NOTE: This data persists only during the server session.
 * It will reset when the server restarts.
 * 
 * For production, replace with Prisma database queries.
 */

// Users with authentication credentials
export let users = [
  { 
    id: 1, 
    name: "Admin User", 
    email: "admin@workzen.com",
    password: "admin123",
    role: "Admin" 
  },
  { 
    id: 2, 
    name: "Rohit Sharma", 
    email: "rohit@workzen.com",
    password: "password123",
    role: "Employee" 
  },
  { 
    id: 3, 
    name: "Ananya Verma", 
    email: "ananya@workzen.com",
    password: "password123",
    role: "Manager" 
  },
];

// Attendance records
export let attendance = [
  { id: 1, userId: 2, date: "2025-11-08", status: "Present" },
  { id: 2, userId: 3, date: "2025-11-08", status: "Absent" },
  { id: 3, userId: 2, date: "2025-11-09", status: "Present" },
];

// Leave requests
export let leaves = [
  { id: 1, userId: 2, reason: "Fever", status: "Pending", from: "2025-11-07", to: "2025-11-08" },
  { id: 2, userId: 3, reason: "Family Function", status: "Approved", from: "2025-11-05", to: "2025-11-06" },
  { id: 3, userId: 2, reason: "Personal Work", status: "Rejected", from: "2025-11-02", to: "2025-11-02" },
];

// Payroll records
export let payroll = [
  { id: 1, userId: 2, month: "October", amount: 45000, status: "Paid" },
  { id: 2, userId: 3, month: "October", amount: 55000, status: "Pending" },
  { id: 3, userId: 2, month: "November", amount: 46000, status: "Paid" },
];


