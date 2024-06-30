import { Accordion, Button } from "@mantine/core";
import { Id } from "../../../db/entries";
import { useLiveQuery } from "dexie-react-hooks";
import { getAllRawSchemas } from "../../../db/repositories";

export type ExploreOpsNavbarProps = {
  selectedRawSchemaId: Id | undefined;
  selectSchemaId: (schemaId: Id) => void;
};

export const ExploreOpsNavbar = ({
  selectedRawSchemaId,
  selectSchemaId,
}: ExploreOpsNavbarProps) => {
  const rawSchemas = useLiveQuery(getAllRawSchemas, []);

  return (
    <Accordion transitionDuration={100} multiple={true}>
      <Accordion.Item key="raw" value={"raw"}>
        <Accordion.Control style={{ backgroundColor: "grey" }}>
          Raw
        </Accordion.Control>
        <Accordion.Panel>
          {rawSchemas?.map((schema) => {
            const isSelected = schema.id === selectedRawSchemaId;
            return (
              <Button
                variant={isSelected ? "light" : "subtle"}
                color={isSelected ? "blue" : "gray"}
                fullWidth
                onClick={() => selectSchemaId(schema.id)}
              >
                {schema.name}
              </Button>
            );
          })}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
