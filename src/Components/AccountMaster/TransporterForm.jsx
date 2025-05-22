import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Offcanvas, Form, Button, Row, Col } from 'react-bootstrap';

const TransporterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gstNumber: '24XXXXXXXXXXXXZV',
    name: 'Barry Tone',
    vehicleNo: '',
    mode: 'Road',
    vehicleType: 'Regular',
    status: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Save logic here
    navigate('/transporter');
  };

  return (
    <Offcanvas 
      show={true} 
      onHide={() => navigate('/transporter')} 
      placement="end"
      style={{ width: '450px' }}
    >
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title style={{ fontSize: '18px' }}>New Transporter</Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body className="p-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>
              Transporter Id (GST Number)
            </Form.Label>
            <Form.Control 
              type="text" 
              value={formData.gstNumber}
              readOnly
              className="py-2"
              style={{ fontSize: '14px', backgroundColor: '#f8f9fa' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>
              Transporter Name*
            </Form.Label>
            <Form.Control 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="py-2"
              style={{ fontSize: '14px' }}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>
                  Vehicle No.
                </Form.Label>
                <Form.Control 
                  type="text" 
                  name="vehicleNo"
                  value={formData.vehicleNo}
                  onChange={handleChange}
                  className="py-2"
                  style={{ fontSize: '14px' }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>
                  Mode
                </Form.Label>
                <Form.Select 
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="py-2"
                  style={{ fontSize: '14px' }}
                >
                  <option value="Road">Road</option>
                  <option value="Air">Air</option>
                  <option value="Sea">Sea</option>
                  <option value="Rail">Rail</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>
              Vehicle Type
            </Form.Label>
            <Form.Control 
              type="text" 
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="py-2"
              style={{ fontSize: '14px' }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>
              Status
            </Form.Label>
            <div className="d-flex gap-3">
              <Form.Check
                type="radio"
                label="Active"
                name="status"
                id="active"
                checked={formData.status === 'Active'}
                onChange={() => setFormData({...formData, status: 'Active'})}
                style={{ fontSize: '14px' }}
              />
              <Form.Check
                type="radio"
                label="Inactive"
                name="status"
                id="inactive"
                checked={formData.status === 'Inactive'}
                onChange={() => setFormData({...formData, status: 'Inactive'})}
                style={{ fontSize: '14px' }}
              />
            </div>
          </Form.Group>

          <div className="d-flex justify-content-between border-top pt-3">
            <Button 
              variant="outline-secondary" 
              size="sm" 
              onClick={() => navigate('/transporter')}
              style={{ width: '100px' }}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleSave}
              style={{ width: '100px' }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default TransporterForm;