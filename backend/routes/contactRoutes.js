import express from "express";
import Contact from "../models/Contact.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const contact = await Contact.create({
    ...req.body,
    user: req.user
  });
  res.status(201).json(contact);
});

router.get("/", protect, async (req, res) => {
  const contacts = await Contact.find({ user: req.user }).sort({
    createdAt: -1
  });
  res.json(contacts);
});

router.put("/:id", protect, async (req, res) => {
  const contact = await Contact.findOne({
    _id: req.params.id,
    user: req.user
  });

  if (!contact)
    return res.status(404).json({ message: "Contact not found" });

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedContact);
});

router.delete("/:id", protect, async (req, res) => {
  const contact = await Contact.findOne({
    _id: req.params.id,
    user: req.user
  });

  if (!contact)
    return res.status(404).json({ message: "Contact not found" });

  await contact.deleteOne();
  res.json({ message: "Contact deleted successfully" });
});

export default router;
