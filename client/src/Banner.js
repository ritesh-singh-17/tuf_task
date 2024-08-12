import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Banner = () => {
  const [bannerInfo, setBannerInfo] = useState({});
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const fetchBannerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/banner`);
        setBannerInfo(response.data);
        setCountdown(response.data.timer);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBannerDetails();
  }, []);

  useEffect(() => {
    if (!bannerInfo.visible || countdown <= 0) return;

    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdown, bannerInfo.visible]);

  if (!bannerInfo.visible || countdown <= 0) return null;

  return (
    <>

      <div className="banner">
        <h1>{bannerInfo.description}</h1>
        <img className='img-fluid' src={`http://localhost:5000/uploads/${bannerInfo.image}`} alt="Banner" />
        <a href={bannerInfo.link}>Learn more</a>
        <p>Banner will disappear in: {countdown}s</p>
      </div>
      {!bannerInfo && <button className='btn btn-primary' onClick={() => setCountdown(60)}>Click Here to Reset Timer</button>}
    </>
  );
};

export default Banner;
