type DescriptionCardProps = {
  title: string;
  description: string;
};

const DescriptionCard = ({ title, description }: DescriptionCardProps) => {
  return (
    <div className="card border-2 border-secondary flex-1">
      <div className="card-body">
        <span className="text-lg">{title}</span>
        <span className="text-xl font-semibold">{description}</span>
      </div>
    </div>
  );
};

export default DescriptionCard;
