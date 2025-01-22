import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageUploader.css'; // Custom CSS file

const ImageUploader = ({ onUpload }) => {
    const [imagePreview, setImagePreview] = useState(null);

    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        setImagePreview(URL.createObjectURL(file)); // Show local preview

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('https://email-builder-backend-7n9i.onrender.com/api/uploadImage', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.imageUrl) {
                onUpload(data.imageUrl); // Send image URL to the parent
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="container mt-4">
            <div
                {...getRootProps()}
                className={`dropzone border p-4 text-center ${isDragActive ? 'dropzone-active' : 'bg-light'
                    }`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-success">Drop the files here...</p>
                ) : (
                    <p className="text-muted">Drag and drop an image, or click to select files</p>
                )}
            </div>

            {imagePreview && (
                <div className="mt-3">
                    <h5>Image Preview:</h5>
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{ maxWidth: '300px', height: 'auto' }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
