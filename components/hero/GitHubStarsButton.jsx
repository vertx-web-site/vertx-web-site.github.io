import classNames from "classnames";
import Button from "../Button";
import Head from "next/head";
import { GitHub } from "react-feather";
import useSWR from "swr";
import { useState } from "react";
import fetch from "isomorphic-unfetch";
import "./GitHubStarsButton.scss";

const url = "https://api.github.com/repos/eclipse-vertx/vert.x";

export default () => {
  const [visible, setVisible] = useState(false);
  const fetcher = url => fetch(url).then(r => {
    setTimeout(() => setVisible(true), 0);
    return r.json();
  })
  const { data, error } = useSWR(url, fetcher);

  return (
    <React.Fragment>
      <Head>
        <link rel="preload" href={url} as="fetch" crossOrigin="anonymous" />
      </Head>
      <div className={classNames("github-stars-button", { visible })}>
        <a href="https://github.com/eclipse-vertx/vert.x"><Button>
          <GitHub className="feather" /> {data && Math.floor(data.stargazers_count / 1000) + "K+ stars"}
        </Button></a>
      </div>
    </React.Fragment>
  );
};
