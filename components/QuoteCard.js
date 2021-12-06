import React from "react";

const QuoteCard = ({ id, text, author }) => {
  return (
    <div key={id} className="border-card width-350 mt-2 ml-2 padded">
      <h5>{text}</h5>-{author}
    </div>
  );
};
export default QuoteCard;
