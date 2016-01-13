import 'babel-polyfill'
import React from 'react'
import ReactDOMServer from '../node_modules/react-dom/server'
import koala from 'koala'
import koaRouter from 'koa-router'
import staticServe from 'koa-static-folder'
let app = koala()
let router = koaRouter()

app.use(staticServe('./build/public'))

router.post('/try-cookie-set', function *(next) {
  this.response.status = 202
  this.response.type = 'application/json'
  this.cookies.set('httponly_cookie', 'SECRET_KEY', {
    httpOnly: true
  })
  this.body = JSON.stringify({foo:'bar'})
})

router.get('/favicon.ico', function *(){
  this.status = 200
  this.response.type = 'image/png'
  this.body = ''
})

app.use(function *(next){
  console.log('httponly_cookie Cookie?')
  console.dir(this.cookies.get('httponly_cookie'), {colors:true, depth:5, hidden:true})
  yield next
})

app.use(router.routes())

app.use(function *(){
  this.body = ReactDOMServer.renderToStaticMarkup(
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.0/js.cookie.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.8.1/axios.min.js"></script>
      </head>
      <body>
        <h1>Hello World</h1>
        <button id="do-it">Do It!</button>
        <script src="/build/public/client.js"></script>
      </body>
    </html>
  )
})

app.listen(3000).on(`listening`, () => {
  console.log(`listening on port 3000`)
})