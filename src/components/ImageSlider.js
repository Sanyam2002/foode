import React from "react";

function ImageSlider(props) {
  return (
    <>
      <div className="sp-product-thumb">
        {props.images.map((image, index) => (
          <div key={index}>
            {index === 0 ? (
              <img
                style={{ width: "100%", maxHeight: "150px" }}
                src={`http://localhost:5000/${image}`}
                alt="ProductImage"
              />
            ) : (
              <span></span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ImageSlider;
