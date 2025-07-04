import { useSelector } from 'react-redux';
import Loader from './Components/Loader/Loader';
import RouterMainPage from './Components/Router/RouterMainPage';

function App() {
    // const Loading = useSelector(state => state.Now_Loader_Info_State.Loader_Info.Loader);
    const Loading = false;
    return (
        <div className="App">
            <header className="App-header">
                <RouterMainPage></RouterMainPage>
                {/* 로딩 컴포넌트 시작 */}
                <Loader loading={Loading}></Loader>
                {/* 로딩 컴포넌트 끝 */}
            </header>
        </div>
    );
}

export default App;
