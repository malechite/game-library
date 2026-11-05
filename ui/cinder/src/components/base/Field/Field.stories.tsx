import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldSeparator,
  FieldContent
} from "./Field";
import { Input } from "../Input/Input";

const meta: Meta<typeof Field> = {
  title: "Cinder/Forms/Field",
  decorators: [centerStory],
  component: Field,
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"]
    }
  }
};
export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <FieldContent>
        <Input type="email" placeholder="you@example.com" />
        <FieldDescription>We will never share your email.</FieldDescription>
      </FieldContent>
    </Field>
  )
};

export const WithError: Story = {
  render: () => (
    <Field>
      <FieldLabel>Username</FieldLabel>
      <FieldContent>
        <Input placeholder="Enter username" />
        <FieldError>Username is required.</FieldError>
      </FieldContent>
    </Field>
  )
};

export const WithErrorList: Story = {
  render: () => (
    <Field>
      <FieldLabel>Password</FieldLabel>
      <FieldContent>
        <Input type="password" placeholder="Enter password" />
        <FieldError errors={[{ message: "Must be at least 8 characters" }, { message: "Must contain a number" }]} />
      </FieldContent>
    </Field>
  )
};

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal">
      <FieldLabel>Name</FieldLabel>
      <FieldContent>
        <Input placeholder="Your name" />
        <FieldDescription>Your full name as it appears on record.</FieldDescription>
      </FieldContent>
    </Field>
  )
};

export const GroupedFields: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Personal Information</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel>First Name</FieldLabel>
          <FieldContent>
            <Input placeholder="John" />
          </FieldContent>
        </Field>
        <FieldSeparator />
        <Field>
          <FieldLabel>Last Name</FieldLabel>
          <FieldContent>
            <Input placeholder="Doe" />
          </FieldContent>
        </Field>
        <FieldSeparator>or</FieldSeparator>
        <Field>
          <FieldLabel>Nickname</FieldLabel>
          <FieldContent>
            <Input placeholder="Johnny" />
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
};
