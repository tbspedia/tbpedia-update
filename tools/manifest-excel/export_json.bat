@echo off
setlocal
where py >nul 2>nul
if errorlevel 1 goto usepython
py -3 "%~dp0excel_to_json.py" "%~dp0tbpedia-manifests.xlsx" --output "%~dp0exported" --force
goto done
:usepython
python "%~dp0excel_to_json.py" "%~dp0tbpedia-manifests.xlsx" --output "%~dp0exported" --force
:done
if errorlevel 1 echo Export failed. See the error above.
pause
