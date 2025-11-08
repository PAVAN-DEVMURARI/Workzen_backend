import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma.js';

/**
 * GET /api/fix-roles
 * Database mein sabhi users ke roles ko proper case mein fix karta hai
 * admin -> Admin, employee -> Employee, manager -> Manager
 */
export async function GET() {
  try {
    console.log('Roles fix karna shuru kar rahe hain...');

    // Sabhi users ko fetch karo
    const users = await prisma.user.findMany();
    console.log(`Total ${users.length} users mile`);

    const updates = [];

    // Har user ka role capitalize karo
    for (const user of users) {
      const fixedRole = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase();
      
      if (user.role !== fixedRole) {
        console.log(`Updating user ${user.email}: ${user.role} -> ${fixedRole}`);
        
        const updated = await prisma.user.update({
          where: { id: user.id },
          data: { role: fixedRole },
          select: {
            id: true,
            email: true,
            role: true,
          }
        });
        
        updates.push(updated);
      }
    }

    return NextResponse.json({
      success: true,
      message: `${updates.length} users ke roles fix ho gaye!`,
      updated: updates,
      allUsers: await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        }
      })
    });

  } catch (error) {
    console.error('Fix roles error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Roles fix karne mein error aaya',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
