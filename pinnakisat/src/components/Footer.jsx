import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Footer() {
  return (
    <div>
      <div style={{ height: '50px' }}></div>
      <Card className="footer-card">
        <Card.Body>
          <Card.Text>
            Pinnakisapalvelu: Kasper, Mikko, Elli, Wil
          </Card.Text>
          <Button variant="dark">Tiestosuojaseloste</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Footer;