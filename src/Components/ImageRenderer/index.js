import React, { useState, useRef } from "react";
import classnames from "classnames";
import { useIntersection } from "../IntersectionObserver";
import "./index.css";

const ImageRenderer = ({ url, thumb, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = () => {
    setIsLoaded(true);
  };
  return (
    <div
      className="image-container"
      ref={imgRef}
      alt="image"
      style={{
        paddingBottom: `${(height / width) * 100}%`,
        width: "100%",
      }}
    >
      {isInView && (
        <>
          <img
            className={classnames("image", {
              ["isLoaded"]: isLoaded,
            })}
            alt="image"
            src={url}
            onLoad={handleOnLoad}
          />
        </>
      )}
    </div>
  );
};

export default ImageRenderer;
