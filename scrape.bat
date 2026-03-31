@echo off
cd /d "%~dp0"
npm run scrape >> scrape.log 2>&1
