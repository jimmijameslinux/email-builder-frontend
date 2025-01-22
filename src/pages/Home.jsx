import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Editor from '../components/Editor';
import ImageUploader from '../components/ImageUploader';
import EmailPreview from '../components/EmailPreview';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [layout, setLayout] = useState('');
    // const [imgurl, setImgurl] = useState('');

    const [data, setData] = useState({
        title: 'Title here',
        content: 'Content here',
        footer: 'Footer here',
        imageUrl: 'https://via.placeholder.com/150',
    });

    useEffect(() => {
        axios.get('https://email-builder-backend-7n9i.onrender.com/api/getEmailLayout')
            .then((response) => setLayout(response.data))
            .catch((error) => console.error('Error fetching layout:', error));
    }, []);

    const handleSave = (formData) => setData({ ...data, ...formData });

    // setImgurl(data.imageUrl);

    return (
        <div className="container">
            <h1 className="text-center mt-4">Email Builder</h1>
            <Editor onSave={handleSave} imageUrl={data.imageUrl} />
            <ImageUploader onUpload={(url) => setData({ ...data, imageUrl: url })} />
            <EmailPreview layout={layout} data={data} />
        </div>
    );
};

export default Home;
