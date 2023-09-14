import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './style.css';

import API from '../../services/API';

import { useEffect, useState } from 'react';
import Comment from '../../components/Comment';

export default function Detail() {
  const [post, setPost] = useState();
  const { id } = useParams();

  const [allComments, setAllComments] = useState([]);

  const [update, setUpdate] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    const getPost = async () => {
      const data = await API.getUniquePost(id);

      setPost(data);
    };

    getPost();
  }, []);

  useEffect(() => {
    const getAllComments = async () => {
      const data = await API.getComments();

      if (data) {
        setAllComments(
          Object.keys(data)
            .reduce((accum, key) => {
              const currobj = data[key];

              currobj['id'] = key;

              return [...accum, currobj];
            }, [])
            .reverse()
        );
      }
    };

    getAllComments();
  }, [update]);

  const arrayTags = post?.tags
    .map((tag) => (tag.length > 0 ? `#${tag.toLowerCase()}` : ''))
    .join(' ');

  const commentHandler = async (data) => {
    await API.pushComment(data, id);
    setUpdate(!update);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2 p-3 px-md-0 pt-2"></div>
        <div className="col-12 col-md-8">
          <img src={post?.image} className="rounded" />
          <h1 className="my-3 fw-bold d-flex flex-column gap-3 flex-md-row justify-content-between">
            {post?.title}
            <small className="text-body-secondary">{post?.author}</small>
          </h1>
          <h5 className="my-3">{arrayTags}</h5>
          <p>{post?.content}</p>
          <hr className="mt-5 border border-dark border-1 opacity-75" />
          <aside>
            <h4 className="fw-bold p-3">
              Comentarios (
              {allComments?.filter((comment) => comment.idPost === id).length})
            </h4>
            <div
              className="card border-dark mb-3"
              style={{ background: 'transparent' }}
            >
              <form
                onSubmit={handleSubmit(commentHandler)}
                className="card-body"
              >
                <label htmlFor="" className="form-label">
                  Añadir comentario
                </label>
                <input
                  type="text"
                  className="w-100 form-control border-3"
                  style={{ height: '80px', background: 'transparent' }}
                  name="body"
                  {...register('body', {
                    required: 'El contenido es requerido.',
                  })}
                />
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <div className="w-50 d-flex flex-column mt-3 flex-md-row mt-md-0 gap-3">
                    <input
                      type="text"
                      className="form-control border-3"
                      placeholder="Author"
                      name="author"
                      style={{ background: 'transparent' }}
                      {...register('author', {
                        required: 'El autor es requerido.',
                      })}
                    />
                    <input
                      type="text"
                      className="form-control border-3"
                      name="image"
                      placeholder="Image Author"
                      style={{ background: 'transparent' }}
                      {...register('image', {
                        required: 'La imagen es requerida.',
                      })}
                    />
                  </div>
                  <div className="p-3">
                    <button type="submit" className="btn btn-dark btn-lg">
                      Comentar
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="p-3">
              {allComments &&
                allComments.map(
                  (comment) =>
                    comment.idPost === id && (
                      <Comment key={comment.id} props={comment} />
                    )
                )}
            </div>
          </aside>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}
