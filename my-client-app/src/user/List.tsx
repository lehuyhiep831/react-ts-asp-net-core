import { Link, Outlet } from "react-router-dom";
import users from "./users.json";

export function List() {
  return (
    <div>
      <h4>User list</h4>

      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </div>
      ))}
      <Outlet></Outlet>
    </div>
  );
}
