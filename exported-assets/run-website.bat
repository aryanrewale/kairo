@echo off
echo ========================================
echo           KAIRO WEBSITE
echo ========================================
echo.
echo Starting frontend on port 3000...
echo.
cd client
npm run dev
echo.
echo ✅ Website running at: http://localhost:3000
echo ❌ Do NOT use: http://localhost:5003 (that's backend API only)
echo.
pause