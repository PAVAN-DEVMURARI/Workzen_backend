# WorkZen Backend APIThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



A secure backend API for employee management, built with Next.js and JWT authentication.## Getting Started



## 🚀 FeaturesFirst, run the development server:



- **JWT Authentication** - Secure login with token-based authentication```bash

- **Role-Based Access Control** - Employee and Manager roles with different permissionsnpm run dev

- **User Management** - Create and manage employee profiles# or

- **Attendance Tracking** - Record and view attendance recordsyarn dev

- **Leave Management** - Submit and manage leave requests# or

- **Payroll Management** - Track employee payroll informationpnpm dev

# or

## 📋 Tech Stackbun dev

```

- **Framework**: Next.js 16.0.1 (App Router)

- **Database**: PostgreSQL (Neon) with Prisma ORMOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **Authentication**: JWT (jsonwebtoken)

- **Runtime**: Node.js with ES ModulesYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.



## 🛠️ InstallationThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



1. **Clone the repository**## Learn More

```bash

git clone <your-repo-url>To learn more about Next.js, take a look at the following resources:

cd workzen_b_d

```- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

2. **Install dependencies**

```bashYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

npm install

```## Deploy on Vercel



3. **Set up environment variables**The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Create a `.env` file in the root directory:

```envCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-super-secret-key-change-in-production"
NODE_ENV="development"
```

4. **Set up the database**
```bash
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/verify` | Verify JWT token | Yes |

### Users

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/users` | Get users (own/all) | Yes | All |
| POST | `/api/users` | Create new user | Yes | Manager |

### Attendance

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/attendance` | Get attendance records | Yes | All |
| POST | `/api/attendance` | Mark attendance | Yes | All |

### Leave

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/leave` | Get leave requests | Yes | All |
| POST | `/api/leave` | Submit leave request | Yes | All |

### Payroll

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/payroll` | Get payroll records | Yes | All |
| POST | `/api/payroll` | Create payroll record | Yes | Manager |

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Test Credentials

**Employee:**
- Email: `rohit@workzen.com`
- Password: `password123`

**Manager:**
- Email: `ananya@workzen.com`
- Password: `password123`

## 🧪 Testing with Postman

1. **Login**
```json
POST http://localhost:3000/api/auth/login
Body: {
  "email": "rohit@workzen.com",
  "password": "password123"
}
```

2. **Use the token**
Copy the token from the response and add it to headers:
```
Authorization: Bearer <your-token>
```

3. **Make authenticated requests**
```json
GET http://localhost:3000/api/users
Headers: Authorization: Bearer <your-token>
```

## 📁 Project Structure

```
workzen_b_d/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   └── verify/route.js
│   │   ├── users/route.js
│   │   ├── attendance/route.js
│   │   ├── leave/route.js
│   │   └── payroll/route.js
│   ├── layout.jsx
│   └── page.jsx
├── utils/
│   ├── auth.js          # JWT authentication helpers
│   └── data.js          # In-memory data (dev only)
├── prisma/
│   └── schema.prisma    # Database schema
├── lib/
│   └── prisma.ts        # Prisma client
└── .env                 # Environment variables
```

## 🔄 Role-Based Access

### Employee Permissions
- View own profile, attendance, leave, and payroll
- Mark own attendance
- Submit leave requests for self

### Manager Permissions
- View all users, attendance, leave, and payroll
- Create new users
- Mark attendance for anyone
- Create leave requests for anyone
- Create payroll records

## 🚧 Development Notes

- Currently using in-memory data storage (resets on server restart)
- Password hashing not yet implemented
- For production: migrate to Prisma database queries and implement password hashing with bcryptjs

## 📝 License

MIT

## 👨‍💻 Author

Your Name
