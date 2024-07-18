import NProgress from "../components/NProgress"
import NavBarContext from "../components/contexts/NavBarContext"
import VersionContext from "../components/contexts/VersionContext"
import "lazysizes"
import styles from "../css/main.scss?type=global"

const App = ({ Component, pageProps }) => (
  <>
    <NavBarContext.Provider>
      <VersionContext.Provider>
        <Component {...pageProps} />
      </VersionContext.Provider>
    </NavBarContext.Provider>
    <NProgress />
    <style jsx>{styles}</style>
  </>
)

export default App
