const Card = ({ title, value }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "16px" }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default Card;
