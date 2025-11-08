import { NextResponse } from 'next/server';
import { authenticateRequest, hasRole } from '../../../utils/auth.js';
import { prisma } from '../../../lib/prisma.js';

/**
 * GET /api/attendance
 * Database se attendance records fetch karta hai
 * 
 * Kaise kaam karta hai:
 * - Employee: Sirf apne attendance records dekh sakta hai
 * - Manager/Admin: Sabhi employees ke records dekh sakte hain
 * - Filter by userId aur date bhi kar sakte ho
 */
export async function GET(request) {
  try {
    // Pehle user ko authenticate karo
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      );
    }

    const { user } = authResult;

    // URL se query parameters nikalo (userId, date for filtering)
    const { searchParams } = new URL(request.url);
    const filterUserId = searchParams.get('userId');
    const filterDate = searchParams.get('date');

    // Database query ki condition banao
    let whereCondition = {};

    // Agar Employee hai, toh sirf uska apna data dikhao
    if (hasRole(user, ['Employee'])) {
      whereCondition.userId = user.id;
    } else {
      // Manager/Admin ke liye userId filter optional hai
      if (filterUserId) {
        whereCondition.userId = parseInt(filterUserId);
      }
    }

    // Date filter add karo agar diya gaya hai
    if (filterDate) {
      whereCondition.date = filterDate;
    }

    // Database se attendance records fetch karo
    const attendanceRecords = await prisma.attendance.findMany({
      where: whereCondition,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            department: true,
          }
        }
      },
      orderBy: {
        date: 'desc' // Latest date pehle
      }
    });

    return NextResponse.json({
      success: true,
      count: attendanceRecords.length,
      data: attendanceRecords
    });

  } catch (error) {
    console.error('GET /api/attendance error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/attendance
 * Database mein naya attendance record create karta hai
 * 
 * Kaise kaam karta hai:
 * - Employee: Sirf apna attendance mark kar sakta hai
 * - Manager/Admin: Kisi bhi employee ka attendance mark kar sakte hain
 * - Duplicate check: Same user same date pe duplicate nahi bana sakta
 */
export async function POST(request) {
  try {
    // User authentication check karo
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      );
    }

    const { user } = authResult;

    // Request body se data nikalo
    const body = await request.json();
    let { userId, date, status } = body;

    // Agar userId nahi diya toh logged-in user ki ID use karo
    if (!userId) {
      userId = user.id;
    }

    // Required fields check karo (userId ab optional hai, date aur status required)
    if (!date || !status) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'date aur status required hain' 
        },
        { status: 400 }
      );
    }

    // Status validate karo
    const validStatuses = ['Present', 'Absent', 'Half Day', 'Leave'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Status Present, Absent, Half Day ya Leave hona chahiye' 
        },
        { status: 400 }
      );
    }

    // Employee sirf apna attendance mark kar sakta hai
    if (hasRole(user, ['Employee']) && userId !== user.id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Tum sirf apna khud ka attendance mark kar sakte ho' 
        },
        { status: 403 }
      );
    }

    // Check karo ki user exist karta hai ya nahi
    const targetUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!targetUser) {
      return NextResponse.json(
        { success: false, error: 'User nahi mila' },
        { status: 404 }
      );
    }

    // Check karo ki is date pe pehle se attendance marked hai ya nahi
    const existingAttendance = await prisma.attendance.findUnique({
      where: {
        userId_date: {
          userId: userId,
          date: date
        }
      }
    });

    if (existingAttendance) {
      return NextResponse.json(
        { 
          success: false, 
          error: `${date} ke liye attendance pehle se marked hai` 
        },
        { status: 409 }
      );
    }

    // Database mein naya attendance record create karo
    const newAttendance = await prisma.attendance.create({
      data: {
        userId: userId,
        date: date,
        status: status,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            department: true,
          }
        }
      }
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Attendance successfully mark ho gaya!',
        data: newAttendance 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('POST /api/attendance error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
