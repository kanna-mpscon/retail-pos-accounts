import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { FaSuitcase, FaChevronUp, FaChevronDown, FaArchive, FaPlus, FaSignOutAlt, FaBars,FaShoppingCart   } from 'react-icons/fa';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null);

  // Define menu structure
  const menuItems = [
    {
      id: 'account',
      title: 'Account Master',
      icon: <FaSuitcase className="me-2 text-secondary" />,
      subItems: [
        { id: 'charts-of-account', title: 'Charts Of Account', path: '/charts-of-account' },
        { 
          id: 'account', 
          title: 'Account', 
          path: '/accounttable', 
          addPath: '/account',
          editPath: (id) => `/account/${id.startsWith('default-') ? 'default/edit' : 'edit'}/${id}`        },    
        { id: 'transporter', title: 'Transporter', path: '/transporter', addPath: '/transporter/new' }
      ]
    },
    {
      id: 'item',
      title: 'Item Master',
      icon: <FaArchive className="me-2 text-secondary" />,
      subItems: [
        {
          id: 'items',
          title: 'Items',
          path: 'item',  // Relative to Dashboard
          addPath: 'item/new',
          editPath: (id) => `item/edit/${id}`
        },        { id: 'itemgroup', title: 'Item Group', path: '/itemgroup', addPath: '/itemgroup/new' },
        { id: 'itemcategory', title: 'Item Category', path: '/itemcategory', addPath: '/itemcategory/new' },
        { id: 'unit', title: 'Unit', path: '/unit', addPath: '/unit/new' },
      ]
    },{
      id:'sales',
      title: 'Sales',
      icon: <FaShoppingCart   className="me-2 text-secondary" />,
      subItems: [
        {
          id: 'Quotation',
          title: 'Quotation',
          path: 'Quotation',  // Relative to Dashboard
          addPath: 'Quotation/new',
        },
      ]
    
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 992) {
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Sync active menu and subitem with current route
    const path = location.pathname;
    let foundMenu = null;
    let foundSubItem = null;

    for (const menu of menuItems) {
      for (const subItem of menu.subItems) {
        if (path.startsWith(subItem.path) || (subItem.addPath && path.startsWith(subItem.addPath))) {
          foundMenu = menu.id;
          foundSubItem = subItem.id;
          break;
        }
      }
      if (foundMenu) break;
    }

    if (foundMenu) setActiveMenu(foundMenu);
    if (foundSubItem) setActiveSubItem(foundSubItem);
  }, [location.pathname]);

  const toggleMenu = (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  const handleSubItemClick = (subItem, menuId) => {
    // Navigate first
    navigate(subItem.path);
    
    // Then update UI state
    setActiveMenu(menuId);
    setActiveSubItem(subItem.id);
    
    if (windowWidth < 992) {
      setIsMobileSidebarOpen(false);
    }
  };

  const handleAddClick = (e, subItem, menuId) => {
    e.stopPropagation();
    if (subItem.addPath) {
      // Navigate first
      navigate(subItem.addPath);
      
      // Then update UI state
      setActiveMenu(menuId);
      setActiveSubItem(subItem.id);
      
      if (windowWidth < 992) {
        setIsMobileSidebarOpen(false);
      }
    }
  };

  const handleLogout = () => {
    // ['token', 'refreshToken', 'user'].forEach(item => localStorage.removeItem(item));
    // ['token', 'refreshToken'].forEach(item => sessionStorage.removeItem(item));
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <ToastContainer position="top-center" />

      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={() => setIsMobileSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar text-white p-3 d-flex flex-column ${isMobileSidebarOpen ? 'show' : ''}`}>
        <div className="mb-0 text-center pb-2">
          <h4 className="mb-0 text-dark fw-600">POS System</h4>
        </div>
        
        <div style={{ padding: '1rem', width: '200px' }}>
          <h3 className="sidebar-heading text-uppercase text-secondary fw-medium mt-3 mb-2 fs-6">
            MASTER
          </h3>
          <hr style={{ border: '1px solid grey', margin: '0 0 10px 0' }} />

          {/* Render menu items dynamically */}
          {menuItems.map((menu) => (
            <div key={menu.id} className="mb-2">
              <div 
                className={`d-flex justify-content-between align-items-center px-2 py-2 rounded mb-0 ${
                  activeMenu === menu.id ? 'bg-light' : ''
                }`}
                style={{ 
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => toggleMenu(menu.id)}
              >
                <div className="d-flex align-items-center">
                  {menu.icon}
                  <span className="fw-semibold text-dark" style={{ fontSize: '14px' }}>
                    {menu.title}
                  </span>
                </div>
                {activeMenu === menu.id ? (
                  <FaChevronUp className="text-secondary" />
                ) : (
                  <FaChevronDown className="text-secondary" />
                )}
              </div>

              {activeMenu === menu.id && (
                <div className="d-flex flex-column ms-4 mt-1 mb-2">
                  {menu.subItems.map((subItem) => (
                    <div
                      key={subItem.id}
                      className={`py-1 px-2 w-100 border-0 rounded d-flex justify-content-between align-items-center ${
                        activeSubItem === subItem.id ? 'active-subitem' : ''
                      }`}
                      style={{ 
                        fontSize: '14px',
                        color: activeSubItem === subItem.id ? '#1c7ed6' : 'black',
                        backgroundColor: activeSubItem === subItem.id ? '#e7f5ff' : 'transparent',
                        fontWeight: activeSubItem === subItem.id ? '600' : '400',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleSubItemClick(subItem, menu.id)}
                    >
                      <span>{subItem.title}</span>
                      {subItem.addPath && (
                        <FaPlus 
                          className="text-black" 
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => handleAddClick(e, subItem, menu.id)} 
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-3 border-top border-secondary">
          <button 
            onClick={handleLogout} 
            className="btn btn-outline-secondary w-100"
          >
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1">
        <button
          className="btn btn-outline-primary p-2 d-lg-none ms-3 mt-3"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <FaBars size={20} />
        </button>
       
        <main className="bg-light min-vh-100 p-3 p-lg-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}