import { Stack, Title } from "@mantine/core";
import { ExploreOpsPage } from "../explore/ExploreOps";
import { ProcessOpsPage } from "../process/ProcessOps";
import { ReadOpsPage } from "../read/ReadOps";
import { Link } from "react-router-dom";

export const opsRoutes = {
  read: <ReadOpsPage />,
  explore: <ExploreOpsPage />,
  process: <ProcessOpsPage />,
};

export const Home = () => {
  return (
    <Stack w={1200}>
      <Title order={3}>Ops</Title>
      {Object.keys(opsRoutes).map((path) => (
        <Link key={path} to={`/ops/${path}`}>{path}</Link>
      ))}
    </Stack>
  );
};
