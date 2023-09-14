import { Link } from 'react-router-dom';

export default function CardPost({ props, preview }) {
  const { title, content, image, author, tags } = props;

  const arrayTags = preview
    ? tags.reduce((accum, curr) => (accum += ` #${curr}`), '')
    : tags
        ?.split(' ')
        .map((tag) => (tag.length > 0 ? ` #${tag.toLowerCase()}` : ''));

  const newContent =
    content?.length > 49 ? `${content.slice(0, 50)}...` : content;

  return (
    <>
      <div className="card shadow-sm bg-body-tertiary rounded">
        <img src={image} className="card-img-top" />
        <div className="card-body">
          <h4 className="card-title fw-bold">{title}</h4>
          <small className="text-body-secondary">{author}</small>
          <h6 className="my-3 fst-italic">{arrayTags}</h6>
          <p className="card-text">{newContent}</p>
        </div>
        {preview && (
          <div className="px-3 pb-3 text-end">
            <Link to={`detail/${preview}`}>
              <button className="btn btn-lg btn-dark">Ver</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
