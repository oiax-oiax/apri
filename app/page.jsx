import Link from "next/link";
import styles from "./page.module.css";

async function fetchAllUsers() {
  const res = await fetch("http://localhost:3000/api/register", {
    cache: "no-store",
  });

  const data = await res.json();
  console.log(data);

  return data.users;
}

export default async function Home() {
  const users = await fetchAllUsers();
  console.log(users);
  return (
    <>
      <div className={styles.createButton}>
        <Link href={"/register/add"}>新規作成</Link>
      </div>
      <div>
        {users.map((user) => (
          <>
            <div className={styles.card}>
              <div className={styles.cardWrapper}>
                <div className={styles.name} key={user.id}>
                  {user.name}
                </div>
                <div className={styles.email}>{user.email}</div>
                <Link href={`/register/edit/${user.id}`}>修正・削除</Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
