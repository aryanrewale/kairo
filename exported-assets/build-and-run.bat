@echo off
echo ========================================
echo      BUILDING KAIRO FULL-STACK
echo ========================================
echo.

echo Step 1: Building frontend...
cd client
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)
echo ✅ Frontend built successfully!
echo.

echo Step 2: Starting backend server...
cd ..\server
echo ✅ Starting server on http://localhost:5003
echo ✅ Frontend and Backend running together!
echo.
npm run dev

pause