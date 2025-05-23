import { AvatarGroup, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <AvatarGroup
        accessibilityLabel="Visit group activity board."
        collaborators={[
          {
            name: 'Fatima',
            src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
          },
          {
            name: 'Sora',
            src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
          },
          {
            name: 'Ayesha',
            src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
          },
        ]}
        href="#Role"
        onClick={() => {}}
        role="link"
        size="md"
      />
    </Flex>
  );
}
