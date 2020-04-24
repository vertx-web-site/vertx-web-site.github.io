import NProgress from "../components/NProgress"
import "../css/main.scss"

export default ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
    <NProgress />
  </>
)
