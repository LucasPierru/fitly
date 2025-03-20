import EditMetadata from './edit-metadata/edit-metadata';

const PlanMetadata = ({
  name,
  description
}: {
  name: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center sm:items-end gap-2">
      <EditMetadata value={name} name="name" />
      <EditMetadata value={description} name="description" />
    </div>
  );
};

export default PlanMetadata;
