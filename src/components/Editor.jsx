import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Editor = ({ onSave, imageUrl }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [footer, setFooter] = useState('');

    const saveHandler = async () => {
        const templateData = { title, content, footer, imageUrl };
        try {
            // Send template data to the backend
            const response = await axios.post('https://email-builder-backend-7n9i.onrender.com/api/uploadEmailConfig', templateData);
            console.log('Template saved:', response.data.message);

            // Pass the updated data to the parent component
            onSave(templateData);
            // ui alert
            alert('Template saved in the database and output.html in the backend');
        } catch (error) {
            console.error('Error saving template:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h3>Email Editor</h3>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <textarea
                            id="content"
                            className="form-control"
                            rows="5"
                            value={content}
                            required
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="footer" className="form-label">Footer</label>
                        <input
                            type="text"
                            id="footer"
                            className="form-control"
                            value={footer}
                            onChange={(e) => setFooter(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn btn-success" onClick={saveHandler}>
                        Save Template
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Editor;
