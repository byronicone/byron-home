import React from "react";
import Layout from "../components/layout";
import Head from "next/head";
import QuoteCard from "../components/QuoteCard";
import quotes from "../data/sample-quotes.json";

const renderQuotes = () => {
  return (
    <section className="d-flex flex-wrap justify-content-center">
      {quotes.data.map(({ id, text, author }) => (
        <QuoteCard id={id} text={text} author={author} />
      ))}
    </section>
  );
};

const Quotes = () => {
  return (
    <Layout>
      <Head>
        <title>Cool Quotes</title>
      </Head>
      {renderQuotes()}
    </Layout>
  );
};

export default Quotes;
