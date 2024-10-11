import { useEffect, useState } from 'react';
import { Button, Layout, Drawer } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MenuOutlined, UserAddOutlined, CloseOutlined } from '@ant-design/icons';
import logo from "../images/Logo.png";

const { Header } = Layout;

const AppLayout = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const location = useLocation();

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setDrawerVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <Header className="bg-white fixed w-full z-10 shadow-lg flex items-center justify-between px-4 lg:px-10">
        <img src={logo} alt="Logo" className="w-32 lg:w-40" />

        <nav className="hidden lg:flex flex-1 justify-center space-x-8">
          <Link to="/" className={`text-gray-600 hover:text-gray-900 ${location.pathname === "/" ? "text-orange-600 font-bold" : ""}`}>
            Home
          </Link>
          <Link to="/about" className={`text-gray-600 hover:text-gray-900 ${location.pathname === "/about" ? "text-orange-600 font-bold" : ""}`}>
            About
          </Link>
          <Link to="/contact" className={`text-gray-600 hover:text-gray-900 ${location.pathname === "/contact" ? "text-orange-600 font-bold" : ""}`}>
            Contact
          </Link>
        </nav>

        <div className="lg:hidden flex items-center">
          <Button icon={<MenuOutlined />} onClick={showDrawer} />
        </div>

        <Button className="hidden lg:inline-block bg-orange-600 text-white font-bold" icon={<UserAddOutlined />}>
          Sign Up
        </Button>

        <Drawer
          placement="right"
          closable={false}
          onClose={closeDrawer}
          visible={drawerVisible}
          width="70%"
          style={{ backgroundColor: '#f0f2f5', borderRadius: '8px', padding: '20px' }}
        >
          <div className="flex justify-end p-4">
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={closeDrawer}
              style={{ border: 'none', fontSize: '24px', color: '#ff4d4f' }}
            />
          </div>
          <nav className="flex flex-col space-y-4 text-center">
            <Link to="/" onClick={closeDrawer} className={`text-gray-600 hover:text-gray-900 ${location.pathname === "/" ? "text-orange-600 font-bold" : ""}`}>
              Home
            </Link>
            <Link to="/about" onClick={closeDrawer} className={`text-gray-600 hover:text-gray-900 ${location.pathname === "/about" ? "text-orange-600 font-bold" : ""}`}>
              About
            </Link>
            <Link to="/contact" onClick={closeDrawer} className={`text-gray-600 hover:text-gray-900 ${location.pathname === "/contact" ? "text-orange-600 font-bold" : ""}`}>
              Contact
            </Link>
            <Button className="bg-orange-600 text-white font-bold w-full" icon={<UserAddOutlined />} onClick={closeDrawer}>
              Sign Up
            </Button>
          </nav>
        </Drawer>
      </Header>
    </Layout>
  );
};

export default AppLayout;
