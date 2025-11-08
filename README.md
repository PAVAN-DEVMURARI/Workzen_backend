# WorkZen Backend - Employee Management System 🚀# WorkZen Backend APIThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



Complete backend API for employee management with JWT authentication, role-based access control, and PostgreSQL database integration.



## 📋 FeaturesA secure backend API for employee management, built with Next.js and JWT authentication.## Getting Started



- ✅ **JWT Authentication** - Secure login with 7-day token validity

- ✅ **Role-Based Access Control** - Admin, Manager, Employee roles

- ✅ **User Management** - CRUD operations with role assignment (Admin only)## 🚀 FeaturesFirst, run the development server:

- ✅ **Attendance Tracking** - Mark attendance with status (Present/Absent/Half Day/Leave)

- ✅ **Leave Management** - Request leaves with overlap validation

- ✅ **Payroll Management** - Manage payroll (Manager/Admin only)

- ✅ **PostgreSQL Database** - Using Prisma ORM with Neon cloud database- **JWT Authentication** - Secure login with token-based authentication```bash

- ✅ **Auto UserID Detection** - POST requests automatically use logged-in user's ID

- **Role-Based Access Control** - Employee and Manager roles with different permissionsnpm run dev

## 🛠️ Tech Stack

- **User Management** - Create and manage employee profiles# or

- **Framework**: Next.js 16.0.1 (App Router)

- **Database**: PostgreSQL (Neon)- **Attendance Tracking** - Record and view attendance recordsyarn dev

- **ORM**: Prisma 6.19.0

- **Authentication**: JWT (jsonwebtoken)- **Leave Management** - Submit and manage leave requests# or

- **Language**: JavaScript (ES Modules)

- **Payroll Management** - Track employee payroll informationpnpm dev

## 📁 Project Structure

# or

```

workzen_b_d/## 📋 Tech Stackbun dev

├── app/

│   ├── api/```

│   │   ├── auth/login/        # Login endpoint

│   │   ├── users/             # User management (CRUD)- **Framework**: Next.js 16.0.1 (App Router)

│   │   ├── attendance/        # Attendance tracking

│   │   ├── leave/             # Leave management- **Database**: PostgreSQL (Neon) with Prisma ORMOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

│   │   └── payroll/           # Payroll management

│   ├── globals.css- **Authentication**: JWT (jsonwebtoken)

│   ├── layout.tsx

│   └── page.tsx- **Runtime**: Node.js with ES ModulesYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

├── lib/

│   └── prisma.js              # Prisma client singleton

├── utils/

│   └── auth.js                # JWT helpers## 🛠️ InstallationThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

├── prisma/

│   └── schema.prisma          # Database schema

├── .env                       # Environment variables

└── package.json1. **Clone the repository**## Learn More

```

```bash

## 🚀 Getting Started

git clone <your-repo-url>To learn more about Next.js, take a look at the following resources:

### 1. Install Dependencies

```bashcd workzen_b_d

npm install

``````- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.



### 2. Setup Environment Variables- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

Create `.env` file:

```env2. **Install dependencies**

DATABASE_URL="your-postgresql-connection-string"

JWT_SECRET="your-secret-key"```bashYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

```

npm install

### 3. Setup Database

```bash```## Deploy on Vercel

# Generate Prisma Client

npx prisma generate



# Push schema to database3. **Set up environment variables**The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

npx prisma db push

```Create a `.env` file in the root directory:



### 4. Run Development Server```envCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```bash

npm run devDATABASE_URL="your-postgresql-connection-string"

```JWT_SECRET="your-super-secret-key-change-in-production"

NODE_ENV="development"

Server will start at `http://localhost:3000````



### 5. View Database (Optional)4. **Set up the database**

```bash```bash

npx prisma studionpx prisma db push

``````



Prisma Studio will open at `http://localhost:5555` or `http://localhost:5556`5. **Run the development server**

```bash

## 🔐 API Endpointsnpm run dev

```

### Authentication

The API will be available at `http://localhost:3000`

#### POST `/api/auth/login`

Login aur JWT token prapt karo## 📚 API Endpoints



**Request:**### Authentication

