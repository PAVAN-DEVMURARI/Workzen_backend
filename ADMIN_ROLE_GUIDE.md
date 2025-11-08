# 👨‍💼 Admin Role Guide

## Overview
The Admin role has been added to your WorkZen backend with the highest level of permissions.

## Role Hierarchy

```
Admin (Highest)
  ↓
Manager
  ↓
Employee (Lowest)
```

## Test Credentials

### Admin Account
- **Email**: `admin@workzen.com`
- **Password**: `admin123`
- **ID**: 1

### Employee Account
- **Email**: `rohit@workzen.com`
- **Password**: `password123`
- **ID**: 2

### Manager Account
- **Email**: `ananya@workzen.com`
- **Password**: `password123`
- **ID**: 3

---

## Role Permissions

### 🔴 Admin Permissions
- ✅ View all users
- ✅ Create new users (Employee, Manager, or Admin)
- ✅ **Update user roles** (exclusive to Admin)
- ✅ View all attendance records
- ✅ Mark attendance for anyone
- ✅ View all leave requests
- ✅ Create leave requests for anyone
- ✅ View all payroll records
- ✅ Create payroll for anyone

### 🟡 Manager Permissions
- ✅ View all users
- ✅ Create new users (Employee or Manager only)
- ❌ Cannot update user roles
- ❌ Cannot create Admin users
- ✅ View all attendance records
- ✅ Mark attendance for anyone
- ✅ View all leave requests
- ✅ Create leave requests for anyone
- ✅ View all payroll records
- ✅ Create payroll for anyone

### 🟢 Employee Permissions
- ✅ View only own profile
- ❌ Cannot create users
- ❌ Cannot update roles
- ✅ View only own attendance
- ✅ Mark only own attendance
- ✅ View only own leave requests
- ✅ Create leave requests for self only
- ✅ View only own payroll
- ❌ Cannot create payroll

---

## New API Endpoint

### Update User Role (Admin Only)

**Endpoint**: `PATCH /api/users`

**Headers**:
```
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json
```

**Body**:
```json
{
  "userId": 2,
  "role": "Manager"
}
```

**Response** (Success):
```json
{
  "success": true,
  "message": "User role updated successfully",
  "data": {
    "id": 2,
    "name": "Rohit Sharma",
    "email": "rohit@workzen.com",
    "role": "Manager",
    "department": "Engineering"
  }
}
```

**Response** (Error - Not Admin):
```json
{
  "success": false,
  "error": "Only Admins can update user roles"
}
```

---

## Testing Admin Features

### 1. Login as Admin
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@workzen.com",
  "password": "admin123"
}
```

Copy the token from response.

### 2. View All Users
```http
GET http://localhost:3000/api/users
Authorization: Bearer <ADMIN_TOKEN>
```

### 3. Create Admin User
```http
POST http://localhost:3000/api/users
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json

{
  "name": "New Admin",
  "email": "newadmin@workzen.com",
  "role": "Admin",
  "department": "Management",
  "password": "admin123"
}
```

### 4. Update User Role
```http
PATCH http://localhost:3000/api/users
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json

{
  "userId": 2,
  "role": "Manager"
}
```

### 5. Try Creating Admin as Manager (Should Fail)
```http
POST http://localhost:3000/api/users
Authorization: Bearer <MANAGER_TOKEN>
Content-Type: application/json

{
  "name": "Another Admin",
  "email": "another@workzen.com",
  "role": "Admin",
  "department": "Management",
  "password": "admin123"
}
```
Expected: `403 - Only Admins can create other Admin users`

### 6. Try Updating Role as Manager (Should Fail)
```http
PATCH http://localhost:3000/api/users
Authorization: Bearer <MANAGER_TOKEN>
Content-Type: application/json

{
  "userId": 2,
  "role": "Employee"
}
```
Expected: `403 - Only Admins can update user roles`

---

## Important Notes

### ✅ What Changed
1. Added `Admin` role to the system
2. Admin user created with ID 1
3. Updated all user IDs (Employee now ID 2, Manager now ID 3)
4. Added PATCH endpoint for role updates
5. Admin can create other Admins
6. Manager cannot create Admins

### ⚠️ Security Features
1. **Admin Self-Protection**: Admins cannot remove their own admin role
2. **Role Validation**: Only valid roles (Employee, Manager, Admin) are accepted
3. **Admin-Only Admin Creation**: Only existing Admins can create new Admins
4. **Admin-Only Role Updates**: Only Admins can change user roles

### 🚀 JWT Authentication
**No changes needed!** The JWT authentication logic remains the same:
- Token contains user ID, email, and role
- Role-based access control checks the role from the token
- Admin role is just another role string - works seamlessly

---

## Database Migration (When Ready)

When migrating to Prisma, update the User model:

```prisma
model User {
  id         Int      @id @default(autoincrement())
  name       String
  email      String   @unique
  role       String   // "Employee", "Manager", "Admin"
  department String?
  password   String   // Should be hashed
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  attendance Attendance[]
  leaves     Leave[]
  payrolls   Payroll[]
}
```

No schema changes needed - just ensure role validation includes "Admin"!

---

## Summary

✅ **Admin role implemented**  
✅ **JWT authentication unchanged** (no modifications needed!)  
✅ **Role-based access control updated**  
✅ **PATCH endpoint added for role assignment**  
✅ **Security measures in place**  
✅ **Backward compatible with existing code**  

Your admin can now assign roles to all users! 🎉
