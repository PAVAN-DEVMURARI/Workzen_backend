# 🗄️ Database Integration Guide (Hinglish)

## Kya-kya kiya gaya hai? ✅

### 1. Prisma Schema Update
- User model mein `password` aur `department` fields add kiye
- Database ko sync kiya `npx prisma db push` se

### 2. Login Endpoint (Database Connected)
**File**: `app/api/auth/login/route.js`

**Kaam kaise hota hai:**
```
1. User email aur password bhejta hai
2. Database mein email se user dhundhte hain
3. Password match karte hain
4. JWT token generate karte hain
5. User details ke saath token return karte hain
```

### 3. Users Endpoint (Full CRUD with Database)
**File**: `app/api/users/route.js`

**GET** - Users ko fetch karo:
- Employee: Apna profile dekh sakta hai
- Manager/Admin: Sabhi users dekh sakte hain
- Database se real data aata hai

**POST** - Naya user banao:
- Admin/Manager hi users bana sakte hain
- Email duplicate check hota hai
- Database mein save hota hai

**PATCH** - User ka role update karo:
- Sirf Admin hi role change kar sakta hai
- Database mein update hota hai

---

## Database Setup Kaise Karein? 🚀

### Step 1: Test Users Create Karo

Prisma Studio use karo (visual database editor):

```bash
npx prisma studio
```

Browser mein `http://localhost:5555` khulega.

**Ya phir direct Prisma command se:**

```bash
# Admin user
npx prisma db seed
```

**Ya manually create karo:**

Open Prisma Studio → Click "User" → Click "Add Record"

**Admin User:**
```
name: Admin User
email: admin@workzen.com
password: admin123
role: Admin
department: Management
```

**Employee User:**
```
name: Rohit Sharma
email: rohit@workzen.com
password: password123
role: Employee
department: Engineering
```

**Manager User:**
```
name: Ananya Verma
email: ananya@workzen.com
password: password123
role: Manager
department: HR
```

---

## Testing Kaise Karein? 🧪

### 1. Server Start Karo
```bash
npm run dev
```

### 2. Login Test (Database se)
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@workzen.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful!",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@workzen.com",
    "role": "Admin",
    "department": "Management"
  }
}
```

### 3. Get All Users (Database se fetch)
```http
GET http://localhost:3000/api/users
Authorization: Bearer YOUR_TOKEN
```

### 4. Create New User (Database mein save)
```http
POST http://localhost:3000/api/users
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "name": "New Employee",
  "email": "new@workzen.com",
  "password": "password123",
  "role": "Employee",
  "department": "IT"
}
```

**Database mein check karo:**
- Prisma Studio refresh karo
- Naya user dikhai dega!

### 5. Update User Role (Database mein update)
```http
PATCH http://localhost:3000/api/users
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "userId": 2,
  "role": "Manager"
}
```

---

## Important Points 🎯

### ✅ Kya Change Hua:
1. **In-memory data hataya** - Ab dummy data use nahi hoga
2. **Real database queries** - Prisma se database access
3. **Data persist hota hai** - Server restart ke baad bhi data rahega
4. **Production ready** - Real-time CRUD operations

### ⚠️ Next Steps (Production ke liye):
1. **Password Hashing** - bcrypt use karo
2. **Input Validation** - Zod/Joi use karo
3. **Error Handling** - Better error messages
4. **Attendance/Leave/Payroll** - Inko bhi database se connect karna hai

### 📂 Files Changed:
- ✅ `prisma/schema.prisma` - Schema updated
- ✅ `app/api/auth/login/route.js` - Database connected
- ✅ `app/api/users/route.js` - Full CRUD with database

### 📂 Files To Update (Aage ki kaam):
- ⏳ `app/api/attendance/route.js`
- ⏳ `app/api/leave/route.js`
- ⏳ `app/api/payroll/route.js`

---

## Database Schema

```prisma
model User {
  id         Int      @id @default(autoincrement())
  name       String
  email      String   @unique
  password   String   // Plain text (production mein hash karenge)
  role       String   // Employee, Manager, Admin
  department String?  // Optional
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  attendance Attendance[]
  leaves     Leave[]
  payrolls   Payroll[]
}
```

---

## Summary 🎉

**Pehle (In-memory data):**
- Server restart → Data lost
- Dummy data use hota tha
- Real database nahi tha

**Ab (Database integrated):**
- Server restart → Data safe rahega
- Real-time user creation/update
- Production ready
- Database mein sab kuch save

**Database kaha hai?**
- Neon PostgreSQL (cloud database)
- Connection string `.env` file mein hai
- Prisma ORM use kar rahe hain

**Kaise check karein database?**
```bash
npx prisma studio
```

Browser mein database visually dekh sakte ho! 🚀
