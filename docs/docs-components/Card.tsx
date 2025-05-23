import { ReactNode } from 'react';
import slugify from 'slugify';
import { Badge, Box, Flex, Heading, Tooltip } from 'gestalt';
import CopyLinkButton from './buttons/CopyLinkButton';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts';
import Markdown from './Markdown';

type Props = {
  children?: ReactNode;
  badge?: {
    text: string;
    tooltipText: string;
  };
  description?: string;
  headingSize?: '400' | '600';
  id?: string;
  name: string;
  toggle?: ReactNode;
  stacked?: boolean;
  showHeading?: boolean;
};

export const copyToClipboard = (hash: string): boolean => {
  if (!navigator.clipboard) {
    // Clipboard API not available
    return false;
  }
  const url = window.location;
  url.hash = hash;

  try {
    // @ts-expect-error - TS2345 - Argument of type 'Location' is not assignable to parameter of type 'string'.
    navigator.clipboard.writeText(url);
  } catch (err: any) {
    return false;
  }
  return true;
};

export default function Card({
  children,
  badge,
  description,
  headingSize = '600',
  id,
  name,
  toggle,
  stacked = false,
  showHeading = true,
}: Props) {
  const slugifiedId = id ?? slugify(name);

  return (
    <Box>
      {showHeading && (
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              scrollMarginTop: 90,
            },
          }}
          data-anchor
          id={slugifiedId}
          marginBottom={description ? 2 : 4}
        >
          <Flex
            alignItems="center"
            gap={{
              row: 2,
              column: 0,
            }}
          >
            <Heading size={headingSize}>{name}</Heading>
            {badge ? (
              <Tooltip inline text={badge.tooltipText}>
                <Badge position="middle" text={badge.text} />
              </Tooltip>
            ) : null}
            <CopyLinkButton
              name={name}
              onClick={() => {
                copyToClipboard(slugifiedId);
              }}
            />

            {toggle}
          </Flex>
        </Box>
      )}

      <Box direction={stacked ? 'column' : 'row'} display="flex" marginEnd={-2} marginStart={-2}>
        <Box color="default" column={12} paddingX={2}>
          {description && (
            <Box marginBottom={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
              <Markdown text={description} />
            </Box>
          )}
          {children}
        </Box>
      </Box>
    </Box>
  );
}
