import CreateButton from "@/components/CreateButton";

export default function CreateEventPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="mb-12">Create Post</h1>
      <CreateButton />
    </div>
  );
}
