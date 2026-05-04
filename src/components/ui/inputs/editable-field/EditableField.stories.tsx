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
        onEdit={() => setEditing(true)}
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

/**
 * Real consumer pattern: edit pencil flips into edit mode; the user
 * types; the parent form's unsaved-changes snackbar handles save and
 * calls fields.reset() on commit. The component itself never renders
 * a "save" button.
 */
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
            onEdit={() => fields.startEdit("name")}
            onChange={setName}
          />
          <EditableField
            id="slug"
            label="Slug"
            value={slug}
            editing={fields.isEditing("slug")}
            onEdit={() => fields.startEdit("slug")}
            onChange={setSlug}
            mono
          />
          <button
            type="button"
            className="text-xs text-on-surface-variant"
            onClick={fields.reset}
          >
            (simulated save → reset all)
          </button>
        </div>
      );
    }
    return <Demo />;
  },
};
