import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(60);
  const [link, setLink] = useState('');
  const [visible, setVisible] = useState(true);
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const navigate = useNavigate()
  const token = Cookies.get('tuf_token');

  useEffect(() => {

    if (!token) {
      alert('You are not allowed to access this page')
      navigate('/');
      return;
    }
    const fetchBannerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/banner`);
        setDescription(response.data.description);
        setTimer(response.data.timer);
        setLink(response.data.link);
        setVisible(response.data.visible);
        setImage(response.data.image);
        setPreviewImage(`http://localhost:5000/uploads/${response.data.image}`);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBannerDetails();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('timer', timer);
    formData.append('link', link);
    formData.append('visible', visible ? 1 : 0);
    formData.append('bannerImage', image);

    try {
      await axios.post('http://localhost:5000/api/banner/updateBanner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Banner updated successfully!');
    } catch (e) {
      console.log(e);
      alert('Failed to update banner.');
    }
  };

  return (
    <>

      {token && <div className="dashboard-container">
        <div className="dashboard-form">
          <h2>Banner Settings</h2>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Banner Image</label>
          <input
            type="file"
            onChange={handleImageChange}
          />
          {previewImage && <img src={previewImage} className='img-fluid my-3' alt="Banner Preview" />}
          <label>Timer (seconds)</label>
          <input
            type="number"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
          />
          <label>Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <label>Visible</label>
          <input
            type="checkbox"
            checked={visible}
            onChange={() => setVisible(!visible)}
          />
          <button onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>}
    </>
  );
};

export default Dashboard;