```json

{| Method | Endpoint | Description | Auth Required |

  "email": "admin@workzen.com",|--------|----------|-------------|---------------|

  "password": "admin123"| POST | `/api/auth/login` | User login | No |

}| GET | `/api/auth/verify` | Verify JWT token | Yes |

```

### Users

**Response:**

```json| Method | Endpoint | Description | Auth Required | Role |

{|--------|----------|-------------|---------------|------|

  "success": true,| GET | `/api/users` | Get users (own/all) | Yes | All |

  "token": "eyJhbGciOiJIUzI1NiIs...",| POST | `/api/users` | Create new user | Yes | Manager |

  "user": {

    "id": 1,### Attendance

    "name": "Admin User",

    "email": "admin@workzen.com",| Method | Endpoint | Description | Auth Required | Role |

    "role": "Admin",|--------|----------|-------------|---------------|------|

    "department": "Management"| GET | `/api/attendance` | Get attendance records | Yes | All |

  }| POST | `/api/attendance` | Mark attendance | Yes | All |

}

```### Leave



### Users Management| Method | Endpoint | Description | Auth Required | Role |

|--------|----------|-------------|---------------|------|

#### GET `/api/users`| GET | `/api/leave` | Get leave requests | Yes | All |

Sabhi users ki list (role-based filtering)| POST | `/api/leave` | Submit leave request | Yes | All |



**Headers:** `Authorization: Bearer <token>`### Payroll



**Response:**| Method | Endpoint | Description | Auth Required | Role |

```json|--------|----------|-------------|---------------|------|

{| GET | `/api/payroll` | Get payroll records | Yes | All |

  "success": true,| POST | `/api/payroll` | Create payroll record | Yes | Manager |

  "users": [...]

}## 🔐 Authentication

```

All protected endpoints require a JWT token in the Authorization header:

#### POST `/api/users`

Naya user create karo```

Authorization: Bearer <your-jwt-token>

**Headers:** `Authorization: Bearer <token>````



**Request:**### Test Credentials

```json

{**Employee:**

  "name": "Rahul Kumar",- Email: `rohit@workzen.com`

  "email": "rahul@workzen.com",- Password: `password123`

  "password": "password123",

  "role": "Employee",**Manager:**

  "department": "Development"- Email: `ananya@workzen.com`

}- Password: `password123`

```

## 🧪 Testing with Postman

#### PATCH `/api/users`

User ki role update karo (Admin only)1. **Login**

```json

**Headers:** `Authorization: Bearer <token>`POST http://localhost:3000/api/auth/login

Body: {

**Request:**  "email": "rohit@workzen.com",

```json  "password": "password123"

{}

  "userId": 2,```

  "role": "Manager"

}2. **Use the token**

```Copy the token from the response and add it to headers:

```

### AttendanceAuthorization: Bearer <your-token>

```

#### GET `/api/attendance`

Attendance records fetch karo (role-based access)3. **Make authenticated requests**

```json

**Headers:** `Authorization: Bearer <token>`GET http://localhost:3000/api/users

Headers: Authorization: Bearer <your-token>

#### POST `/api/attendance````

Attendance mark karo (userId optional - auto-detected)

## 📁 Project Structure

**Headers:** `Authorization: Bearer <token>`

```

**Request:**workzen_b_d/

```json├── app/

{│   ├── api/

  "date": "2025-11-08",│   │   ├── auth/

  "status": "Present"│   │   │   ├── login/route.js

}│   │   │   └── verify/route.js

```│   │   ├── users/route.js

│   │   ├── attendance/route.js

**Status Options:** `Present`, `Absent`, `Half Day`, `Leave`│   │   ├── leave/route.js

│   │   └── payroll/route.js

### Leave Management│   ├── layout.jsx

│   └── page.jsx

#### GET `/api/leave`├── utils/

Leave requests dekho (role-based filtering)│   ├── auth.js          # JWT authentication helpers

│   └── data.js          # In-memory data (dev only)

**Headers:** `Authorization: Bearer <token>`├── prisma/

│   └── schema.prisma    # Database schema

#### POST `/api/leave`├── lib/

Leave request create karo (userId optional)│   └── prisma.ts        # Prisma client

└── .env                 # Environment variables

**Headers:** `Authorization: Bearer <token>````



