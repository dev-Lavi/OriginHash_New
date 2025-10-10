import UserHeader from './UserHeader';

function UserDashboardLayout({ children }) {
  return (
    <>
      <UserHeader />
      <div>{children}</div>
    </>
  );
}

export default UserDashboardLayout;