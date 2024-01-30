"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const edit = async (name, email, id) => {
  const res = await fetch(`http://localhost:3000/api/register/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, id }),
  });
  return res.json();
};

const deleteName = async (id) => {
  const res = await fetch(`http://localhost:3000/api/register/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const getId = async (id) => {
  const res = await fetch(`http://localhost:3000/api/register/${id}`);
  const data = await res.json();
  return data;
};

const Edit = ({ params }) => {
  const router = useRouter();
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("編集中です...", { id: "1" });

    await edit(nameRef.current.value, emailRef.current.value, params.id);

    toast.loading("編集に成功しました...", { id: "1" });

    router.push("/");
    router.refresh();
  };

  const handleDelete = async () => {
    toast.loading("削除中です...");
    await deleteName(params.id);
  };

  useEffect(() => {
    getId(params.id)
      .then((data) => {
        console.log(data.user);
        if (data.user) {
          nameRef.current.value = data.user.name;
          emailRef.current.value = data.user.email;
        }
      })
      .catch((err) => {
        toast.error("エラーが発生しました。", { id: "1" });
      });
  }, []);

  return (
    <>
      <Toaster />
      <div>名前編集ページ</div>
      <form onSubmit={handleSubmit}>
        <input ref={nameRef} type="text" placeholder="name" />
        <input ref={emailRef} type="text" placeholder="email" />
        <input type="submit" value="登録" />
        <input onSubmit={handleDelete} type="submit" value="削除" />
      </form>
    </>
  );
};

export default Edit;
