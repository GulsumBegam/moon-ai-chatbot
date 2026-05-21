import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, context: any) {
  try {
    const id = context.params.id;

    const conversation = await prisma.conversation.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      conversation,
      messages: conversation.messages,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch conversation" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    const id = context.params.id;

    await prisma.conversation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete conversation" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, context: any) {
  try {
    const id = context.params.id;

    const body = await req.json();

    const conversation = await prisma.conversation.update({
      where: { id },
      data: {
        title: body.title,
      },
    });

    return NextResponse.json({ conversation });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update conversation" },
      { status: 500 }
    );
  }
}