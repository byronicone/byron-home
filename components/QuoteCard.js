import React from "react";

const QuoteCard = ({ id, text, author }) => {
  return (
    <div key={id} className="quote-card">
      <h5>{text}</h5>-{author}
    </div>
  );
};
export default QuoteCard;
