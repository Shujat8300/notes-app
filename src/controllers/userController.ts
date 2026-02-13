import { Request, Response } from "express";
import * as UserModel from "../models/userModel";
import prisma from "../prisma";

export const getUsers = async (req: Request, res: Response) => {
  const users = await UserModel.getAllUsers();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id; // <- fix
  const user = await UserModel.getUserById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const checkExistingEmail = await prisma.user.findUnique({ where:{email}});
   if (checkExistingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
  const user = await prisma.user.create({
    data:{name, email},
  });
  res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id; // <- fix
  const { name, email } = req.body;
  const user = await UserModel.updateUser(id, { name, email });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id; // <- fix
  await UserModel.deleteUser(id);
  res.status(204).send();
};
