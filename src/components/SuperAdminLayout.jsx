import UserHeader from './SuperAdminHeader';

function SuperAdminDashboardLayout({ children }) {
  return (
    <>
      <UserHeader />
      <div>{children}</div>
    </>
  );
}

export default SuperAdminDashboardLayout;