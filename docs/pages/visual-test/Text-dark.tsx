import { Box, ColorSchemeProvider, DesignTokensProvider, Text } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock">
          <Box padding={1}>
            <Text size="100">Text size 100</Text>
          </Box>
          <Box padding={1}>
            <Text size="200">Text size 200</Text>
          </Box>
          <Box padding={1}>
            <Text size="300">Text size 300</Text>
          </Box>
          <Box padding={1}>
            <Text size="400">Text size 400</Text>
          </Box>
          <Box padding={1}>
            <Text size="500">Text size 500</Text>
          </Box>
          <Box padding={1}>
            <Text size="600">Text size 600</Text>
          </Box>
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
