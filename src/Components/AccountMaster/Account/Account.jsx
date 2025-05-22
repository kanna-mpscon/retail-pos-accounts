import React, { useState } from 'react';
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Account = () => {
 
  const [formData, setFormData] = useState({
    registrationType: 'Unregistered (Without GST)',
    partyType: 'Unit Application',
    accountName: 'Barry True PVT, LTD.',
    email: 'example@domain.com',
    danutTamNo: 'BADOOCOCH1',
    setStatutoryInfo: 'Yes',
    mailingDetails: {
      address1: 'Floor No., Building Name',
      country: 'India',
      state: 'TAMIL MADU',
      address2: 'Hair by Location, Landmark, Sub-district',
      pincode: '300001',
      city: ''
    },
    provideBankDetails: 'No',
    enableCreditLimit: 'No',
    customFieldLabel: 'Value',
    legalName: 'Barry True',
    contactPerson: {
      name: 'Barry True',
      mobileNo: '@BADOOCOCH1'
    },
    creditPeriod: 'Default Credit Period (in days)',
    paymentMode: 'Cheques'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <Container fluid className="py-4">
    
      
     
        <div className='d-flex'>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M15 18L9 12L15 6" 
            stroke="#181D27" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
          <h5 className="munim-fnt-sm">Create Account</h5>
         
        </div>
      
      
    
 
      <Card className="shadow">
        <Card.Body>
          
          <Form onSubmit={handleSubmit} className="fw-semibold text-dark" style={{ fontSize: '14px' }}>
            {/* Registration Section */}
            <Card className="mb-4">
              <Card.Body>
                <Row>
                <Col md={6}>
                    <Form.Group controlId="registrationType" className="mb-3">
                      <Form.Label>Under Group</Form.Label>
                      <Form.Select
                        name="registrationType"
                        value={formData.registrationType}
                        onChange={handleChange}
                        size="sm"
                      >
                        <option>Unregistered (Without GST)</option>
                        <option>Registered</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="registrationType" className="mb-3">
                      <Form.Label>Registration Type</Form.Label>
                      <Form.Select
                        name="registrationType"
                        value={formData.registrationType}
                        onChange={handleChange}
                        size="sm"
                      >
                        <option>Unregistered (Without GST)</option>
                        <option>Registered</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                 
                </Row>
                
                <Row>
                <Col md={6}>
                    <Form.Group controlId="partyType" className="mb-3">
                      <Form.Label>Party Type</Form.Label>
                      <Form.Select
                        name="partyType"
                        value={formData.partyType}
                        onChange={handleChange}
                        size="sm"
                      >
                        <option>Unit Application</option>
                        <option>Individual</option>
                        <option>Organization</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email" className="mb-3">
                      <Form.Label>Legal Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="legalname"
                        value={formData.legalname}
                        onChange={handleChange}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="accountName" className="mb-3">
                      <Form.Label>Account Name*</Form.Label>
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
                  <Col md={6}>
                    <Form.Group controlId="accountName" className="mb-3">
                      <Form.Label>Short/Alias Name*</Form.Label>
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

                  <Row>
                  <Col md={6}>
                    <Form.Group controlId="email" className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group controlId="contactprson" className="mb-3">
                      <Form.Label>Contact person name</Form.Label>
                      <Form.Control
                        type="text"
                        name="contactprson"
                        value={formData.contactperson}
                        onChange={handleChange}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="mobile" className="mb-3">
                      <Form.Label>Mobile No</Form.Label>
                      <Form.Control
                        type="number"
                        name="number"
                        value={formData.mobile}
                        onChange={handleChange}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                  </Row>
                
                  <Row>
                  <Col md={6}>
                    <Form.Group controlId="pan" className="mb-3">
                      <Form.Label>PAN/IT/TAN No.</Form.Label>
                      <Form.Control
                        type="text"
                        name="pan"
                        value={formData.pan}
                        onChange={handleChange}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group controlId="credit" className="mb-3">
                      <Form.Label>Default Credit Period (In days)</Form.Label>
                      <Form.Control
                        type="text"
                        name="credit"
                        value={formData.credit}
                        onChange={handleChange}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="mode" className="mb-3">
                      <Form.Label>Default Payment Mode
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="mode"
                        value={formData.mode}
                        onChange={handleChange}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                  </Row>
              
            
            {/* Statutory Information */}
                <Form.Group controlId="setStatutoryInfo" className="mb-3">
                  <Form.Label>Set / start statutory information?</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Yes"
                      name="setStatutoryInfo"
                      value="Yes"
                      checked={formData.setStatutoryInfo === 'Yes'}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="No"
                      name="setStatutoryInfo"
                      value="No"
                      checked={formData.setStatutoryInfo === 'No'}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
                
                {/* <Form.Group controlId="creditlimit" className="mb-3">
                  <Form.Label>Enable Credit Limit</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Yes"
                      name="creditlimit"
                      value="Yes"
                      checked={formData.creditlimit === 'Yes'}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="No"
                      name="creditlimit"
                      value="No"
                      checked={formData.creditlimit === 'No'}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group> */}
                                <h6 className="mb-3">Mailing Details
                                </h6>

                <Row>
                <Col md={6}>
                <Form.Group controlId="address1" className="mb-3">
                  <Form.Label>Address 1:</Form.Label>
                  <Form.Control
                    type="text"
                    name="mailingDetails.address1"
                    value={formData.mailingDetails.address1}
                    onChange={handleChange}
                    size="sm"
                  />
                </Form.Group>
                </Col>
                <Col md={6}>
                <Form.Group controlId="address2" className="mb-3">
                  <Form.Label>Address 2:</Form.Label>
                  <Form.Control
                    type="text"
                    name="mailingDetails.address2"
                    value={formData.mailingDetails.address2}
                    onChange={handleChange}
                    size="sm"
                  />
                </Form.Group>
                </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="country" className="mb-3">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        name="mailingDetails.country"
                        value={formData.mailingDetails.country}
                        onChange={handleChange}
                         size="sm"
                      >
                        <option>India</option>
                        <option>USA</option>
                        <option>UK</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="pincode" className="mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="number"
                        name="mailingDetails.pincode"
                        value={formData.mailingDetails.pincode}
                        onChange={handleChange}
                         size="sm"
                        required
                      />
                    </Form.Group>
                  </Col>
                  </Row>
                  <Row>
                  <Col md={6}>
                    <Form.Group controlId="state" className="mb-3">
                      <Form.Label>State*</Form.Label>
                      <Form.Control
                        type="text"
                        name="mailingDetails.state"
                        value={formData.mailingDetails.state}
                        onChange={handleChange}
                        required
                         size="sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="city" className="mb-3">
                      <Form.Label>City*</Form.Label>
                      <Form.Control
                        type="text"
                        name="mailingDetails.city"
                        value={formData.mailingDetails.city}
                        onChange={handleChange}
                        required
                         size="sm"
                      />
                    </Form.Group>
                  </Col>
                  </Row>
                  <Row>
                  <Col md={6}>
                    <Form.Group controlId="provideBankDetails" className="mb-3">
                      <Form.Label>Provide bank details?</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          type="radio"
                          label="Yes"
                          name="provideBankDetails"
                          value="Yes"
                          checked={formData.provideBankDetails === 'Yes'}
                          onChange={handleChange}
                          
                        />
                        <Form.Check
                          inline
                          type="radio"
                          label="No"
                          name="provideBankDetails"
                          value="No"
                          checked={formData.provideBankDetails === 'No'}
                          onChange={handleChange}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group controlId="enableCreditLimit" className="mb-3">
                      <Form.Label>Enable credit limit?</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          type="radio"
                          label="Yes"
                          name="enableCreditLimit"
                          value="Yes"
                          checked={formData.enableCreditLimit === 'Yes'}
                          onChange={handleChange}
                        />
                        <Form.Check
                          inline
                          type="radio"
                          label="No"
                          name="enableCreditLimit"
                          value="No"
                          checked={formData.enableCreditLimit === 'No'}
                          onChange={handleChange}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
               
            {/* Bank and Credit Options */}
            <Row>
  <Col md={6}>
    <Card className="mb-4">
      <Card.Body>
        <h6>Custom Field</h6>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="customFieldLabel1">
              <Form.Label>Label</Form.Label>
              <Form.Control
                type="text"
                name="customFieldLabel1"
                value={formData.customFieldLabel1}
                onChange={handleChange}
                 size="sm"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="customFieldLabel2">
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="text"
                name="customFieldLabel2"
                value={formData.customFieldLabel2}
                onChange={handleChange}
                 size="sm"
              />
            </Form.Group>
          </Col>
          <Col md={12} className="d-flex justify-content-start mt-2">
    <span
      role="button"
      style={{ color: '#1a73e8', fontWeight: 500, cursor: 'pointer' }}
    >
      + Add Custom Field
    </span>
  </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
</Row>
{/* Add this section where you want it to appear in your form */}
<Row>
  <Col md={6}>
    
        <h6 className="mb-3">Opening Balance</h6>
        <Row>
          <Col md={12}>
            <Form.Group controlId="openingBalance">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="openingBalance"
                value={formData.openingBalance}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Active"
                  name="status"
                  value="Active"
                  checked={formData.status === 'Active'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Inactive"
                  name="status"
                  value="Inactive"
                  checked={formData.status === 'Inactive'}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>
      
        </Row>
        
       
     
  </Col>
</Row>
<Row className="mt-4">
  <Col>
    <Button variant="secondary" size="sm">
      Cancel
    </Button>
  </Col>
  <Col className="text-end">
    <Button variant="primary" type="submit" size="sm">
      Submit
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

export default Account;