#!/bin/bash
{ # try
    pm2 stop whattodo
} || { # catch
    pm2 start app.js --name whattodo
    xdg-open http://localhost:3000
}
