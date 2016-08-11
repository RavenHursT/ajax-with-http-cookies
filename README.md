# ajax-with-httponly-cookies
A simple POC used to prove that `httponly` cookies can be set via AJAX responses 

# Intallation:

`npm install`

# To run: 

`npm run start`

Then open http://localhost:3000 in browser.
 
# How to use this

Once you have the "Hello World" page up and running, open your console and you *should* see the following: 

`SUCCESS! httponly_cookie either not set or not readable by browser`

This tells us that there is no cookie set for the domain, and this can be verified by checking the resources tab in Chrome dev-tools and looking for the `httponly_cookie` (it shouldn't exist)

Click the "Do it!" button.  An AJAX POST request will be sent to the server and when the response comes back we should see in the console:

```
Object {data: Object, status: 202, statusText: "Accepted", headers: Object, config: Object}         client.js:5 
SUCCESS! httponly_cookie either not set or not readable by browser
```

This shows us that a response came back, and now we STILL cannot read a value for `httponly_cookie`.  However, if you go back into your resources tab, you *should* now see that the `http_cookie` cookie is now, indeed, set.

The final check is to verify that the httponly cookie that was set, is now readable by subsequent requests to the server.

Click the "Do it!" button again and then refresh the page.  Now go look at your server console and you should see the following from the `POST` and `GET` requests that you just generated:

```
httponly_cookie Cookie?
'SECRET_KEY'
  --> POST /try-cookie-set 202 1ms 13b
  <-- GET /
httponly_cookie Cookie?
'SECRET_KEY'
  --> GET / 200 2ms 322b
  <-- GET /build/public/client.js
  --> GET /build/public/client.js 200 2ms 610b
```

Done!  We just proved that `httponly` cookies can, indeed, be set via AJAX... No excuse to have page refreshes **EVEN** when we need to set httponly cookies, for instance, in regards to auth token cookies etc!
