import app from "@/src/app";
import { fire } from "hono/service-worker";

//fire(app,);

export default {
    fetch: async (req: Request, env: any, ctx: any) => app.fetch(req, env, ctx),
}
