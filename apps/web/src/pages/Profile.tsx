import { VStack, HStack, Caption, Span } from "@game-library/armature";
import { vars } from "@game-library/cinder/theme";
import { useCurrentUser } from "@game-library/sdk";
import { PageHeader } from "../components/PageHeader";

interface RowProps {
  label: string;
  value?: string;
}

const Row = ({ label, value }: RowProps) => (
  <HStack gap={2} padding={0} style={{ alignItems: "baseline" }}>
    <Caption stay style={{ color: vars.color.mutedForeground, width: 64 }}>
      {label}
    </Caption>
    <Span bold>{value}</Span>
  </HStack>
);

export const Profile = () => {
  const { data: user } = useCurrentUser();

  return (
    <VStack padding={6} gap={5} full>
      <PageHeader title="Profile" icon="User" />
      <VStack gap={2} padding={0}>
        <Row label="Name" value={user?.name} />
        <Row label="Email" value={user?.email} />
        <Row label="Role" value={user?.isSuperAdmin ? "Super admin" : "Member"} />
      </VStack>
    </VStack>
  );
};
