import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Nav, Form, InputGroup } from 'react-bootstrap';
import { FaPlus, FaEye, FaEllipsisV, FaTimes } from "react-icons/fa";
import { MdKeyboardArrowDown, MdExpandMore, MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { FiSearch, FiColumns, FiGrid, FiMaximize2 } from 'react-icons/fi';

const UnitTable = () => {
  const [activeTab, setActiveTab] = useState('Default');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, column: null });
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Sample data
  const defaultTableData = [
    { id: '1', shortname: 'DAY', gstshortname: 'OTH', unitname: 'OTHERS', action: 'Edit' },
    { id: '2', shortname: 'D/N', gstshortname: 'OTH', unitname: 'OTHERS', action: 'Edit' },
  ];

  const customTableData = [
    { id: '1', gstshortname: 'BAG', unitname: 'BAGS' },
    { id: '2', gstshortname: 'SHOE', unitname: 'SIZE' },
  ];

  // Column configurations for each tab
  const columnConfig = {
    Default: [
      { key: 'shortname', label: 'Short Name', width: '180px' },
      { key: 'gstshortname', label: 'GST Short Name', width: '180px' },
      { key: 'unitname', label: 'Unit Name', width: '180px' }
    ],
    Custom: [
      { key: 'gstshortname', label: 'GST Shortname', width: '180px' },
      { key: 'unitname', label: 'Unit Name', width: '180px' }
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [contextMenu]);

  const requestSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    setContextMenu({ ...contextMenu, visible: false });
  };

  const sortedData = (data) => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredData = (data) => {
    if (!showFilters || Object.keys(filters).length === 0) return data;
    
    return data.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(row[key]).toLowerCase().includes(value.toLowerCase());
      });
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.66675 11.3334H10.6667M2.66675 8.00004H8.66675M2.66675 4.66671H6.66675M12.0001 8.66671V3.33337M12.0001 3.33337L14.0001 5.33337M12.0001 3.33337L10.0001 5.33337" stroke="#181D27" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      );
    }
    return sortConfig.direction === 'asc' ? (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.66675 11.3334H10.6667M2.66675 8.00004H8.66675M2.66675 4.66671H6.66675M12.0001 8.66671V3.33337M12.0001 3.33337L14.0001 5.33337M12.0001 3.33337L10.0001 5.33337" stroke="#181D27" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33325 5.33337L7.99992 10L12.6666 5.33337" stroke="#181D27" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  const handleEllipsisClick = (e, columnName) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, column: columnName });
  };

  const handleMenuAction = (action, columnName) => {
    if (action === 'sortAsc') setSortConfig({ key: columnName, direction: 'asc' });
    else if (action === 'sortDesc') setSortConfig({ key: columnName, direction: 'desc' });
    else if (action === 'clearSort') setSortConfig({ key: null, direction: 'asc' });
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilter = (key) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    if (!showFilters) {
      const initialFilters = {};
      columnConfig[activeTab].forEach(col => {
        initialFilters[col.key] = '';
      });
      setFilters(initialFilters);
    } else {
      setFilters({});
    }
  };

  const handleCloseAllFilters = () => {
    setShowFilters(false);
    setFilters({});
  };

  const renderContextMenu = () => {
    if (!contextMenu.visible) return null;

    const menuItems = [
      { label: 'Clear sort', action: 'clearSort' },
      { label: `Sort by ${contextMenu.column} ascending`, action: 'sortAsc' },
      { label: `Sort by ${contextMenu.column} descending`, action: 'sortDesc' },
    ];

    return (
      <div 
        ref={menuRef}
        style={{
          position: 'fixed',
          top: contextMenu.y,
          left: contextMenu.x,
          backgroundColor: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          borderRadius: '4px',
          zIndex: 1000,
          minWidth: '200px'
        }}
      >
        {menuItems.map((item, index) => (
          <div 
            key={item.action}
            className="p-2 hover-bg-gray" 
            style={{ cursor: 'pointer' }}
            onClick={() => handleMenuAction(item.action, contextMenu.column)}
          >
            {item.label}
          </div>
        ))}
      </div>
    );
  };

  const renderEllipsisMenu = (columnName) => (
    <div className="ms-auto" style={{ cursor: 'pointer' }}>
      <FaEllipsisV size={12} onClick={(e) => handleEllipsisClick(e, columnName)} />
    </div>
  );

  const renderTableHeader = () => (
    <thead className="table-primary sticky-top text-white">
      <tr>
        {/* First column - no filter */}
        <th style={{ width: '100px', verticalAlign: 'top' }}>
          <div className="d-flex align-items-center">
            <button className="btn btn-sm p-0 border-0 me-2">
              <MdKeyboardDoubleArrowDown size={20} />
            </button>
            {renderEllipsisMenu('Actions')}
          </div>
        </th>
        
        {/* Middle columns - with filters */}
        {columnConfig[activeTab].map((col) => (
          <th key={col.key} style={{ width: col.width, fontSize: "14px", verticalAlign: 'top' }}>
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center">
                <span>{col.label}</span>
                <button 
                  className="btn btn-sm p-0 border-0 ms-2"
                  onClick={() => requestSort(col.key)}
                >
                  {getSortIcon(col.key)}
                </button>
                {renderEllipsisMenu(col.label)}
              </div>
              {showFilters && (
                <InputGroup size="sm" className="mt-1">
                  <Form.Control
                    type="text"
                    placeholder={`Filter ${col.label}`}
                    value={filters[col.key] || ''}
                    onChange={(e) => handleFilterChange(col.key, e.target.value)}
                    style={{ fontSize: '12px' }}
                  />
                  <InputGroup.Text 
                    className="bg-white" 
                    style={{ cursor: 'pointer' }}
                    onClick={handleCloseAllFilters}
                  >
                    <FaTimes size={10} />
                  </InputGroup.Text>
                </InputGroup>
              )}
            </div>
          </th>
        ))}
        
        {/* Actions column - no filter */}
        {activeTab === 'Default' && (
          <th style={{ width: '130px', textAlign: 'center', verticalAlign: 'top' }}>
            <div className="d-flex align-items-center justify-content-center">
              <span>Actions</span>
              {renderEllipsisMenu('Actions')}
            </div>
          </th>
        )}
      </tr>
    </thead>
  );

  const renderTableBody = () => {
    const data = activeTab === 'Default' ? defaultTableData : customTableData;
    return (
      <tbody style={{ fontSize: '14px' }}>
        {filteredData(sortedData(data)).map((row) => (
          <tr key={row.id}>
            <td>
              <button className="btn btn-sm p-0 border-0">
                <MdExpandMore size={20} />
              </button>
            </td>
            {columnConfig[activeTab].map((col) => (
              <td key={col.key}>{row[col.key]}</td>
            ))}
            {activeTab === 'Default' && (
              <td className="text-center">
                <Button variant="link" size="sm" className="p-0" style={{ color: 'blue' }}>
                  {row.action}
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="react-dataTable munim-unit-tble munim-quo-filed-left action-align-end munim-no-data-border munim-fixed-action munim-sales-inv-list">
      <div className="munim-table">
        <div className="card shadow-sm">
          <div className="card-body p-0">
            {/* Toolbar */}
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
              <div className="d-flex align-items-center">
                <h5 className="mb-0">Unit</h5>
              </div>
              <div>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="me-2" 
                  onClick={() => navigate('/unit/new')}
                >
                  <FaPlus className="me-1" /> Create Unit
                </Button>
              </div>
            </div>

            <div className="pt-3 d-flex justify-content-between align-items-end mb-4">
              <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
                {['Default', 'Custom'].map((tab) => (
                  <Nav.Item key={tab}>
                    <Nav.Link
                      eventKey={tab}
                      className={`rounded-0 px-4 py-2 ${
                        activeTab === tab
                          ? 'text-dark bg-white fw-semibold'
                          : 'text-muted bg-light'
                      }`}
                      style={{
                        cursor: 'pointer',
                        border: activeTab === tab ? '1px solid #e0e0e0' : 'none',
                        borderBottom: activeTab === tab ? '3px solid #28a745' : 'none',
                        transition: 'all 0.2s',
                        fontSize: '14px', 
                      }}
                      onClick={() => setActiveTab(tab)}
                      onMouseEnter={(e) => {
                        if (activeTab !== tab) {
                          e.currentTarget.style.border = '1px solid #e0e0e0';
                          e.currentTarget.classList.add('text-dark');
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeTab !== tab) {
                          e.currentTarget.style.border = 'none';
                          e.currentTarget.classList.remove('text-dark');
                        }
                      }}
                    >
                      {tab}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              {/* Table Controls */}
              <div className="d-flex align-items-center gap-0">
                <Button 
                  variant={showFilters ? "primary" : "light"} 
                  size="sm" 
                  className="rounded-end-0 border-end-0"
                  onClick={toggleFilters}
                >
                  <FiSearch size={16} />
                </Button>
                {[FiColumns, FiGrid, FiMaximize2].map((Icon, i) => (
                  <Button 
                    key={i} 
                    variant="light" 
                    size="sm" 
                    className={
                      i === 0 ? "rounded-0 border-start-0 border-end-0" :
                      i === 2 ? "rounded-start-0 border-start-0" :
                      "rounded-0 border-start-0 border-end-0"
                    }
                  >
                    <Icon size={16} />
                  </Button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {renderContextMenu()}
              <Table bordered hover className="mb-0">
                {renderTableHeader()}
                {renderTableBody()}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitTable;