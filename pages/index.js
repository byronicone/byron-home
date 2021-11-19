import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";

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
    <ul className={utilStyles.list}>
      {posts &&
        posts.map(({ id, date, title }) => {
          return (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
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
      <section className={utilStyles.headingLg}>
        <p>
          I'm a pretty cool dude, suppose you could say. But don't take my word
          for it, poke around and play in my dirt pile.
        </p>
      </section>
      <section className={utilStyles.headingMd}>
        <p>
          "The most regretful people on earth are those who felt the call to
          creative work, who felt their own creative power restive and uprising,
          and gave to it neither power nor time.”
          <br />
          -Mary Oliver
        </p>
        <p>
          "A person’s life purpose is nothing more than to rediscover, through
          the detours of art, or love, or passionate work, those one or two
          images in the presence of which his heart first opened."
          <br />
          -Albert Camus
        </p>
        <p>
          “The first draft of anything is shit.”
          <br />
          -Ernest Hemingway
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        {renderPosts(allPostsData)}
      </section>
    </Layout>
  );
}
