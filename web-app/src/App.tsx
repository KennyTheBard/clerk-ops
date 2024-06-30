import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AppShell,
  Avatar,
  Button,
  Group,
  MantineProvider,
  Title,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "./theme";
import { Home, opsRoutes } from "./pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "ops",
    children: Object.entries(opsRoutes).map(([path, element]) => ({
      path,
      element,
    })),
  },
]);

function App() {
  // TODO: move app shell inside router
  return (
    <MantineProvider theme={theme}>
      <Notifications autoClose={5000} />
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Button variant="subtle" radius="lg" color="black">
              <Title order={1} onClick={() => router.navigate("/")}>
                Clerk Ops
              </Title>
            </Button>

            {/* TODO: add user context menu */}
            <Avatar src={null} alt="no image" />
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
