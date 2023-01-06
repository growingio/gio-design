import { Application, Context } from "https://deno.land/x/oak/mod.ts";

const GA_URL = 'https://www.google-analytics.com';

const app = new Application();
app.use(async (ctx: Context) => {
  const pathname = ctx.request.url.pathname;
  if (pathname.endsWith('/g/collect')) {
    await fetch(`${GA_URL}${ctx.request.url.search}`);
    ctx.reqsponse.status = 204;
  } else if (pathname.endsWith('/mp/collect')) {
    await fetch(GA_URL, {
      method: ctx.request.method,
      headers: ctx.request.headers,
      body: await ctx.request.body().value,

    });
    ctx.reqsponse.status = 204;
  }
  else {
    try {
      await ctx.send({
        root: Deno.cwd(),
        index: "index.html",
      });
    } catch {
      ctx.response.status = 404;
      ctx.response.body = "404 File not found";
    }
  }
});

await app.listen({ port: 80 });
