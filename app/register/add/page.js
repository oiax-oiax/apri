"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import styles from "./page.module.css";
import { Toaster, toast } from "react-hot-toast";

const register = async (name, email) => {
  const res = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  });
  return res.json();
};

export default function Register() {
  const router = useRouter();
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("投稿中です...", { id: "1" });

    await register(nameRef.current.value, emailRef.current.value);
    toast.loading("投稿に成功しました...", { id: "1" });

    router.push("/");
    router.refresh();
  };
  return (
    <>
      <Toaster />
      <div className={styles.title}>新規登録ページ</div>
      <form onSubmit={handleSubmit}>
        <input ref={nameRef} type="text" placeholder="name" />
        <input ref={emailRef} type="text" placeholder="email" />
        <input type="submit" value="登録" />
      </form>
    </>
  );
}
