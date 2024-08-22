import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

function Box() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [youtubeVideoId, setYoutubeVideoId] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [stars, setStars] = useState([]);
  const [title,setTitle] = useState("Title");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const extractYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|youtu.be\/|\/shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleYoutubeLinkChange = (event) => {
    const link = event.target.value;
    setYoutubeLink(link);

    const videoId = extractYouTubeVideoId(link);
    setYoutubeVideoId(videoId);
  };

  const handlePlayButtonClick = () => {
    setShowVideo(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newStar = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * 3 + 2,
        animationDuration: Math.random() * 3 + 2,
      };
      setStars((prevStars) => [...prevStars, newStar]);

      setTimeout(() => {
        setStars((prevStars) =>
          prevStars.filter((star) => star.id !== newStar.id)
        );
      }, newStar.animationDuration * 1000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bottom-0 bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `rise ${star.animationDuration}s linear forwards`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 bg-white h-96 w-96 overflow-hidden">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Uploaded Preview"
            className="absolute inset-0 object-cover w-full h-full"
          />
        )}
      </div>

      <div className="text-white mt-10 text-5xl">Title</div>
      <button className="text-white">Edit</button>
      <div className="my-7">
        <button
          onClick={() => document.getElementById("imageInput").click()}
          className="z-10 mt-4 neon-button"
        >
          Upload Image
        </button>

        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <input
          type="text"
          placeholder="Enter YouTube link"
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
          className="z-10 mt-4 neon-input"
        />

        {youtubeVideoId && !showVideo && (
          <button
            onClick={handlePlayButtonClick}
            className="z-10 mt-4 play-button"
          >
            Play
          </button>
        )}
      </div>

      {showVideo && youtubeVideoId && (
        <YouTube videoId={youtubeVideoId} className="z-10 mt-4" />
      )}

      <style jsx>{`
        @keyframes rise {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }

        .neon-button {
          color: #fff;
          border: 2px solid #9b5de5;
          padding: 0.5rem 1.5rem;
          font-size: 1rem;
          border-radius: 8px;
          background-color: #240046;
          text-shadow: 0 0 5px #9b5de5, 0 0 10px #9b5de5, 0 0 15px #9b5de5;
          box-shadow: 0 0 10px #9b5de5, 0 0 20px #9b5de5, 0 0 30px #9b5de5;
          transition: box-shadow 0.3s ease, text-shadow 0.3s ease;
        }

        .neon-button:hover {
          box-shadow: 0 0 20px #9b5de5, 0 0 40px #9b5de5, 0 0 60px #9b5de5;
          text-shadow: 0 0 10px #9b5de5, 0 0 20px #9b5de5, 0 0 30px #9b5de5;
        }

        .neon-input {
          padding: 0.5rem 1.5rem;
          font-size: 1rem;
          border-radius: 8px;
          border: 2px solid #9b5de5;
          background-color: #240046;
          color: #fff;
          margin-top: 1rem;
        }

        .play-button {
          color: #fff;
          border: 2px solid #f15bb5;
          padding: 0.5rem 1.5rem;
          font-size: 1rem;
          border-radius: 8px;
          background-color: #61045f;
          text-shadow: 0 0 5px #f15bb5, 0 0 10px #f15bb5, 0 0 15px #f15bb5;
          box-shadow: 0 0 10px #f15bb5, 0 0 20px #f15bb5, 0 0 30px #f15bb5;
          transition: box-shadow 0.3s ease, text-shadow 0.3s ease;
        }

        .play-button:hover {
          box-shadow: 0 0 20px #f15bb5, 0 0 40px #f15bb5, 0 0 60px #f15bb5;
          text-shadow: 0 0 10px #f15bb5, 0 0 20px #f15bb5, 0 0 30px #f15bb5;
        }
      `}</style>
    </div>
  );
}

export default Box;
