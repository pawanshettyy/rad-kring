@echo off
REM RAD KRING AVIATION Backend Setup Script for Windows
REM This script automates the backend setup process

echo.
echo 🚀 RAD KRING AVIATION Backend Setup
echo ====================================
echo.

REM Check if Node.js is installed
echo [INFO] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [SUCCESS] Node.js is installed: %NODE_VERSION%
)

REM Check if npm is available
echo [INFO] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not available
    pause
    exit /b 1
) else (
    echo [SUCCESS] npm is available
)

REM Install dependencies
echo.
echo [INFO] Installing Node.js dependencies...
npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
) else (
    echo [SUCCESS] Dependencies installed successfully
)

REM Setup environment file
echo.
echo [INFO] Setting up environment configuration...
if not exist .env (
    if exist .env.example (
        copy .env.example .env >nul
        echo [SUCCESS] Created .env file from .env.example
        echo [WARNING] Please edit .env file with your configuration before running the server
        echo.
        echo Required configurations:
        echo   - MONGODB_URI: Your MongoDB connection string
        echo   - JWT_SECRET: A secure secret key (minimum 32 characters)
        echo   - SMTP_* variables: Email configuration for automated emails
    ) else (
        echo [ERROR] .env.example file not found
        pause
        exit /b 1
    )
) else (
    echo [SUCCESS] .env file already exists
)

REM Ask user if they want to seed database
echo.
set /p SEED_DB="Do you want to seed the database with initial data? (y/n): "
if /i "%SEED_DB%"=="y" (
    echo [INFO] Seeding database...
    npm run seed
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to seed database
        echo Make sure MongoDB is running and connection string is correct
    ) else (
        echo [SUCCESS] Database seeded successfully
    )
) else (
    echo [INFO] Skipping database seeding
)

REM Ask user if they want to test API endpoints
echo.
set /p TEST_API="Do you want to test API endpoints? (y/n): "
if /i "%TEST_API%"=="y" (
    echo [INFO] Testing API endpoints...
    node test-api.js
    if %errorlevel% neq 0 (
        echo [WARNING] Some API tests may have failed
        echo Make sure the server is properly configured
    )
) else (
    echo [INFO] Skipping API tests
)

REM Final instructions
echo.
echo 🎉 Setup Complete!
echo ==================
echo.
echo [SUCCESS] Backend setup is complete!
echo.
echo Next steps:
echo   1. Edit .env file with your specific configuration
echo   2. Make sure MongoDB is running
echo   3. Start the development server: npm run dev
echo   4. Visit http://localhost:5000/api/health to verify
echo.
echo For detailed documentation, see:
echo   - Readme.md (setup guide)
echo   - API_DOCUMENTATION.md (API reference)
echo.
echo Commands:
echo   npm run dev    - Start development server
echo   npm start      - Start production server
echo   npm run seed   - Seed database with initial data
echo   node test-api.js - Test all API endpoints
echo.

pause
