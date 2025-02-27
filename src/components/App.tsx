import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useGetBaseDataQuery } from "./api/api";
import { Comment } from "./interface";
import BaseInfo from "./BaseInfo";
import { Spin } from "antd";

const App = () => {
  const { data, error, isLoading } = useGetBaseDataQuery();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [category, setCategory] = useState<string>("АКБ");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, category }]);
      setNewComment("");
    }
  };

  const filteredStations = data?.data.filter(station =>
    station.BS_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (isLoading) {
    return <div className="center"><Spin/></div>;
  }

  if (error) {
    const errorMessage = (error as any).message || "Произошла ошибка";
    return <div className="center red">Error: {errorMessage}</div>;
  }

  return (
    <Router>
      <div style={{ display: "flex", width: "100%", height: "100vh", flexDirection: 'row' }}>
      <aside
          style={{
            width: "200px",
            borderRight: "1px solid #ccc",
            padding: "10px",
            overflowY: "auto",
          }}
        >
          <h3>Список базовых станций</h3>
          <input
            type="text"
            placeholder="Поиск по станции..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "5px",
              marginBottom: "10px",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "600",
            }}
          >
            <div>Станция</div>
            <div>W4</div>
            <div>W_year</div>
          </div>
          {filteredStations?.map((station) => (
            <Link
              to={`/base/${station.BS_NAME}`}
              key={station.BS_NAME}
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
                margin: "5px 0",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div>{station.BS_NAME}</div>
              <div>{station.CA_4w} %</div>
              <div>{station.CA_52w} %</div>
            </Link>
          ))}
        </aside>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, padding: "10px" }}>
            <Routes>
              <Route path="/base/:name" element={<BaseInfo />} /> {/* Добавляем маршрут для BaseInfo */}
              <Route
                path="/"
                element={<h2>Выберите базовую станцию</h2>}
              />
            </Routes>
          </div>
          
        </div>
        <div className="comments" style={{ padding: "10px" }}>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Введите комментарий"
                required
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="АКБ">АКБ</option>
                <option value="ТС">ТС</option>
                <option value="Прочее">Прочее</option>
              </select>
              <button type="submit">Добавить комментарий</button>
            </form>
            <h3>Комментарии</h3>
            <ul>
              {comments.map((comment: Comment, index: number) => (
                <li key={index}>
                  [{comment.category}] {comment.text}
                </li>
              ))}
            </ul>
          </div>
      </div>
    </Router>
  );
};

export default App;
