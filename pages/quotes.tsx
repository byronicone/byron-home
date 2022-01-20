import React, { DOMElement, useEffect, useState } from "react";
import Layout from "../components/layout";
import Head from "next/head";
import QuoteCard from "../components/QuoteCard";
import { ref, push, onValue, off, DataSnapshot } from "firebase/database";
import type { QuoteType } from "../types/types";
import { db } from "../data/firebase";

const defaultQuoteInputData = {
  quoteText: "",
  quoteAuthor: "",
};

const Quotes = () => {
  const [quoteInputData, setQuoteInputData] = useState(defaultQuoteInputData);
  const [quotes, setQuotes] = useState<any[]>([]);

  //TODO use onEffect to get initial quotes from the database
  useEffect(() => {
    const quotesRef = ref(db, "quotes");
    onValue(quotesRef, (snapshot) => {
      const quoteArr = getQuotesFromQuery(snapshot.val());
      setQuotes(quoteArr);
    });
    return () => {
      off(quotesRef);
    };
  }, []);

  const getQuotesFromQuery = (quoteList: any) => {
    return Object.keys(quoteList).map((key) => {
      return { id: key, ...quoteList[key] };
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setQuoteInputData({ ...quoteInputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const failedValidations = Object.values(quoteInputData).filter(
      (v) => !v || v.length === 0
    );

    //TODO return validation error to the UI
    if (failedValidations.length > 0) return;

    const newQuote = {
      text: quoteInputData.quoteText,
      author: quoteInputData.quoteAuthor,
    };

    //TODO store the quotes in the DB
    try {
      const quoteListRef = ref(db, "quotes");

      let quoteId = await push(quoteListRef, newQuote);
      setQuotes([...quotes, newQuote]);
      setQuoteInputData(defaultQuoteInputData);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  const renderQuotes = (quotes: QuoteType[]) => {
    return (
      <section className="grid">
        {quotes.map(({ id, text, author }: QuoteType) => (
          <QuoteCard key={id} id={id} text={text} author={author} />
        ))}
      </section>
    );
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
