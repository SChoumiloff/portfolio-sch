import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface ContactFormEmailProps {
    email: string;
    subject: string;
    message: string;
  }
  
  export const ContactFormEmail = ({
    email,
    subject,
    message,
  }: ContactFormEmailProps) => (
    <Html>
      <Head />
      <Preview>Nouvelle demande de contact depuis votre portfolio</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nouveau message de contact</Heading>
          
          <Text style={text}>
            <strong>De :</strong> {email}
          </Text>
          
          <Text style={text}>
            <strong>Sujet :</strong> {subject}
          </Text>
          
          <Text style={text}>
            <strong>Message :</strong>
          </Text>
          
          <Text style={messageStyle}>
            {message}
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  const main = {
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '580px',
  };
  
  const h1 = {
    color: '#333',
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '1.3',
    margin: '0 0 24px',
  };
  
  const text = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '1.5',
    margin: '0 0 10px',
  };
  
  const messageStyle = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '1.5',
    margin: '0 0 40px',
    padding: '24px',
    backgroundColor: '#f4f4f4',
    borderRadius: '4px',
  };
  
  export default ContactFormEmail;