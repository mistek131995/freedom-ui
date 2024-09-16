import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ToastProvider} from "../lib/main.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <App />
  </ToastProvider>,
)
