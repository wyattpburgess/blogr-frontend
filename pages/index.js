import Head from "next/head";
import Link from "next/link";
import Button from "@mui/material/Button";

import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.scss";
import { getPostsData } from "../lib/posts";

export const getStaticProps = async () => {
  const allPostsData = await getPostsData();
  if (!allPostsData) {
    return {
      props: {
        posts: [],
      },
    };
  }

  return {
    props: {
      posts: allPostsData,
    },
  };
};

const Home = ({ posts }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta charSet="utf-8" />
      </Head>
      <div className={utilStyles.headingMd}>
        <p>Hello, I'm Wyatt. Welcome to my blog that I created with Next.JS!</p>
      </div>
      <div>
        <Link href={`/create-post`}>
          <Button variant="outlined">Create New Post</Button>
        </Link>
      </div>
      <div className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ _id, title, updatedAt }) => (
            <li className={utilStyles.listItem} key={_id}>
              <Link href={`/posts/${_id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={updatedAt} />
              </small>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
