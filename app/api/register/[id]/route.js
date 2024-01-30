import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { main } from "../route";

const prisma = new PrismaClient();

export const GET = async (req, res) => {
  try {
    const id = parseInt(req.url.split("/register/")[1]);
    await main();
    const user = await prisma.user.findFirst({ where: { id } });
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req, res) => {
  try {
    const id = parseInt(req.url.split("/register/")[1]);

    const { name, email } = await req.json();
    await main();
    const user = await prisma.user.update({
      data: { name, email },
      where: { id },
    });
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req, res) => {
  try {
    const id = parseInt(req.url.split("/register/")[1]);
    await main();
    const user = await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
