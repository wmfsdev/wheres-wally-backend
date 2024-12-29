
import prisma from "../libs/prisma.js";

async function createUser(req, res, next) {
   
    const { name, email } = req.body
  
    const response = await prisma.user.create({
        data: {
            name: name,
            email: email,
        }
    });

    return res.status(200).json();
}

function sampleController(req, res) {
    res.json({ name: "frodo" });
}

export { sampleController, createUser }