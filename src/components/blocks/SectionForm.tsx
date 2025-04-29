import { Section, SectionSchema } from "@/db/models";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SectionForm({
  onSubmit,
  onCancel,
  section,
}: {
  onSubmit: (data: Section) => void;
  onCancel?: () => void;
  section?: Partial<Section>;
}) {
  const form = useForm<Section>({
    resolver: zodResolver(SectionSchema),
    defaultValues: {
      name: "",
      ...section,
    },
  });

  const handleSubmit = async (data: Section) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Task</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Enter the section title"
                  {...field}
                  autoFocus
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-4">
          <Button
            variant="secondary"
            onClick={onCancel}
            type="button"
            size="sm"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            size="sm"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
