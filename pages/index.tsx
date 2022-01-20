import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import { PostData } from "../types/types";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

type Props = {
  allPostsData: PostData[];
};

function renderPosts(posts: PostData[]) {
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

export default function Home({ allPostsData }: Props) {
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
        <ul className="list">
          <li className="listItem" key="quotes">
            <Link href="/quotes">
              <a>Check out some of my favorite quotes</a>
            </Link>
          </li>
          <li className="listItem" key="photos">
            <Link href="/photos">
              <a>Photos I've taken or been awkwardly in</a>
            </Link>
          </li>
        </ul>
      </section>
      <section className="heading-md pt-1">
        <h2 className="heading-lg">Blog</h2>
        {renderPosts(allPostsData)}
      </section>
    </Layout>
  );
}
