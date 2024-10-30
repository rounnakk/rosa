import React from 'react';
import './renderCards.css'
import { CardDemo } from './CardDemo';
import { BackgroundGradientDemo } from '../unknown/BackgroundGradientDemo';

const truncateTitle = (title) => {
    if (title.length > 40) {
      return title.substring(0, 37) + '...';
    }
    return title;
  };

const Card = ({ item }) => {
  return (
    <div className="card">
      <a href={item.Link} target="_blank" rel="noopener noreferrer">
        <img src={item["Image URL"] !== "(No image link available)" ? item["Image URL"] : "default-image.jpg"} alt={item.Title} />
        <h3>{truncateTitle(item.Title)}</h3>
        {/* <p>{item.Description}</p> */}
        <p>Price: {item.Price}</p>
      </a>
    </div>
  );
};

const renderCards = (data) => {
  try {
    const json = JSON.parse(data);

    if (json.Type === "message") {
      return <p>{json.Message}</p>;
    } else if (json.Type === "products") {
      return (
        <div className="card-container">
          <BackgroundGradientDemo />
          {/* {json.Fields.map((item, index) => (
            // <Card key={index} item={item} />
            // <CardDemo />
          ))} */}
        </div>
      );
    } else {
      console.error("Unknown type received:", json.Type);
      return <p>Sorry, an unexpected error occurred. Please try again.</p>;
    }
  } catch (error) {
    console.error("Failed to parse JSON data:", error);
    return <p>Sorry, an unexpected error occurred. Please try again.</p>;
  }
};

export default renderCards;