**Request:**## 🔄 Role-Based Access

```json

{### Employee Permissions

  "reason": "Medical checkup",- View own profile, attendance, leave, and payroll

  "from": "2025-11-10",- Mark own attendance

  "to": "2025-11-11"- Submit leave requests for self

}

```### Manager Permissions

- View all users, attendance, leave, and payroll

**Status:** `Pending` (default), `Approved`, `Rejected`- Create new users

- Mark attendance for anyone

### Payroll- Create leave requests for anyone

- Create payroll records

#### GET `/api/payroll`

Payroll records fetch karo## 🚧 Development Notes



**Headers:** `Authorization: Bearer <token>`- Currently using in-memory data storage (resets on server restart)

- Password hashing not yet implemented

#### POST `/api/payroll`- For production: migrate to Prisma database queries and implement password hashing with bcryptjs

Payroll create karo (Manager/Admin only, userId optional)

## 📝 License

**Headers:** `Authorization: Bearer <token>`

MIT

**Request:**

```json## 👨‍💻 Author

{

  "month": "November 2025",Your Name

  "amount": 50000,
  "status": "Pending"
}
```

## 👥 User Roles

### Admin
- Create/Read/Update users
- Assign roles to other users
- Access all attendance/leave/payroll records
- Create payroll for any user

### Manager
- Read all users
- Access team attendance/leave records
- Create payroll for team members

### Employee
- Read own data only
- Mark own attendance
- Request leaves
- View own payroll

## 🔒 Role Hierarchy

```
Admin (Highest)
  ↓
Manager
  ↓
Employee (Lowest)
```

**Rules:**
- Admin can assign any role except remove their own Admin role
- Only Admins can create Admin users
- Employees can only view their own records

## 📝 Database Schema

### User
- `id`: Auto-increment
- `name`: String
- `email`: Unique
- `password`: String
- `role`: Admin/Manager/Employee
- `department`: String (optional)

### Attendance
- `id`: Auto-increment
- `userId`: Foreign key to User
- `date`: Date
- `status`: Present/Absent/Half Day/Leave
- **Unique constraint**: userId + date (no duplicates)

### Leave
- `id`: Auto-increment
- `userId`: Foreign key to User
- `reason`: String
- `from`: Date
- `to`: Date
- `status`: Pending/Approved/Rejected
- **Validation**: Date overlap prevention

### Payroll
- `id`: Auto-increment
- `userId`: Foreign key to User
- `month`: String
- `amount`: Float
- `status`: Pending/Paid/Processing
- **Unique constraint**: userId + month (no duplicates)

## 🧪 Testing

### Thunder Client / Postman

1. **Login**
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@workzen.com",
  "password": "admin123"
}
```

2. **Use Token** in subsequent requests:
```
Authorization: Bearer <your-token-here>
```

3. **Test Endpoints** (see API Endpoints section above)

## 🎯 Important Features

### Auto UserID Detection
POST requests mein `userId` optional hai. Agar nahi diya toh automatically logged-in user ki ID use hogi:

```json
// Yeh dono same hain agar tum Employee ho
POST /api/attendance
{ "date": "2025-11-08", "status": "Present" }

POST /api/attendance
{ "userId": 2, "date": "2025-11-08", "status": "Present" }
```

### Duplicate Prevention
- **Attendance**: Same user same date duplicate nahi ban sakta
- **Payroll**: Same user same month duplicate nahi ban sakta
- **Leave**: Overlapping dates ka validation

### Error Handling
- 400: Bad Request (validation errors)
- 401: Unauthorized (login required / invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Server Error

## 📚 Code Comments

Sari code mein **Hinglish comments** hain jo har function ko explain karti hain:

```javascript
// Request body se data nikalo
const body = await request.json();

// Agar userId nahi diya toh logged-in user ki ID use karo
if (!userId) {
  userId = user.id;
}
```

## 🔧 Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Prisma commands
npx prisma studio          # Database GUI
npx prisma db push         # Push schema changes
npx prisma generate        # Generate Prisma Client
npx prisma migrate dev     # Create migration
```

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please follow the existing code style with Hinglish comments.

---

**Made with ❤️ for WorkZen Employee Management System**
