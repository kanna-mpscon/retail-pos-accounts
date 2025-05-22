import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';

const ItemCategoryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    categoryName: '',
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
    console.log('Form data:', formData);
    navigate('/itemcategory');
  };

  return (
    <Offcanvas 
      show={true} 
      onHide={() => navigate('/itemcategory')} 
      placement="end"
      style={{ width: '400px' }}
    >
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title>New Category</Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body className="p-3">
        <Form>
          {/* Category Name */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Category*</Form.Label>
            <Form.Control 
              type="text" 
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              required
              placeholder="Category Name"
            />
          </Form.Group>

          {/* Remarks */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Remarks</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3}
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Remarks"
            />
          </Form.Group>

          <div className="d-flex justify-content-between border-top pt-3">
            <Button 
              variant="outline-secondary" 
              size="sm" 
              onClick={() => navigate('/dashboard/itemcategory')}
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

export default ItemCategoryForm;