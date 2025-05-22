import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    underGroup: 'Other Duties & Taxes',
    accountName: 'Other tax payable',
    openingBalance: '0'
  });

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/accounts/${id}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching account:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAccountData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/accounts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      navigate('/dashboard/accounttable');
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  if (loading) return <Container fluid className="py-4">Loading...</Container>;

  return (
    <Container fluid className="py-4">
      <div className='d-flex align-items-center'>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => navigate(-1)}
          style={{ cursor: 'pointer', marginRight: '10px' }}
        >
          <path 
            d="M15 18L9 12L15 6" 
            stroke="#181D27" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <h5 className="munim-fnt-sm mb-0">Edit Account</h5>
      </div>

      <Card className="shadow mt-3">
        <Card.Body>
          <Form onSubmit={handleSubmit} className="fw-semibold text-dark" style={{ fontSize: '14px' }}>
            <Card className="mb-4 border-0">
              <Card.Body className="p-4">
                {/* Under Group */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Under Group</Form.Label>
                      <Form.Control
                        as="select"
                        name="underGroup"
                        value={formData.underGroup}
                        onChange={handleChange}
                        size="sm"
                      >
                        <option>Other Duties & Taxes</option>
                        <option>Primary</option>
                        <option>Secondary</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Account Name */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Account Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="accountName"
                        value={formData.accountName}
                        onChange={handleChange}
                        size="sm"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Opening Balance */}
                <Row>
  <Col md={6}>
    <Form.Group className="mb-3">
      <Form.Label>Opening Balance</Form.Label>
      <div className="d-flex align-items-center ">
  <Form.Control
    type="text"
    name="openingBalance"
    value={formData.openingBalance}
    onChange={handleChange}
    size="sm"
    className="flex-grow-0"
    style={{ width: '150px' }}
  />
  <Form.Select 
    name="balanceType"
    value={formData.balanceType || 'Cr'}
    onChange={handleChange}
    size="sm"
    className="flex-grow-0"
    style={{ width: '80px' }}
  >
    <option value="Cr">Cr</option>
    <option value="Dr">Dr</option>
  </Form.Select>
</div>
    </Form.Group>
  </Col>
</Row>

                {/* Action Buttons */}
                <Row className="mt-4">
                  <Col>
                    <Button 
                      variant="outline-secondary" 
                      size="sm" 
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col className="text-end">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="sm"
                    >
                      Save Changes
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AccountEdit;