
import prisma from "../libs/prisma.js";

function test(req, res, next) {
    console.log("test function")

    console.log("req.query", req.query)

    console.log(req.session)
    if (req.session.views) {
        req.session.views++
     //   res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
      } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
      }
  //  res.status(200).json()

  // use req.session.whatever to track winning condition
}

export { test }