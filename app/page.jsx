export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5'
    }}>
      <main style={{ 
        textAlign: 'center', 
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '800px'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
          WorkZen Backend API
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
          Your WorkZen Backend is running successfully! 🚀
        </p>
        
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>
            Available Endpoints:
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, color: '#555' }}>
            <li style={{ marginBottom: '0.5rem' }}>✅ POST /api/auth/login - User login</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ GET /api/auth/verify - Verify token</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ GET/POST /api/users - User management</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ GET/POST /api/attendance - Attendance tracking</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ GET/POST /api/leave - Leave requests</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ GET/POST /api/payroll - Payroll management</li>
          </ul>
          
          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '4px',
            border: '1px solid #e9ecef'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              <strong>Note:</strong> This is a backend API. Use tools like Postman or Thunder Client to test the endpoints.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
