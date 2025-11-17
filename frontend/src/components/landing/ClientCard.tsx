import '../../styles.css';

export interface Client {
  _id: string;
  clientName: string;
  clientDesignation: string;
  clientDescription: string;
  clientImage: string;
}

interface ClientCardProps {
  client: Client;
}

const ClientCard = ({ client }: ClientCardProps) => {
  return (
    <article className="client-card">
      <div className="client-avatar-wrapper">
        <img src={client.clientImage} alt={client.clientName} className="client-avatar" />
      </div>
      <p className="client-text">{client.clientDescription}</p>
      <h3 className="client-name">{client.clientName}</h3>
      <p className="client-role">{client.clientDesignation}</p>
    </article>
  );
};

export default ClientCard;
