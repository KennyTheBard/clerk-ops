import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import {
  AppShell,
  Group,
  MantineProvider,
  Title,
} from "@mantine/core";
import { theme } from "./theme";
import { ExploreOpsPage } from "./pages/explore/ExploreOps";
import { ReaderOpsPage } from "./pages/reader/ReaderOps";

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
    path: 'ops',
    children: [
      {
        path: "read",
        element: <ReaderOpsPage />,
      },
      {
        path: "explore",
        element: <ExploreOpsPage />,
      },
    ]
  }
]);

function App() {
  return (
    <MantineProvider theme={theme}>
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
