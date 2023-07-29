import contactsService from "../models/contacts.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";

export const getAllContacts = async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

export const getAContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) throw HttpError(404);
  res.json(result);
};

export const addContact = async (req, res, next) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

export const changeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: "contact deleted",
  });
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getAContactById: ctrlWrapper(getAContactById),
  addContact: ctrlWrapper(addContact),
  changeContact: ctrlWrapper(changeContact),
  deleteContact: ctrlWrapper(deleteContact),
};