import { type WorkTicket } from "@acme/db";

export const WorkTicketCard: React.FC<WorkTicket> = ({
  title,
  description,
  status,
}) => {
  return (
    <li>
      <a href="/card-design-woes">
        {/* <NextImage src="/path/to/image.png" alt="" /> */}
        <h2>{title}</h2>
        <p>{description}</p>
        <p>status: {status}</p>
        {/* <small>
          By <a href="/author/heydon">{author.}</a>
        </small> */}
      </a>
    </li>
  );
};
