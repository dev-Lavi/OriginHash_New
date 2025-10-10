// components/AuthLayout.jsx
import Footerauth from './Footerauth';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        {children}
      </div>
      <Footerauth />
    </div>
  );
};

export default AuthLayout;
