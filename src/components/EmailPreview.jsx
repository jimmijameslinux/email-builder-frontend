import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmailPreview = ({ layout, data }) => {
  const filledTemplate = layout.replace(
    /\{\{(.*?)\}\}/g,
    (_, key) => data[key.trim()] || ''
  );

  return (
    <div className="container mt-4">
      <h3>Email Preview</h3>
      <div
        className="border rounded p-4 bg-white shadow-sm"
        dangerouslySetInnerHTML={{ __html: filledTemplate }}
      />
    </div>
  );
};

export default EmailPreview;
