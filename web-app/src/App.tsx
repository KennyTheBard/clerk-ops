import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { AppShell, Group, MantineProvider, Title } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "./theme";
import { ExploreOpsPage } from "./pages/explore/ExploreOps";
import { ReaderOpsPage } from "./pages/reader/ReaderOps";
import { ProcessOpsPage } from "./pages/process/ProcessOps";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="loader">Loader</Link>
      </div>
    ),
  },
  {
    path: "ops",
    children: [
      {
        path: "read",
        element: <ReaderOpsPage />,
      },
      {
        path: "explore",
        element: <ExploreOpsPage />,
      },
      {
        path: "process",
        element: <ProcessOpsPage />,
      },
    ],
  },
]);

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications autoClose={5000} />
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <Group h="100%" px="md">
            <Title order={1}>Clerk Ops</Title>
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          <RouterProvider router={router} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
