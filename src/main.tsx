import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './components/api/store.ts'
import { Provider } from 'react-redux'
import AppWrapper from './components/App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>    
        <AppWrapper />
    </Provider>
  </StrictMode>,
)
