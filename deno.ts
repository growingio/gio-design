import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
app.use(async (ctx) => {
  try {
    await ctx.send({
      root: Deno.cwd(),
      index: "index.html",
    });
  } catch {
    ctx.response.status = 404;
    ctx.response.body = "404 File not found";
  }
});

await app.listen({ port: 80 });
