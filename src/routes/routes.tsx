import { createBrowserRouter } from "react-router-dom"

import Layout from "../components/Layout"
import Dashboard from "../components/dashboard/Dashboard"
import Campaigns from "../components/campaigns/Campaigns"
import Jobs from "../components/jobs/Jobs"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        handle: {
          title: "Dashboard"
        }
      },
      {
        path: "campaigns",
        element: <Campaigns />,
        handle: {
          title: "Campaigns"
        }
      },
      {
        path: "jobs",
        element: <Jobs />,
        handle: {
          title: "Jobs"
        }
      }
    ]
  }
])

export default routes