import "./globals.css";

export const metadata = {
  title: "WorkZen Backend API",
  description: "Employee attendance, leave, and payroll management system backend API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

