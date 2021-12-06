import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

function renderPosts(posts) {
  return (
    <ul className="list">
      {posts &&
        posts.map(({ id, date, title }) => {
          return (
            <li className="list-item" key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className="light-text">
                <Date dateString={date} />
              </small>
            </li>
          );
        })}
    </ul>
  );
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="heading-lg">
        <p>
          I'm a pretty cool dude, suppose you could say. But don't take my word
          for it, poke around and play in my dirt pile.
        </p>
      </section>
      <section className="heading-md">
        <p>
          <Link href="/quotes">
            <a>Check out some of my favorite quotes</a>
          </Link>
        </p>
      </section>
      <section className="heading-md pt-1">
        <h2 className="heading-lg">Blog</h2>
        {renderPosts(allPostsData)}
      </section>
    </Layout>
  );
}
