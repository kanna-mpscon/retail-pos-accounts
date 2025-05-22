import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';

const UnitForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shortName: '',
    unitName: '',
    isRequired: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Save logic here
    console.log('Form data:', formData);
    navigate('/unit');
  };

  return (
    <Offcanvas 
      show={true} 
      onHide={() => navigate('/unit')} 
      placement="end"
      style={{ width: '400px' }}
    >
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title style={{ fontSize: '18px' }}>Create unit</Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body className="p-3">
        <Form>
          {/* Short Name */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>
              Short Name*
            </Form.Label>
            <Form.Control 
              type="text" 
              name="shortName"
              value={formData.shortName}
              onChange={handleChange}
              className="py-2"
              style={{ fontSize: '14px' }}
              required
              placeholder="Enter Short Name"
            />
          </Form.Group>

          {/* Unit Name */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>
              Unit Name
            </Form.Label>
            <Form.Control 
              type="text" 
              name="unitName"
              value={formData.unitName}
              onChange={handleChange}
              className="py-2"
              style={{ fontSize: '14px' }}
              placeholder="Enter Unit Name"
            />
          </Form.Group>

          {/* Is Required Checkbox */}
          <Form.Group className="mb-4">
            <Form.Check 
              type="checkbox"
              label="Is required"
              name="isRequired"
              checked={formData.isRequired}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-between border-top pt-3">
            <Button 
              variant="outline-secondary" 
              size="sm" 
              onClick={() => navigate('/dashboard/unit')}
              style={{ width: '100px' }}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleSave}
              style={{ width: '100px' }}
              disabled={!formData.shortName} 
            >
              Save
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UnitForm;