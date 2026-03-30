import { useSelector } from "react-redux";
import Loader from "./Components/Loader/Loader";
import RouterMainPage from "./Components/Router/RouterMainPage";

function App() {
  const Loading_Reducer_State = useSelector(
    (state) => state.Loading_Reducer_State.isLoading,
  );
  return (
    <div className="App">
      <header className="App-header">
        <RouterMainPage></RouterMainPage>
        {/* 로딩 컴포넌트 시작 */}
        <Loader loading={Loading_Reducer_State}></Loader>
        {/* 로딩 컴포넌트 끝 */}
      </header>
    </div>
  );
}

export default App;
