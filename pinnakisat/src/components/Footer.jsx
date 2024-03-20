import React from 'react';
import Card from 'react-bootstrap/Card';

function Footer() {
  return (
    <div>
      {/* <div style={{ height: '50px',  bottom: '0', marginTop: 'auto' }}> */}
      <div className="footer-container">
        <Card className="footer-card">
          <Card.Body>
            <Card.Text>

              <p> Pinnakisapalvelu</p>
              <p> Kasper, Mikko, Elli, Wil</p>

            </Card.Text>
            
          </Card.Body>
        </Card>
      </div>
    </div>

  )
}

export default Footer;