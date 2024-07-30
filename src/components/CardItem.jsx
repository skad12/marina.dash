const CardItem = ({ title, value, ...props }) => (
  <div className="card-item flex justify-between align-center">
    <span className="f600">{title}</span>
    <span {...props}>{value}</span>
  </div>
);

export default CardItem;
