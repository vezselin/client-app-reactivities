import React from 'react'
import ReactDOM from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import './app/layout/styles.css'
import App from "./app/layout/App.tsx";
import {store, StoreContext} from "./app/stores/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <StoreContext.Provider value={store}>
          <App/>
      </StoreContext.Provider>


  </React.StrictMode>,
)
