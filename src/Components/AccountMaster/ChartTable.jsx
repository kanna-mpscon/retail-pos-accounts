import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdExpandMore, MdKeyboardDoubleArrowDown ,MdContentPasteSearch } from 'react-icons/md';
import { FiSearch, FiColumns, FiGrid, FiMaximize2 } from 'react-icons/fi';

const GroupTable = () => {
  const tableData = [
    { id: '35', groupName: 'Partners / Members fund (2)', underGroup: 'Primary', item: 'BALANCE SHEET', natureOfGroup: 'LIABILITIES', hasChildren: true },
    { id: '17', groupName: 'Loans (Liability) (2)', underGroup: 'Primary', item: 'BALANCE SHEET', natureOfGroup: 'LIABILITIES', hasChildren: true },
    { id: '34', groupName: 'Advances (Liability)', underGroup: 'Primary', item: 'BALANCE SHEET', natureOfGroup: 'LIABILITIES', hasChildren: false },
    { id: '14', groupName: 'Current Liabilities (5)', underGroup: 'Primary', item: 'BALANCE SHEET', natureOfGroup: 'LIABILITIES', hasChildren: true },
    { id: '8', groupName: 'Fixed Assets', underGroup: 'Primary', item: 'BALANCE SHEET', natureOfGroup: 'ASSETS', hasChildren: false },
    { id: '9', groupName: 'Investments (2)', underGroup: 'Primary', item: 'BALANCE SHEET', natureOfGroup: 'ASSETS', hasChildren: true },
    { id: '5', groupName: 'Loans & Advances (Asset) (1)', underGroup: 'Primary', item: 'BALANCE SHEET', natureOfGroup: 'ASSETS', hasChildren: true },
    { id: '1', groupName: 'Current Assets (7)', underGroup: 'Primary', item: 'BALANCE SHEET', natureOfGroup: 'ASSETS', hasChildren: true },
    { id: '11', groupName: 'Suspense A/c', underGroup: 'Primary', item: 'BALANCE SHEET', natureOfGroup: 'ASSETS', hasChildren: false },
    { id: '21', groupName: 'Sales Accounts', underGroup: 'Primary', item: 'PROFIT AND LOSS', natureOfGroup: 'INCOME', hasChildren: false },
    { id: '22', groupName: 'Direct Incomes', underGroup: 'Primary', item: 'PROFIT AND LOSS', natureOfGroup: 'INCOME', hasChildren: false },
    { id: '23', groupName: 'Indirect Incomes', underGroup: 'Primary', item: 'PROFIT AND LOSS', natureOfGroup: 'INCOME', hasChildren: false },
    { id: '24', groupName: 'Purchase Accounts', underGroup: 'Primary', item: 'PROFIT AND LOSS', natureOfGroup: 'EXPENSES', hasChildren: false },
    { id: '25', groupName: 'Direct Expenses', underGroup: 'Primary', item: 'PROFIT AND LOSS', natureOfGroup: 'EXPENSES', hasChildren: false },
    { id: '26', groupName: 'Indirect Expenses', underGroup: 'Primary', item: 'PROFIT AND LOSS', natureOfGroup: 'EXPENSES', hasChildren: false },
  ];

  return (
    <div className="react-dataTable munim-unit-tble munim-quo-filed-left action-align-end munim-no-data-border munim-fixed-action munim-sales-inv-list">
      <div className="munim-table">
        <div className="card shadow-sm">
          <div className="card-body p-0">
            {/* Toolbar */}
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
              <div className="d-flex align-items-center">
                <h5 className="mb-0">Charts of Accounts</h5>
              </div>
             
            </div>

            {/* Table */}
            
            <div className="d-flex justify-content-end align-items-center my-2">  
            <div className="d-flex">
    <div className="border  p-1">
      <Button variant="light" size="sm" title="Search" className="p-0 border-0">
        <MdContentPasteSearch  size={16} />
      </Button>
    </div>
    <div className="border  p-1">
      <Button variant="light" size="sm" title="Columns" className="p-0 border-0">
        <FiColumns size={16} />
      </Button>
    </div>
    <div className="border  p-1">
      <Button variant="light" size="sm" title="Density" className="p-0 border-0">
        <FiGrid size={16} />
      </Button>
    </div>
    <div className="border  p-1">
      <Button variant="light" size="sm" title="Full screen" className="p-0 border-0">
        <FiMaximize2 size={16} />
      </Button>
    </div>
  </div>
</div>
<div className="table-responsive" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <Table bordered hover className="mb-0">
                <thead  className="table-primary primary sticky-top text-white" style={{ fontSize: '14px' }}>
                  <tr>
                    <th style={{ width: '100px' }}>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-sm p-0 border-0 me-2">
                          <MdKeyboardDoubleArrowDown size={20} />
                        </button>
                      </div>
                    </th>
                    <th style={{ width: '180px' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Chart Of Accounts</span>
                        <div>
                          <button className="btn btn-sm p-0 border-0 ms-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.66675 11.3334H10.6667M2.66675 8.00004H8.66675M2.66675 4.66671H6.66675M12.0001 8.66671V3.33337M12.0001 3.33337L14.0001 5.33337M12.0001 3.33337L10.0001 5.33337" stroke="#181D27" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </th>
                    <th style={{ width: '180px' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Under Group</span>
                        <div>
                          <button className="btn btn-sm p-0 border-0 ms-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.66675 11.3334H10.6667M2.66675 8.00004H8.66675M2.66675 4.66671H6.66675M12.0001 8.66671V3.33337M12.0001 3.33337L14.0001 5.33337M12.0001 3.33337L10.0001 5.33337" stroke="#181D27" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </th>
                    <th style={{ width: '180px' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Item</span>
                        <div>
                          <button className="btn btn-sm p-0 border-0 ms-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.66675 11.3334H10.6667M2.66675 8.00004H8.66675M2.66675 4.66671H6.66675M12.0001 8.66671V3.33337M12.0001 3.33337L14.0001 5.33337M12.0001 3.33337L10.0001 5.33337" stroke="#181D27" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </th>
                    <th style={{ width: '180px' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Nature Of Group</span>
                        <div>
                          <button className="btn btn-sm p-0 border-0 ms-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.66675 11.3334H10.6667M2.66675 8.00004H8.66675M2.66675 4.66671H6.66675M12.0001 8.66671V3.33337M12.0001 3.33337L14.0001 5.33337M12.0001 3.33337L10.0001 5.33337" stroke="#181D27" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </th>
                    <th style={{ width: '130px', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-light" style={{fontSize: '14px'}} >
                  {tableData.map((row) => (
                    <tr key={row.id}>
                      <td className="align-middle">
                        {row.hasChildren ? (
                          <button className="btn btn-sm p-0 border-0">
                            <MdExpandMore size={20} />
                          </button>
                        ) : (
                          <button className="btn btn-sm p-0 border-0" disabled>
                            <MdKeyboardArrowDown size={20} style={{ transform: 'rotate(-90deg)' }} />
                          </button>
                        )}
                      </td>
                      <td className="align-middle">{row.groupName}</td>
                      <td className="align-middle">{row.underGroup}</td>
                      <td className="align-middle">{row.item}</td>
                      <td className="align-middle">{row.natureOfGroup}</td>
                      <td className="align-middle text-center">
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-decoration-none p-0"
                          style={{ color: 'blue' }}
                        >
                          Add subgroup
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupTable;