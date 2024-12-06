export async function GET(
  req: Request,
  { params }: { params: Promise<{ teamid: number }> }
) {
  try {
    const teamid = (await params).teamid;

    const reqUrl = [process.env.NEXT_PUBLIC_BASE_URL!, String(teamid)].join(
      "/"
    );

    const authToken = "";

    const response = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          error: "Failed to fetch team data",
          details: error.message,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    } else {
      // In case the error is not an instance of Error
      console.error("Unknown error occurred");
      return new Response(JSON.stringify({ error: "Unknown error occurred" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}
