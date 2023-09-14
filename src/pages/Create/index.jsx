import { useForm } from 'react-hook-form';
import './style.css';
import { useState } from 'react';
import CardPost from '../../components/CardPost';
import { useNavigate } from 'react-router-dom';

import API from '../../services/API';

export default function Home() {
  const [preview, setPreview] = useState();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const savePost = async (data) => {
    await API.pushPost({
      ...data,
      tags: data.tags.split(' ').flat(),
    });

    navigate('/');
  };

  const handlerPreview = ({ target }) => {
    const name = target.name;
    const value = target.value;

    setPreview({ ...preview, [name]: value });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <form onSubmit={handleSubmit(savePost)} className="p-5">
              <div className="mb-3">
                <label htmlFor="" className="form-label fw-bold">
                  Título
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  {...register('title', {
                    required: 'El título es requerido.',
                    onChange: (e) => handlerPreview(e),
                  })}
                />
              </div>
              {errors.title && <span className="">{errors.title.message}</span>}
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: '100px' }}
                  {...register('content', {
                    required: 'El contenido es requerido.',
                    onChange: (e) => handlerPreview(e),
                  })}
                ></textarea>
                <label htmlFor="floatingTextarea2">Contenido</label>
              </div>
              {errors.content && (
                <span className="">{errors.content.message}</span>
              )}
              <div className="mb-3">
                <label htmlFor="" className="form-label fw-bold">
                  Imagen
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register('image', {
                    required: 'La imagen es requerida.',
                    pattern: {
                      value:
                        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
                      message: 'Debe ser una URL válida.',
                    },
                    onChange: (e) => handlerPreview(e),
                  })}
                />
              </div>
              {errors.image && <span className="">{errors.image.message}</span>}
              <div className="mb-3">
                <label htmlFor="" className="form-label fw-bold">
                  Autor
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register('author', {
                    required: 'El autor es requerido.',
                    onChange: (e) => handlerPreview(e),
                  })}
                />
              </div>
              {errors.author && (
                <span className="">{errors.author.message}</span>
              )}
              <div className="mb-3">
                <label htmlFor="" className="form-label fw-bold">
                  Tags
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register('tags', {
                    required: 'Los tags son requeridos.',
                    onChange: (e) => handlerPreview(e),
                  })}
                />
              </div>
              {errors.tags && <span className="">{errors.tags.message}</span>}

              <div className="text-end">
                <button type="submit" className="btn btn-dark btn-lg">
                  Publicar
                </button>
              </div>
            </form>
          </div>
          <div className="col-12 col-md-4 mb-5 mb-md-0 mt-md-5">
            {preview && <CardPost props={preview} />}
          </div>
        </div>
      </div>
    </>
  );
}
