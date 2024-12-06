export async function GET(
  req: Request,
  { params }: { params: Promise<{ tag: number; itemid: number }> }
) {
  const { tag, itemid } = await params;
}
