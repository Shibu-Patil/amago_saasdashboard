import { RouterProvider } from "react-router-dom"
import routes from "./routes/routes"
import "./styles/style.css"
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
       <>
          <Toaster></Toaster>
         <RouterProvider  router={routes}></RouterProvider>
       </>
  )
}

export default App