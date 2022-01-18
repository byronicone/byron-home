import React from "react";
import type { QuoteType } from "../types/types";

const QuoteCard = ({ id, text, author }: QuoteType) => {
  return (
    <div className="quote-card">
      <h5>{text}</h5>-{author}
    </div>
  );
};
export default QuoteCard;
