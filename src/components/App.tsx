import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";
import { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes, useParams } from "react-router-dom";
import { useGetBaseDataQuery } from "./api/api";
import BaseInfo from "./BaseInfo";
import { Comment } from "./interface";
import { ThemeProvider, useTheme } from './ThemeContext'; 

const App = () => {
  const { data, error, isLoading } = useGetBaseDataQuery();
  const { theme, toggleTheme } = useTheme(); 
  const { name } = useParams()

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [category, setCategory] = useState<string>("АКБ");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedBaseName, setSelectedBaseName] = useState<string | null>(null);

  const handleBaseNameChange = (name: string) => {
    setSelectedBaseName(name);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, category }]);
      setNewComment("");
    }
  };

  const filteredStations = data?.data
  .filter((station, index, self) =>
    station.BS_NAME.toLowerCase().includes(searchTerm.toLowerCase()) &&
    index === self.findIndex((s) => s.BS_NAME === station.BS_NAME) 
  );

  if (isLoading) {
    return <div className="center"><Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /></div>;
  }

  if (error) {
    const errorMessage = (error as any).message || "Нет данных с сервера";
    return <div className="center red">Error: {errorMessage}</div>;
  }

  console.log(name)

  return (
    <Router>
      <div className={`center ${theme}`}>
        <aside className="aside"
          style={{ boxShadow: theme !== 'dark' ? '2px 0 5px rgba(0, 0, 0, 0.5)' : '2px 0 5px rgba(255, 255, 255, 0.5)' }}>
          <h3>Список базовых станций</h3>
          <button onClick={toggleTheme}>Переключить тему</button>
          <input
            type="text"
            placeholder="Поиск по станции..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
          <div className='aside-wrapper'>
            <div className="rowBss">
              <div>Станция</div>
              <div>W4</div>
              <div>W_year</div>
            </div>
            {filteredStations?.map((station) => (
                <Link
                to={`/base/${station.BS_NAME}`}
                key={station.BS_NAME}
                className={`bs_info ${station.BS_NAME.toLowerCase() === selectedBaseName?.toLowerCase() ? 'active' : ''}`}
              >
                <div>{station.BS_NAME}</div>
                <div>{station.CA_4w} %</div>
                <div>{station.CA_52w} %</div>
              </Link>
            ))}
          </div>
        </aside>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignSelf: 'start', height: '100vh', overflowY: 'scroll' }} className='center-wrapper'>
          <div style={{ flex: 1, padding: "10px" }}>
            <Routes>
              <Route path="/base/:name" element={<BaseInfo onBaseNameChange={handleBaseNameChange} />} />
              <Route path="/" element={<h2>Выберите базовую станцию</h2>} />
            </Routes>
          </div>
        </div>
        <div className="comments" style={{ boxShadow: theme !== 'dark' ? '2px 0 5px rgba(0, 0, 0, 0.5)' : '2px 0 5px rgba(255, 255, 255, 0.5)' }}>
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

const AppWrapper = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWrapper;