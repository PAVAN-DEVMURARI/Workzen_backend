# 🧪 API Testing Collection

Quick reference for testing all endpoints with Postman/Thunder Client.

## Base URL
```
http://localhost:3000
```

---

## 1️⃣ Authentication

### Login (Employee)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "rohit@workzen.com",
  "password": "password123"
}
```
**Response:** Copy the `token` for next requests

### Login (Manager)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "ananya@workzen.com",
  "password": "password123"
}
```

### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer YOUR_TOKEN
```

---

## 2️⃣ Users

### Get Users
```http
GET /api/users
Authorization: Bearer YOUR_TOKEN
```

### Create User (Manager Only)
```http
POST /api/users
Authorization: Bearer MANAGER_TOKEN
Content-Type: application/json

{
  "name": "New Employee",
  "email": "new@workzen.com",
  "role": "Employee",
  "department": "Engineering",
  "password": "password123"
}
```

---

## 3️⃣ Attendance

### Get Attendance
```http
GET /api/attendance
Authorization: Bearer YOUR_TOKEN
```

### Mark Attendance
```http
POST /api/attendance
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "userId": 1,
  "date": "2025-11-08",
  "status": "Present"
}
```

---

## 4️⃣ Leave

### Get Leave Requests
```http
GET /api/leave
Authorization: Bearer YOUR_TOKEN
```

### Submit Leave Request
```http
POST /api/leave
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "userId": 1,
  "reason": "Personal Work",
  "from": "2025-11-10",
  "to": "2025-11-12",
  "status": "Pending"
}
```

---

## 5️⃣ Payroll

### Get Payroll
```http
GET /api/payroll
Authorization: Bearer YOUR_TOKEN
```

### Create Payroll (Manager Only)
```http
POST /api/payroll
Authorization: Bearer MANAGER_TOKEN
Content-Type: application/json

{
  "userId": 1,
  "month": "November 2025",
  "amount": 55000,
  "status": "Paid"
}
```

---

## 🔑 Quick Tips

1. **Always copy the token** from login response
2. **Add token to Authorization header** for all protected routes
3. **Format:** `Authorization: Bearer YOUR_TOKEN`
4. **Employee** can only see/modify their own data
5. **Manager** can see/modify all data
6. **Data resets** when server restarts (in-memory storage)

---

## ✅ Test Checklist

- [ ] Login as Employee
- [ ] Login as Manager
- [ ] Verify token works
- [ ] Employee sees only own data
- [ ] Manager sees all data
- [ ] Create user as Manager
- [ ] Try creating user as Employee (should fail)
- [ ] Mark attendance
- [ ] Submit leave request
- [ ] Create payroll as Manager
- [ ] Test without token (should fail)
- [ ] Test with invalid token (should fail)
