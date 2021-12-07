import React, { useState } from "react";
import Layout from "../components/layout";
import Head from "next/head";
import QuoteCard from "../components/QuoteCard";
import sampleQuotes from "../data/sample-quotes.json";

const renderQuotes = (quotes) => {
  return (
    <section className="d-flex flex-wrap justify-content-center">
      {quotes.map(({ id, text, author }) => (
        <QuoteCard id={id} text={text} author={author} />
      ))}
    </section>
  );
};

const defaultQuoteInputData = {
  quoteText: "",
  quoteAuthor: "",
};

const Quotes = () => {
  const [quoteInputData, setQuoteInputData] = useState(defaultQuoteInputData);
  const [quotes, setQuotes] = useState(sampleQuotes.data);

  //TODO use onEffect to get initial quotes from the database

  const handleFormChange = ({ target }) => {
    setQuoteInputData({ ...quoteInputData, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const failedValidations = Object.values(quoteInputData).filter(
      (v) => !v || v.length === 0
    );
    if (failedValidations.length > 0) return;

    const newQuote = {
      id: Date.now().toLocaleString(),
      text: quoteInputData.quoteText,
      author: quoteInputData.quoteAuthor,
    };

    //TODO store the quotes in the DB
    setQuotes([...quotes, newQuote]);

    setQuoteInputData(defaultQuoteInputData);
  };

  return (
    <Layout>
      <Head>
        <title>Cool Quotes</title>
      </Head>
      {renderQuotes(quotes)}
      <section className="form-box">
        <h5>Dispense some wisdom</h5>
        <form onSubmit={handleSubmit}>
          <textarea
            name="quoteText"
            value={quoteInputData.quoteText}
            onChange={handleFormChange}
            placeholder="enter a new quote here..."
          />
          <input
            name="quoteAuthor"
            value={quoteInputData.quoteAuthor}
            onChange={handleFormChange}
            placeholder="and the author here!"
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </Layout>
  );
};

export default Quotes;
