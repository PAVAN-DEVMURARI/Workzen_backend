import { authenticateRequest } from '../../../../utils/auth';

/**
 * GET /api/auth/verify
 * Verify if the provided JWT token is valid
 */
export async function GET(request) {
  try {
    // Verify token from Authorization header
    const user = await authenticateRequest(request);

    return Response.json(
      {
        success: true,
        message: 'Token is valid',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message || 'Invalid or expired token',
      },
      { status: 401 }
    );
  }
}
