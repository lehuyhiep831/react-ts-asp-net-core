import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import users from "./users.json";

export function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const newUser = users.find((user) => user.id.toString() === id);

    if (newUser !== undefined) {
      setUser(newUser);
    } else {
      navigate("/errors");
    }
  }, [id, navigate]);

  return <div>{user && `${user.name} are ${user.Age} years old!`}</div>;
}
