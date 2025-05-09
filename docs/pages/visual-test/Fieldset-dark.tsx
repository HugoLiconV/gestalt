import { Box, Checkbox, ColorSchemeProvider, DesignTokensProvider, Fieldset, Flex } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" padding={4}>
          <Fieldset id="fieldset-error-message" legend="What languages would you like to learn?">
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 2,
              }}
            >
              <Checkbox
                helperText="USA has the top number of English speakers "
                id="english-info"
                label="English"
                name="languages"
                onChange={() => {}}
              />
              <Checkbox
                helperText="Mexico is the top Spanish speaking country"
                id="spanish-info"
                label="Spanish"
                name="languages"
                onChange={() => {}}
              />
            </Flex>
          </Fieldset>
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
