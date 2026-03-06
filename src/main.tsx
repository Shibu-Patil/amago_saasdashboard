import {createRoot} from "react-dom/client"
import App from "./App"
import { StrictMode } from "react"
import { Provider } from "react-redux"
import { store } from "./store/store"


const theme = localStorage.getItem("theme") || "light"

if (theme === "dark") {
  document.documentElement.classList.add("dark")
} else {
  document.documentElement.classList.remove("dark")
}


createRoot(document.getElementById("root")!).render(<StrictMode>
   <Provider store={store}>
     <App></App>
   </Provider>
</StrictMode>)