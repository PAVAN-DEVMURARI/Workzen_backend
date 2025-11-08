import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma.js';

/**
 * GET /api/debug/users
 * Database mein kitne users hain aur unki IDs kya hain - ye check karta hai
 */
export async function GET() {
  try {
    // Sabhi users fetch karo with their IDs
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });

    // Attendance table check karo
    const attendanceCount = await prisma.attendance.count();
    const allAttendance = await prisma.attendance.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      totalUsers: users.length,
      users: users,
      totalAttendance: attendanceCount,
      attendance: allAttendance,
      message: 'Database status'
    });

  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}
