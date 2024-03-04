import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllUsers, deleteUserRedux } from "./redux/slices/userSlice";

function App() {
    const dispatch = useDispatch();

    const listUsers = useSelector((state) => state.user.listUsers);
    const isLoading = useSelector((state) => state.user.isLoading);
    const isError = useSelector((state) => state.user.isError);
    const isDeleting = useSelector((state) => state.user.isDeleting);
    const isDeletingSuccess = useSelector(
        (state) => state.user.isDeletingSuccess
    );
    const isDeletingError = useSelector((state) => state.user.isDeletingError);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    if (isDeletingSuccess === true) {
        // alert("Xóa user thành công");
    }

    if (isDeletingError === true) {
        // alert("Xóa user thất bại");
    }

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            {/* <h1>Vite + React</h1>
            <button onClick={() => dispatch(increment())}>Increase</button>
            <button onClick={() => dispatch(decrement())}>Decrease</button>
            <br />
            <div>Count = {count}</div> */}
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td>Loading data...</td>
                            </tr>
                        ) : isError ? (
                            <tr>
                                <td>Loading error</td>
                            </tr>
                        ) : (
                            <>
                                {listUsers &&
                                    listUsers.length > 0 &&
                                    listUsers.map((user, index) => (
                                        <tr key={`user-${index}`}>
                                            <td>{user?.id}</td>
                                            <td>{user?.email}</td>
                                            <td>{user.username}</td>
                                            <td>
                                                <button
                                                    disabled={isDeleting}
                                                    onClick={() => {
                                                        dispatch(
                                                            deleteUserRedux(
                                                                user.id
                                                            )
                                                        ),
                                                            dispatch(
                                                                fetchAllUsers()
                                                            );
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default App;
