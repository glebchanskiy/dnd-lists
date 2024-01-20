import { render } from "preact"
import { LocationProvider, Router, Route, ErrorBoundary } from "preact-iso"

import "@components/dndstyles.css"
import { Home } from "@pages/Home/index.js"
import "./tailwind.css"
import { Header } from "@pages/Header/index.js"
import { DnDCharacterStatsSheetPage } from "@pages/DnDCharacterStatsSheetPage/index.js"
import { DnDCharacterProfileSheetPage } from "@pages/DnDCharacterProfileSheetPage/index.js"
import { DnDCharacterSpellSheetPagePage } from "@pages/DnDCharacterSpellSheetPage/index.js"
import { Provider } from "react-redux"
import { store } from "@redux/store.js"

export function App() {

  return (
    <LocationProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <Header />
          <Router>
            <Route path="/" component={Home} />
            <Route path="/stats" component={DnDCharacterStatsSheetPage} />
            <Route path="/profile" component={DnDCharacterProfileSheetPage} />
            <Route path="/spell" component={DnDCharacterSpellSheetPagePage} />
          </Router>
        </ErrorBoundary>
      </Provider>
    </LocationProvider>
  )
}



render(<App />, document.getElementById("app"))
