import Header from "./Header";

function DashboardLayout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}

export default DashboardLayout;
