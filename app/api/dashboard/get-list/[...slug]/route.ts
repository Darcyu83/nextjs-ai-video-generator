export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
}
