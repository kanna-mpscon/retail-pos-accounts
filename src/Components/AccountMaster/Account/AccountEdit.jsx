import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState({
    accountName: 'Discount',
    description: '',
    userName: 'JACK',
    hsnCode: '',
    itemType: '',
    transactionNature: 'Not Applicable',
    gstRate: '0%',
    isActive: true
  });

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API call
        const response = await fetch(`/api/accounts/${id}`);
        const data = await response.json();
        setAccountData(data);
      } catch (error) {
        console.error('Error fetching account:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAccountData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual API call to update
      await fetch(`/api/accounts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData)
      });
      navigate('/accounts');
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  if (loading) {
    return <Container fluid className="py-4">Loading...</Container>;
  }

  return (
    <Container fluid className="py-4">
      <div className='d-flex'>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => navigate(-1)}
          style={{ cursor: 'pointer' }}
        >
          <path 
            d="M15 18L9 12L15 6" 
            stroke="#181D27" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <h5 className="munim-fnt-sm">Edit Account</h5>
      </div>

      <Card className="shadow">
        <Card.Body>
          <Form onSubmit={handleSubmit} className="fw-semibold text-dark" style={{ fontSize: '14px' }}>
            <Card className="mb-4">
              <Card.Body>
              <Row>
              <Col md={6}>
                    <Form.Group controlId="accountName" className="mb-3">
                      <Form.Label>Under Group</Form.Label>
                      <Form.Control
                        type="text"
                        name="accountName"
                        value={accountData.accountName}
                        onChange={handleInputChange}
                        size="sm"
                        required
                      />
                    </Form.Group>
                    </Col>
                    </Row>
                    
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="accountName" className="mb-3">
                      <Form.Label>Account Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="accountName"
                        value={accountData.accountName}
                        onChange={handleInputChange}
                        size="sm"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="accountName" className="mb-3">
                      <Form.Label>Short/Alias  Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="accountName"
                        value={accountData.accountName}
                        onChange={handleInputChange}
                        size="sm"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="description" className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Write a description."
                        value={accountData.description}
                        onChange={handleInputChange}
                        rows={3}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="hsnCode" className="mb-3">
                      <Form.Label>HSN/SAC</Form.Label>
                      <Form.Control
                        type="text"
                        name="hsnCode"
                        value={accountData.hsnCode}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    </Form.Group>
                    <Form.Group controlId="itemType" className="mb-3">
                      <Form.Label>Item Type</Form.Label>
                      <Form.Control
                        type="text"
                        name="itemType"
                        value={accountData.itemType}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    
                  </Col>
                </Row>


                <Row>
                <Col md={6}>
                    <Form.Group controlId="gstRate" className="mb-3">
                      <Form.Label>GST Rate(%)</Form.Label>
                      <Form.Control
                        type="text"
                        name="gstRate"
                        value={accountData.gstRate}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="transactionNature" className="mb-3">
                      <Form.Label>Nature Of Transaction</Form.Label>
                      <Form.Control
                        type="text"
                        name="transactionNature"
                        value={accountData.transactionNature}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>


                <Row>
                  
                  </Row>
                  <Row>
                  <Col md={6}>
                    <Form.Group controlId="isActive" className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          type="radio"
                          label="Active"
                          name="isActive"
                          id="active"
                          checked={accountData.isActive}
                          onChange={() => setAccountData({...accountData, isActive: true})}
                        />
                        <Form.Check
                          inline
                          type="radio"
                          label="Inactive"
                          name="isActive"
                          id="inactive"
                          checked={!accountData.isActive}
                          onChange={() => setAccountData({...accountData, isActive: false})}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col>
                    <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
                      Cancel
                    </Button>
                  </Col>
                  <Col className="text-end">
                    <Button variant="primary" type="submit" size="sm">
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