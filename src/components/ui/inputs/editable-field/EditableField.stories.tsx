import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { EditableField } from "./EditableField";
import { useEditableFields } from "./use-editable-fields";

const meta: Meta<typeof EditableField> = {
  title: "UI/Inputs/EditableField",
  component: EditableField,
};

export default meta;
type Story = StoryObj<typeof EditableField>;

function ControlledStory({
  initialValue,
  initialEditing = false,
  initialError,
}: {
  initialValue: string;
  initialEditing?: boolean;
  initialError?: string;
}) {
  const [value, setValue] = useState(initialValue);
  const [editing, setEditing] = useState(initialEditing);
  return (
    <div className="max-w-sm">
      <EditableField
        id="name"
        label="Module name"
        value={value}
        editing={editing}
        onEditToggle={() => setEditing((e) => !e)}
        onChange={setValue}
        error={initialError}
      />
    </div>
  );
}

export const ReadMode: Story = {
  render: () => <ControlledStory initialValue="Analytics" />,
};

export const EditMode: Story = {
  render: () => <ControlledStory initialValue="Analytics" initialEditing />,
};

export const Empty: Story = {
  render: () => <ControlledStory initialValue="" />,
};

export const WithError: Story = {
  render: () => (
    <ControlledStory
      initialValue=""
      initialEditing
      initialError="Module name is required."
    />
  ),
};

export const MultipleFields: Story = {
  render: () => {
    function Demo() {
      const fields = useEditableFields();
      const [name, setName] = useState("Analytics");
      const [slug, setSlug] = useState("analytics");
      return (
        <div className="space-y-4 max-w-sm">
          <EditableField
            id="name"
            label="Module name"
            value={name}
            editing={fields.isEditing("name")}
            onEditToggle={() => fields.toggleEdit("name")}
            onChange={setName}
          />
          <EditableField
            id="slug"
            label="Slug"
            value={slug}
            editing={fields.isEditing("slug")}
            onEditToggle={() => fields.toggleEdit("slug")}
            onChange={setSlug}
            mono
          />
        </div>
      );
    }
    return <Demo />;
  },
};
