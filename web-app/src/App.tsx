import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import {
  AppShell,
  Group,
  MantineProvider,
  Title,
} from "@mantine/core";
import { LoaderPage } from "./pages/Loader";
import { theme } from "./theme";

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
    path: "loader",
    element: <LoaderPage />,
  },
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
