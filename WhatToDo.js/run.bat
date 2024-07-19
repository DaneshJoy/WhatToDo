@rem pm2 stop whattodo
if %ERRORLEVEL% neq 0 goto Start

:Start
@rem pm2 start app.js --name whattodo
start http://localhost:3000