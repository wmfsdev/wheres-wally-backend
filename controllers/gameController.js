
import prisma from "../libs/prisma.js";

function test(req, res, next) {
  console.log("test function")
  res.status(200).json()
}

async function post_check_coordinates(req, res, next) {
  console.log("check coordinates")

  res.status(200).json()
} 

export { test, post_check_coordinates }