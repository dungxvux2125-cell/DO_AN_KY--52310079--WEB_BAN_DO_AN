@echo off
title Bat dich vu MongoDB he thong
chcp 65001 >nul
echo Dang khoi dong dich vu MongoDB Server cua Windows...
net start MongoDB
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ==========================================================
    echo [LƯU Ý] Vui lòng chuột phải vào file này và chọn:
    echo        "Run as administrator" (Chay voi quyen quan tri vien)
    echo ==========================================================
) else (
    echo.
    echo ==========================================================
    echo [THANH CONG] MongoDB Server da duoc bat!
    echo Ban co the mo MongoDB Compass va bam Connect binh thuong.
    echo ==========================================================
)
pause

