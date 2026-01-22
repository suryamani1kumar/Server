import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
} from "../controllers/author/author.controller";

const router = Router();

router.post("/createAuthor", createAuthor);
router.get("/getAllAuthors", getAllAuthors);
router.get("/getAuthorById/:id", getAuthorById);
router.put("/updateAuthor/:id", updateAuthor);
router.delete("/deleteAuthor/:id", deleteAuthor);

export default router;
