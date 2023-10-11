export default function Curriculum_Card(props) {
  return (
    <div key={props.id} className="curriculum-card card-formazione">
      <div className="curriculum-card-body">
        <h4 className="curriculum-card-title">{props.title}</h4>
        <p>
          <span className="web-curriculum">{props.ente}</span>
        </p>
        <p className="card-paragraph">{props.content}</p>
      </div>
      <p className="curriculum-card-year">{props.year}</p>
    </div>
  );
}
