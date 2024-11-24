import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Tab, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AccountProfile.css";

const AccountProfile = () => {
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    ext: "",
    mobileNumber: "",
    username: "",
    twoFA: "Disable", // Default value for 2FA
    vacationMode: false,
  });

  // Load data from localStorage if available
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("accountProfile"));
    if (storedData) {
      setFormData(storedData);
    }
  }, []);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Store the form data in localStorage or send to backend
    localStorage.setItem("accountProfile", JSON.stringify(formData));
    alert("Changes saved successfully");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear session data
    navigate('/login'); // Redirect to login page
  };

  // Reset the form to initial state (loaded from localStorage)
  const handleReset = () => {
    const storedData = JSON.parse(localStorage.getItem("accountProfile"));
    if (storedData) {
      setFormData(storedData);
    }
  };

  // Cancel: Navigate to a previous page (optional)
  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      {/* Logout Button */}
      <Button variant="danger" className="logout-btn" onClick={handleLogout}>
        Log Out
      </Button>

      <div className="container-fluid mt-4">
        <h2 className="text-center mb-4">My Account Profile</h2>
        <Tab.Container defaultActiveKey="account">
          <Row>
            {/* Side Panel Navigation */}
            <Col md={3}>
              <Nav className="flex-column side-panel-tabs">
                <Nav.Item>
                  <Nav.Link eventKey="account">Account</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="preferences">Preferences</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signature">Signature</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            {/* Tab Content */}
            <Col md={9}>
              <Tab.Content className="tab-content">
                <Tab.Pane eventKey="account">
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={3}>
                        <div className="profile-image-placeholder bg-light border d-flex align-items-center justify-content-center mx-3 my-3">
                          <i className="bi bi-person-circle" style={{ fontSize: "5rem" }}></i>
                        </div>
                      </Col>
                      <Col md={9} className="text-start">
                        <Row className="mb-3">
                          <Col>
                            <Form.Group>
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <Form.Label>&nbsp;</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="email@example.com"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Row className="mb-3">
                          <Col>
                            <Form.Group>
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Phone Number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <Form.Label>Ext</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Extension"
                                name="ext"
                                value={formData.ext}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Form.Group className="mb-3">
                          <Form.Label>Mobile Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Mobile Number"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5 className="text-start my-4">Authentication</h5>
                    <Form.Group as={Row} className="mb-3" controlId="formBackend">
                      <Form.Label column sm="4" className="text-start">Backend</Form.Label>
                      <Col sm="8" className="d-flex align-items-center">
                        <Form.Label>Active Directory or LDAP</Form.Label>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formUsername">
                      <Form.Label column sm="4" className="text-start">
                        Username <span className="text-danger">*</span>
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          className="auth-control"
                          type="text"
                          placeholder="Username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          disabled
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="form2FA">
                      <Form.Label column sm="4" className="text-start">
                        Default 2FA:
                      </Form.Label>
                      <Col sm="8" className="d-flex align-items-center">
                        <Form.Select
                          className="auth-control"
                          name="twoFA"
                          value={formData.twoFA}
                          onChange={handleInputChange}
                        >
                          <option>Disable</option>
                          <option>Enable</option>
                        </Form.Select>

                        {/* Configuration Options Button with Settings Icon */}
                        <button className="btn btn-secondary-dfa d-flex align-items-center ms-3">
                          <i className="bi bi-gear me-2" style={{ fontSize: "1.2rem" }}></i>
                          Configure Options
                        </button>

                        {/* Question Mark Icon */}
                        <i className="bi bi-question-circle ms-2" style={{ fontSize: "1.5rem", cursor: "pointer" }}></i>
                      </Col>
                    </Form.Group>

                    {/* Status and Settings Section */}
                    <h5 className="text-start my-4">Status and Settings</h5>

                    <Form.Group className="mb-3" controlId="formVacationMode">
                      <Form.Check
                        type="checkbox"
                        label="Vacation Mode"
                        className="text-start"
                        name="vacationMode"
                        checked={formData.vacationMode}
                        onChange={handleCheckboxChange}
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-start gap-2 my-5">
                      <Button variant="primary" type="submit">Save Changes</Button>
                      <Button variant="secondary" onClick={handleReset}>Reset</Button>
                      <Button variant="danger" onClick={handleCancel}>Cancel</Button>
                    </div>
                  </Form>
                </Tab.Pane>

                <Tab.Pane eventKey="preferences">
                  <Form>
                    <p>Preferences content goes here...</p>
                  </Form>
                </Tab.Pane>

                <Tab.Pane eventKey="signature">
                  {/* Signature Form (Future Extension) */}
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Digital Signature</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your signature here"
                        name="signature"
                      />
                    </Form.Group>
                    <Button variant="primary">Save Signature</Button>
                  </Form>
                </Tab.Pane>

              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
};

export default AccountProfile;


