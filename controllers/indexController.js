
import prisma from "../libs/prisma.js";

async function createUser(user) {
    return await prisma.user.create({
        data: user,
    }); 
}

function sampleController(req, res) {
    res.send('Hello World!')
}

export { sampleController, createUser }