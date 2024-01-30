import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}
export const GET = async (req, res) => {
  try {
    await main();
    const users = await prisma.user.findMany();
    return NextResponse.json({ message: "Success", users }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req, res) => {
  try {
    const { name, email } = await req.json();
    await main();
    const users = await prisma.user.create({ data: { name, email } });
    return NextResponse.json({ message: "Success", users }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
