"use client";

import html2canvas from 'html2canvas';
import { createClient } from "@/utils/supabase/client";

export interface InvoiceData {
  customerName: string;
  mobileNumber: string;
  amount: number;
  paymentMode: "cash" | "upi";
  planDuration: string;
  validFrom: string;
  validUntil: string;
  invoiceNumber: string;
}

const generateInvoiceNumber = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `INV-${timestamp}-${random}`;
};

export const generateInvoiceHTML = (data: InvoiceData) => {
  const invoiceHTML = `
  <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
    <div id="invoice" style="width: 800px; padding: 40px; font-family: Arial, sans-serif; border: 2px solid black;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1a56db; margin: 0;">SR Fitness</h1>
        <p style="color: #4b5563; margin: 5px 0;">Fitness Center Invoice</p>
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
        <div>
          <h3 style="color: #1f2937; margin-bottom: 10px;">Bill To:</h3>
          <p style="margin: 5px 0;">${data.customerName}</p>
          <p style="margin: 5px 0;">Mobile: ${data.mobileNumber}</p>
        </div>
        <div>
          <p style="margin: 5px 0;">Invoice #: ${data.invoiceNumber}</p>
          <p style="margin: 5px 0;">Date: ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Description</th>
            <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
              Gym Membership - ${data.planDuration} Month<br>
              <small style="color: #6b7280;">Valid from: ${data.validFrom} to ${data.validUntil}</small>
            </td>
            <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">₹${data.amount}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td style="padding: 12px; text-align: right; font-weight: bold;">Total:</td>
            <td style="padding: 12px; text-align: right; font-weight: bold;">₹${data.amount}</td>
          </tr>
        </tfoot>
      </table>
      
      <div style="margin-bottom: 30px;">
        <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${data.paymentMode.toUpperCase()}</p>
      </div>
      
      <div style="text-align: center; color: #6b7280; font-size: 14px;">
        <p>Thank you for choosing SR Fitness!</p>
        <p>For any queries, please contact us at your convenience.</p>
      </div>
    </div>
    </div>
  `;

  return invoiceHTML;
};

export const generateAndUploadInvoice = async (
  data: InvoiceData
): Promise<string> => {
  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabase = createClient();
  
  try {
    // Create a temporary container for the invoice
    const container = document.createElement('div');
    container.innerHTML = generateInvoiceHTML(data);
    document.body.appendChild(container);

    // Wait for the content to be fully rendered
    await new Promise(resolve => setTimeout(resolve, 100));

    // Generate canvas from HTML
    const canvas = await html2canvas(container, {
      scale: 1,
      logging: true,
      useCORS: true,
      allowTaint: true
    });

    document.body.removeChild(container);

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', 0.8);
    });

    // Create file from blob
    const file = new File([blob], `invoice-${data.invoiceNumber}.jpeg`, {
      type: 'image/jpeg'
    });

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gymweb/invoices')
      .upload(`${data.customerName}/${file.name}`, file);

    if (uploadError) {
      console.error('Error uploading invoice:', uploadError);
      throw new Error(`Error uploading invoice: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData} = supabase.storage
      .from('gymweb/invoices')
      .getPublicUrl(`${data.customerName}/${file.name}`);

    if (!urlData) {
      console.error('Error getting public URL:');
      throw new Error(`Error getting public URL`);
    }

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw error;
  }
};

export default generateAndUploadInvoice;

