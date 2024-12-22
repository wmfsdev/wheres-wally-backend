
import prisma from "../libs/prisma";

async function createUser(user) {
    return await prisma.user.create({
        data: user,
    }); 
}

function sampleController(req, res) {
    res.send('Hello World!')
}

module.exports = { sampleController, createUser }