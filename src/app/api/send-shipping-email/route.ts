import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { shippingData, product } = await request.json();

    // Create transporter for Gmail with app password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'arvaradodotcom@gmail.com',
        pass: 'iwar xzav utnb bxyw',
      },
      secure: false,
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify connection configuration
    await transporter.verify();

    // Email content
    const emailContent = `
      <h2>New Order Shipping Information</h2>
      
      <h3>Product Details:</h3>
      <ul>
        <li><strong>Product:</strong> ${product.title}</li>
        <li><strong>Price:</strong> $${product.price}</li>
        <li><strong>Product URL:</strong> ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/products/${product.slug}</li>
      </ul>

      <h3>Shipping Address:</h3>
      <ul>
        <li><strong>Street Address:</strong> ${shippingData.streetAddress}</li>
        <li><strong>City:</strong> ${shippingData.city}</li>
        <li><strong>State/Province:</strong> ${shippingData.state}</li>
        <li><strong>Zip Code:</strong> ${shippingData.zipCode}</li>
        <li><strong>Email:</strong> ${shippingData.email}</li>
        <li><strong>Phone Number:</strong> ${shippingData.phoneNumber || 'Not provided'}</li>
      </ul>

      <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
    `;

    // Email options
    const mailOptions = {
      from: 'arvaradodotcom@gmail.com',
      to: 'mehdito2001@outlook.com',
      subject: `New Order - ${product.title}`,
      html: emailContent,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    const err = error as Error;
    return NextResponse.json(
      { error: 'Failed to send email', details: err.message },
      { status: 500 }
    );
  }
} 