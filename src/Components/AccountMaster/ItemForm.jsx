import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Offcanvas, Form, Button, Row, Col } from 'react-bootstrap';

const ItemForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = location.pathname.includes('/item/edit');

  const defaultFormData = {
    id: null,
    type: 'Goods',
    name: '',
    description: '',
    group: '',
    unit: '',
    manageStockConfig: 'Normal',
    sku: '',
    openingStockValue: 0,
    negativeQtyAllowed: false,
    showInPurchase: {
      mbp: false,
      purchasePrice: false,
      price: 0,
      priceWithDecimal: 0
    },
    gstRate: '0%',
    cessEnable: false,
    category: '',
    hsnCode: '',
    openingStockQty: 0,
    lowStockWarning: false,
    showInSales: {
      salesPrice: false,
      price: 0,
      exclusiveGst: false
    },
    status: 'Active'
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && location.state) {
      setFormData({ ...defaultFormData, ...location.state });
    }
  }, [isEditMode, location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: typeof value === 'string' && !isNaN(value) ? parseFloat(value) : value
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      console.log('Saving item:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/item');
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Offcanvas show={true} onHide={() => navigate('/item')} placement="end" style={{ width: '550px' }}>
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title style={{ fontSize: '18px' }}>
          {isEditMode ? 'Edit Item' : 'New Item'}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-3">
        <Form>
          {/* Type Selection */}
          <Form.Group className="mb-3 border-bottom pb-3">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>Type</Form.Label>
            <div className="d-flex gap-3">
              {['Goods', 'Service', 'Additional Service'].map((type) => (
                <Form.Check
                  key={type}
                  type="radio"
                  label={type}
                  name="type"
                  checked={formData.type === type}
                  onChange={() => setFormData({ ...formData, type })}
                  style={{ fontSize: '14px' }}
                />
              ))}
            </div>
          </Form.Group>

          {/* Name */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>Name*</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="py-2"
              style={{ fontSize: '14px' }}
              required
              placeholder="Enter Name"
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="py-2"
              style={{ fontSize: '14px' }}
              placeholder="Enter Description"
            />
          </Form.Group>

          {/* Group */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>Group</Form.Label>
            <Form.Select
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="py-2"
              style={{ fontSize: '14px' }}
            >
              <option value="">None of the list</option>
              <option value="Building Materials">Building Materials</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
            </Form.Select>
          </Form.Group>

          {/* Unit */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>Unit*</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="py-2 me-2"
                style={{ fontSize: '14px', flex: 1 }}
                required
              >
                <option value="">Select Unit</option>
                <option value="SQF">SQF</option>
                <option value="KG">KG</option>
                <option value="LTR">LTR</option>
                <option value="PCS">PCS</option>
              </Form.Select>
              <Form.Check
                type="checkbox"
                label="Multi Unit Config"
                disabled
                style={{ fontSize: '14px' }}
              />
            </div>
          </Form.Group>

          {/* Manage Stock Config */}
          <Form.Group className="mb-3 border-bottom pb-3">
            <div className="d-flex align-items-center mb-2">
              <Form.Label className="fw-bold me-2" style={{ fontSize: '14px' }}>
                Manage stock Config*
              </Form.Label>
              <Form.Check type="checkbox" checked disabled style={{ fontSize: '14px' }} />
            </div>
            <div className="d-flex gap-3">
              {['Normal', 'Batch wise', 'Lot wise'].map((config) => (
                <Form.Check
                  key={config}
                  type="radio"
                  label={config}
                  name="manageStockConfig"
                  checked={formData.manageStockConfig === config}
                  onChange={() => setFormData({ ...formData, manageStockConfig: config })}
                  style={{ fontSize: '14px' }}
                />
              ))}
            </div>
          </Form.Group>

          {/* SKU */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>SKU / Goods Code</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="py-2"
              style={{ fontSize: '14px' }}
              placeholder="Enter SKU"
            />
          </Form.Group>

          {/* Opening Stock Value + Negative Qty Allowed */}
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>Opening Stock Value</Form.Label>
                <Form.Control
                  type="number"
                  name="openingStockValue"
                  value={formData.openingStockValue}
                  onChange={handleChange}
                  className="py-2"
                  style={{ fontSize: '14px' }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>Negative Qty Allowed</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Check
                    type="radio"
                    label="Yes"
                    name="negativeQtyAllowed"
                    checked={formData.negativeQtyAllowed === true}
                    onChange={() => setFormData({ ...formData, negativeQtyAllowed: true })}
                    style={{ fontSize: '14px' }}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="negativeQtyAllowed"
                    checked={formData.negativeQtyAllowed === false}
                    onChange={() => setFormData({ ...formData, negativeQtyAllowed: false })}
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Show Item In Purchase */}
          <Form.Group className="mb-3 border p-3 rounded">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>Show Item In Purchase</Form.Label>
            <Form.Check
              type="checkbox"
              label="MBP"
              checked={formData.showInPurchase.mbp}
              onChange={(e) => handleNestedChange('showInPurchase', 'mbp', e.target.checked)}
              style={{ fontSize: '14px' }}
            />
            <Form.Check
              type="checkbox"
              label="Purchase Price"
              checked={formData.showInPurchase.purchasePrice}
              onChange={(e) => handleNestedChange('showInPurchase', 'purchasePrice', e.target.checked)}
              style={{ fontSize: '14px' }}
            />
            <div className="d-flex gap-2">
              <Form.Control
                type="number"
                value={formData.showInPurchase.price}
                onChange={(e) => handleNestedChange('showInPurchase', 'price', e.target.value)}
                style={{ fontSize: '14px', width: '100px' }}
              />
              <Form.Control
                type="number"
                value={formData.showInPurchase.priceWithDecimal}
                onChange={(e) => handleNestedChange('showInPurchase', 'priceWithDecimal', e.target.value)}
                style={{ fontSize: '14px', width: '100px' }}
                step="0.001"
              />
            </div>
          </Form.Group>

          {/* GST + Cess */}
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>GST Rate</Form.Label>
                <Form.Select
                  name="gstRate"
                  value={formData.gstRate}
                  onChange={handleChange}
                  className="py-2"
                  style={{ fontSize: '14px' }}
                >
                  {['0%', '5%', '12%', '18%', '28%'].map(rate => (
                    <option key={rate} value={rate}>{rate}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>Cess Enable</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Check
                    type="radio"
                    label="Yes"
                    checked={formData.cessEnable === true}
                    onChange={() => setFormData({ ...formData, cessEnable: true })}
                    style={{ fontSize: '14px' }}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    checked={formData.cessEnable === false}
                    onChange={() => setFormData({ ...formData, cessEnable: false })}
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Category + HSN */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="py-2"
              style={{ fontSize: '14px' }}
            >
              <option value="">None</option>
              <option value="Normal">Normal</option>
              <option value="Special">Special</option>
              <option value="Imported">Imported</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>HSN Code*</Form.Label>
            <Form.Control
              type="text"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleChange}
              className="py-2"
              style={{ fontSize: '14px' }}
              placeholder="Enter 4 to 8 digit code"
              required
            />
          </Form.Group>

          {/* Opening Stock Qty + Low Stock Warning */}
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>Opening Stock Qty</Form.Label>
                <Form.Control
                  type="number"
                  name="openingStockQty"
                  value={formData.openingStockQty}
                  onChange={handleChange}
                  className="py-2"
                  style={{ fontSize: '14px' }}
                  step="0.001"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>Low Stock Warning</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Check
                    type="radio"
                    label="Yes"
                    checked={formData.lowStockWarning === true}
                    onChange={() => setFormData({ ...formData, lowStockWarning: true })}
                    style={{ fontSize: '14px' }}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    checked={formData.lowStockWarning === false}
                    onChange={() => setFormData({ ...formData, lowStockWarning: false })}
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Show Item In Sales */}
          <Form.Group className="mb-3 border p-3 rounded">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>Show Item In Sales</Form.Label>
            <Form.Check
              type="checkbox"
              label="Sales Price"
              checked={formData.showInSales.salesPrice}
              onChange={(e) => handleNestedChange('showInSales', 'salesPrice', e.target.checked)}
              style={{ fontSize: '14px' }}
            />
            <div className="d-flex gap-2 align-items-center">
              <Form.Control
                type="number"
                value={formData.showInSales.price}
                onChange={(e) => handleNestedChange('showInSales', 'price', e.target.value)}
                style={{ fontSize: '14px', width: '100px' }}
                step="0.001"
              />
              <Form.Check
                type="checkbox"
                label="Exclusive GST"
                checked={formData.showInSales.exclusiveGst}
                onChange={(e) => handleNestedChange('showInSales', 'exclusiveGst', e.target.checked)}
                style={{ fontSize: '14px' }}
              />
            </div>
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold" style={{ fontSize: '14px' }}>Status</Form.Label>
            <div className="d-flex gap-3">
              <Form.Check
                type="radio"
                label="Active"
                checked={formData.status === 'Active'}
                onChange={() => setFormData({ ...formData, status: 'Active' })}
                style={{ fontSize: '14px' }}
              />
              <Form.Check
                type="radio"
                label="Inactive"
                checked={formData.status === 'Inactive'}
                onChange={() => setFormData({ ...formData, status: 'Inactive' })}
                style={{ fontSize: '14px' }}
              />
            </div>
          </Form.Group>

          <div className="d-flex justify-content-between border-top pt-3">
            <Button variant="outline-secondary" size="sm" onClick={() => navigate('/item')} style={{ width: '100px' }} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave} style={{ width: '100px' }} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ItemForm;
