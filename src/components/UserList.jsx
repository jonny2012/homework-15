import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import styles from "./UserList.module.css";

const UserList = ({ number }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const urlUser = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setCurrentUsers(users.slice(0, number));
  }, [number, users]);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(urlUser);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const filterUsers = useCallback(
    (filterText) => {
      return users.filter((user) =>
        user.name.toLowerCase().includes(filterText.toLowerCase())
      );
    },
    [users]
  );

  const filteredUsers = useMemo(
    () => filterUsers(filter),
    [filter, filterUsers]
  );

  return (
    <div className={styles.Container}>
      <h2>User List</h2>
      <ul>
      {loading ? (
        <p>Loading...</p>
      ) : (
        currentUsers.map((user) => (
          <li className={styles.listItem} key={user.id}>
            Id: {user.id} Name: {user.name}
          </li>
        ))
      )}
      </ul>

      <button className={styles.button} onClick={getUsers}>Update</button>

      <div className={styles.FilterContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Filter users"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <ul>
          {filter &&
            filteredUsers.map((user) => (
              <li key={user.id}>
                ID: {user.id} NAME: {user.name}
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
