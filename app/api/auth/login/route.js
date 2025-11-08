import { generateToken } from '../../../../utils/auth.js';
import { prisma } from '../../../../lib/prisma.js';

/**
 * POST /api/auth/login
 * User ko authenticate karta hai aur JWT token return karta hai
 */
export async function POST(request) {
  try {
    // Request body se email aur password nikalo
    const body = await request.json();
    const { email, password } = body;

    // Check karo ki email aur password diya hai ya nahi
    if (!email || !password) {
      return Response.json(
        { success: false, error: 'Email aur password dono required hain' },
        { status: 400 }
      );
    }

    // Database mein user ko email se dhundho
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    // Agar user nahi mila, toh error return karo
    if (!user) {
      return Response.json(
        { success: false, error: 'Email ya password galat hai' },
        { status: 401 }
      );
    }

    // Password ko check karo
    if (user.password !== password) {
      return Response.json(
        { success: false, error: 'Email ya password galat hai' },
        { status: 401 }
      );
    }

    // JWT token generate karo
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Success response bhejo
    return Response.json(
      {
        success: true,
        message: 'Login successful!',
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
