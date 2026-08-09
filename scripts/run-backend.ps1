# PowerShell script to run Spring Boot backend with JDK 21
$env:JAVA_HOME = "C:\Program Files\Android\openjdk\jdk-21.0.8"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

Set-Location -Path "$PSScriptRoot\..\backend"
Write-Host "Starting FlowerShop Spring Boot Backend with JDK 21..." -ForegroundColor Cyan

& "D:\Code\Intelij\IntelliJ IDEA 2026.1.1\plugins\maven\lib\maven3\bin\mvn.cmd" spring-boot:run
