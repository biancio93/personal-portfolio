export default function Curriculum_Card_Esperienze(props) {
  return (
    <div key={props.id} className="curriculum-card card-esperienze">
      <div className="curriculum-card-body">
        <h4 className="curriculum-card-title">
        {props.title}
        </h4>
        <p className="subtitle-esperienze">
        {props.ente}
        </p>
        <p className="card-paragraph">
        {props.content}
        </p>
        <p className="curriculum-card-year-2">{props.year}</p>
      </div>
    </div>
  );
}
