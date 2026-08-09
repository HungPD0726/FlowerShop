# PowerShell script to reset and seed local SQL Server database for FlowerShop
Param(
    [string]$ServerInstance = "localhost",
    [string]$DatabaseName = "flower_shop_db"
)

Write-Host "Resetting FlowerShop Database on $ServerInstance..." -ForegroundColor Cyan

$schemaPath = Join-Path $PSScriptRoot "..\database\schema.sql"
$dataPath = Join-Path $PSScriptRoot "..\database\data.sql"

if (Get-Command sqlcmd -ErrorAction SilentlyContinue) {
    Write-Host "Running schema.sql..." -ForegroundColor Yellow
    sqlcmd -S $ServerInstance -C -i $schemaPath
    Write-Host "Running data.sql..." -ForegroundColor Yellow
    sqlcmd -S $ServerInstance -C -i $dataPath
    Write-Host "Database reset successfully!" -ForegroundColor Green
} else {
    Write-Host "sqlcmd not found. SQL script files prepared in database/ directory." -ForegroundColor Yellow
    Write-Host " - schema.sql: $schemaPath"
    Write-Host " - data.sql: $dataPath"
}
