import React, { useState } from 'react';
import { Container, Form, Row, Col, Button, Card, Table,InputGroup } from 'react-bootstrap';
import { FaPlus, FaEllipsisV, FaTimes } from "react-icons/fa";

import 'bootstrap/dist/css/bootstrap.min.css';

const QuotationForm = () => {
  const [formData, setFormData] = useState({
    customer: '',
    mobileNo: '00000000001',
    email: 'example@domain.com',
    operationNo: '0001',
    operationDate: '',
    validTill: '',
    items: [{
      id: 1,
      goodsService: '',
      quantity: 1,
      rate: 0,
      amount: 0
    }],
    specialNotes: '',
    subtotal: 0,
    taxableAmount: 0,
    totalTaxableAmount: 0,
    gst: 0,
    cgst: 0,
    total: 0,
    discount: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    
    // Update the changed field
    newItems[index] = {
      ...newItems[index],
      [name]: name === 'quantity' || name === 'rate' ? Number(value) : value
    };
    
    // Calculate amount if quantity or rate changes
    if (name === 'quantity' || name === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    // Calculate subtotal
    const subtotal = newItems.reduce((sum, item) => sum + item.amount, 0);
    
    setFormData(prev => ({
      ...prev,
      items: newItems,
      subtotal: subtotal
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: prev.items.length + 1,
          goodsService: '',
          quantity: 1,
          rate: 0,
          amount: 0
        }
      ]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <Container fluid className="py-4">
      <div className='d-flex align-items-center mb-3'>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="me-2"
        >
          <path 
            d="M15 18L9 12L15 6" 
            stroke="#181D27" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <h5 className="munim-fnt-sm">Create Quotation</h5>
      </div>
      
      <Card className="shadow">
        <Card.Body>
          <Form onSubmit={handleSubmit} className="fw-semibold text-dark" style={{ fontSize: '14px' }}>
            {/* Customer Info Section */}
            <h6 className="mb-3">Customer Info.</h6>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="customer">
                  <Form.Label>Customer*</Form.Label>
                  <Form.Control
                    as="select"
                    name="customer"
                    value={formData.customer}
                    onChange={handleChange}
                    size="sm"
                    required
                  >
                    <option value="">Master Select Customer</option>
                    <option value="customer1">Customer 1</option>
                    <option value="customer2">Customer 2</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="mobileNo">
                  <Form.Label>Mobile No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    size="sm"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="email">
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
            </Row>
            
            <Row className="mb-3">
            
              <Col md={3}>
                <Form.Group controlId="operationNo">
                  <Form.Label>Operation No.*</Form.Label>
                  <InputGroup size="sm">
                    <Form.Control
                      type="text"
                      name="operationNo"
                      value={formData.operationNo}
                      onChange={handleChange}
                      size="sm"
                      required
                    />
                    <Button variant="outline-secondary">Switch</Button>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="operationDate">
                  <Form.Label>Quotation Date*</Form.Label>
                  <Form.Control
                    type="date"
                    name="operationDate"
                    value={formData.operationDate}
                    onChange={handleChange}
                    size="sm"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="validTill">
                  <Form.Label>Valid Till</Form.Label>
                  <Form.Control
                    type="date"
                    name="validTill"
                    value={formData.validTill}
                    onChange={handleChange}
                    size="sm"
                  />
                </Form.Group>
              </Col>
            </Row>
            
          
            
            {/* Items Table */}
            <Table bordered className="mb-3">
              <thead className="table-primary">
                <tr>
                  <th style={{ width: '50px' }}>S.NO.</th>
                  <th>GOODS/SERVICE</th>
                  <th style={{ width: '100px' }}>QTY</th>
                  <th style={{ width: '120px' }}>RATE</th>
                  <th style={{ width: '120px' }}>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <Form.Control
                        as="select"
                        name="goodsService"
                        value={item.goodsService}
                        onChange={(e) => handleItemChange(index, e)}
                        size="sm"
                      >
                        <option value="">Choose select goods/services</option>
                        <option value="service1">Service 1</option>
                        <option value="service2">Service 2</option>
                      </Form.Control>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, e)}
                        size="sm"
                        min="1"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        name="rate"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, e)}
                        size="sm"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td>{item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
            <div className="d-flex justify-content-between align-items-center mb-3">
  <Button 
    variant="link" 
    size="sm" 
    onClick={addItem}
    className="p-0 text-decoration-none"
  >
    <FaPlus className="me-1" /> Add Row
  </Button>
  <div className="d-flex">
    <span className="me-3">Subtotal</span>
    <span>0.00</span>
  </div>
</div>
            
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="specialNotes">
                  <Form.Label>Special Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="specialNotes"
                    value={formData.specialNotes}
                    onChange={handleChange}
                    size="sm"
                    rows={3}
                    placeholder="Write your special notes for this quotation."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <div className="border p-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>{formData.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Taxable Amt.</span>
                    <span>{formData.taxableAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      <Button variant="link" size="sm" className="p-0">+ Add service charge with tax</Button>
                    </span>
                    <span>{formData.totalTaxableAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>GST</span>
                    <span>{formData.gst.toFixed(2)}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>CGST</span>
                    <span>{formData.cgst.toFixed(2)}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Sub Total</span>
                    <span>{formData.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      <Button variant="link" size="sm" className="p-0">+ Add Another Charge</Button>
                    </span>
                    <span></span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Discount</span>
                    <span>{formData.discount.toFixed(2)}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Sub Total</span>
                    <span>{formData.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      <Button variant="link" size="sm" className="p-0">+ Add Another Charge</Button>
                    </span>
                    <span></span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Discount</span>
                    <span>{formData.discount.toFixed(2)}</span>
                  </div>
                </div>
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
                  Save & New
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default QuotationForm;