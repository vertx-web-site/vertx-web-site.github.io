import NProgress from "../components/NProgress"
import NavBarContext from "../components/contexts/NavBarContext"
import "../css/main.scss"

const App = ({ Component, pageProps }) => (
  <>
    <NavBarContext.Provider>
      <Component {...pageProps} />
    </NavBarContext.Provider>
    <NProgress />
  </>
)

export default App
