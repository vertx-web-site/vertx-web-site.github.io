import NProgress from "../components/NProgress"
import NavBarContext from "../components/contexts/NavBarContext"
import VersionContext from "../components/contexts/VersionContext"
import "lazysizes"
import "../css/main.scss"

const App = ({ Component, pageProps }) => (
  <>
    <NavBarContext.Provider>
      <VersionContext.Provider>
        <Component {...pageProps} />
      </VersionContext.Provider>
    </NavBarContext.Provider>
    <NProgress />
  </>
)

export default App
