import moment from 'moment';

export default function Comment({ props }) {
  const { image, body, author, date } = props;

  const dateCurr =
    moment().diff(moment(date), 'minutes') < 60
      ? `${moment().diff(moment(date), 'minutes')} mins`
      : moment().diff(moment(date), 'hours') < 24
      ? `${moment().diff(moment(date), 'hours')} hours`
      : `${moment().diff(moment(date), 'days')} days`;

  return (
    <div
      className="card border-dark mb-3"
      style={{ background: 'transparent' }}
    >
      <div className="card-body">
        <div className="d-flex align-items-center gap-3 mb-2">
          <img
            src={image}
            className="rounded-circle"
            style={{ maxWidth: '40px', maxHeight: '40px' }}
          />
          <h5 className="card-title fw-bold">{author}</h5>
        </div>
        <p className="card-text">{body}</p>
        <p className="card-text">
          <small className="text-body-secondary">{`Last updated ${dateCurr} ago`}</small>
        </p>
      </div>
    </div>
  );
}
