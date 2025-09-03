import app from "@/src/app";
import { fire } from "hono/service-worker";

fire(app);