import Layout from "../../components/layouts/Page";
import Link from "next/link";

export default () => (
  <Layout meta={{ title: "Vert.x | Documentation" }}>
    <h2>Documentation</h2>
    <Link href="/docs/[...slug]" as="/docs/vertx-core/java/"><a>Java core</a></Link>
  </Layout>
);
