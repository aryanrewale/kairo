@echo off
echo ========================================
echo   KAIRO - System Test
echo ========================================
echo.
echo Testing backend connection...
curl -s http://localhost:5005/api/health
echo.
echo.
echo Testing frontend proxy...
curl -s http://localhost:3000/api/health
echo.
echo.
echo If you see JSON responses above, the system is working!
echo If not, make sure both servers are running.
echo.
pause