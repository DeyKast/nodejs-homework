import express from "express";
import controllers from "../../controllers/contacts.js";
import {
  validateBody,
  validateObject,
  isValidId,
  authenticate,
} from "../../middlewares/index.js";
import {
  contactSchema,
  contactUpdateFavoriteSchema,
} from "../../schemas/contactsSchema.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", controllers.getAllContacts);

contactsRouter.get("/:id", isValidId, controllers.getAContactById);

contactsRouter.post(
  "/",
  validateObject(),
  validateBody(contactSchema),
  controllers.addContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateObject(),
  validateBody(contactSchema),
  controllers.changeContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(contactUpdateFavoriteSchema),
  controllers.updateStatusContact
);

contactsRouter.delete("/:id", isValidId, controllers.deleteContact);

export default contactsRouter;
