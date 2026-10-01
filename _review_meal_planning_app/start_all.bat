@echo off
setlocal
cd /d "%~dp0"
title FoodVD Fullstack Launcher

echo ========================================================
echo       KHOI DONG HE THONG FOODVD (FULLSTACK + MONGODB)
echo ========================================================
echo.

echo [1/3] Khoi dong MongoDB (Port 27017)...
start "FoodVD - MongoDB" "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "%~dp0..\mongodb-data" --port 27017 --wiredTigerCacheSizeGB 0.5
ping 127.0.0.1 -n 3 >nul

echo [2/3] Khoi dong Backend API Express (Port 5000)...
start "FoodVD - Backend API" cmd /k "cd /d %~dp0 && node server/server.js"
ping 127.0.0.1 -n 3 >nul

echo [3/3] Khoi dong Frontend Web Vite (Port 8443)...
start "FoodVD - Frontend Web" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ========================================================
echo   TAT CA DICH VU DA DUOC KHOI DONG THANH CONG!
echo ========================================================
echo - Giao dien Web:   http://localhost:8443
echo - Backend API:     http://localhost:5000
echo - MongoDB URI:     mongodb://localhost:27017/foodvd
echo ========================================================
ping 127.0.0.1 -n 3 >nul
start http://localhost:8443

echo.
echo He thong da khoi dong xong va mo tren trinh duyet!
echo Cua so nay giu lai de ban tien quan sat. Nhan phim bat ky de dong...
pause >nul
