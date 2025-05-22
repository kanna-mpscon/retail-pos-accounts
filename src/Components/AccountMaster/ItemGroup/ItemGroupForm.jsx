import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';

const ItemGroupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    groupName: '',
    remarks: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save logic here
    console.log('Form data:', formData);
    navigate('/itemgroup');
  };

  return (
    <Offcanvas 
      show={true} 
      onHide={() => navigate('/itemgroup')} 
      placement="end"
      style={{ width: '400px' }}
    >
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title style={{ fontSize: '18px' }}>New Group</Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body className="p-3">
        <Form>
          {/* Group Name */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>
              Group Name*
            </Form.Label>
            <Form.Control 
              type="text" 
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              className="py-2"
              style={{ fontSize: '14px' }}
              required
              placeholder="Enter Group Name"
            />
          </Form.Group>

          {/* Remarks */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>
              Remarks
            </Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3}
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="py-2"
              style={{ fontSize: '14px' }}
              placeholder="Enter Remarks"
            />
          </Form.Group>

          <div className="d-flex justify-content-between border-top pt-3">
            <Button 
              variant="outline-secondary" 
              size="sm" 
              onClick={() => navigate('/itemgroup')}
              style={{ width: '100px' }}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleSave}
              style={{ width: '100px' }}
              disabled={!formData.groupName} // Disable if required field is empty
            >
              Save
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ItemGroupForm;