import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma.js';

/**
 * GET /api/seed
 * Database mein test users create karta hai
 * Sirf development ke liye - production mein delete kar dena
 */
export async function GET() {
  try {
    // Check karo kitne users hain
    const userCount = await prisma.user.count();
    console.log(`Database mein currently ${userCount} users hain`);

    // Agar users hain toh skip karo
    if (userCount > 0) {
      const existingUsers = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        }
      });

      return NextResponse.json({
        success: true,
        message: `Database mein pehle se ${userCount} users hain`,
        users: existingUsers
      });
    }

    // Admin user banao
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@workzen.com',
        password: 'admin123',
        role: 'Admin',
        department: 'Management',
      }
    });

    // Employee user banao
    const employee = await prisma.user.create({
      data: {
        name: 'Rohit Sharma',
        email: 'rohit@workzen.com',
        password: 'password123',
        role: 'Employee',
        department: 'Engineering',
      }
    });

    // Manager user banao
    const manager = await prisma.user.create({
      data: {
        name: 'Ananya Verma',
        email: 'ananya@workzen.com',
        password: 'password123',
        role: 'Manager',
        department: 'HR',
      }
    });

    return NextResponse.json({
      success: true,
      message: '3 test users successfully create ho gaye!',
      users: [
        { id: admin.id, email: admin.email, role: admin.role },
        { id: employee.id, email: employee.email, role: employee.role },
        { id: manager.id, email: manager.email, role: manager.role },
      ],
      credentials: {
        admin: 'admin@workzen.com / admin123',
        employee: 'rohit@workzen.com / password123',
        manager: 'ananya@workzen.com / password123',
      }
    });

  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database seed mein error aaya',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
