import { Router } from "express";
import { get_times } from "../controllers/leaderBoardController.js";

const leaderBoardRouter = Router()

leaderBoardRouter.get('/', get_times)

export default leaderBoardRouter