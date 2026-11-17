param(
    [ValidateRange(1024, 65535)][int]$Port = 8088,
    [switch]$BuildOnly
)
$ErrorActionPreference = 'Stop'
$previousJavaHome = $env:JAVA_HOME
try {
    foreach ($command in @('java.exe', 'npm.cmd', 'mvn.cmd')) {
        if (-not (Get-Command $command -ErrorAction SilentlyContinue)) {
            throw "Voraussetzung fehlt: $command. Bitte JDK 21+, Node 22 und Maven installieren."
        }
    }
    # Use the same Java as the terminal, even if JAVA_HOME points to an old JDK.
    $java = (Get-Command java.exe).Source
    $settings = (& $java -XshowSettings:properties -version 2>&1 | Out-String)
    if ($settings -notmatch 'java.home\s*=\s*([^\r\n]+)') { throw 'Java-Verzeichnis nicht ermittelbar.' }
    $env:JAVA_HOME = $Matches[1].Trim()
    if ($settings -notmatch 'java.specification.version\s*=\s*(\d+)' -or [int]$Matches[1] -lt 21) {
        throw 'MOTOCARE braucht JDK 21 oder neuer im PATH.'
    }
    Push-Location (Join-Path $PSScriptRoot 'frontend')
    try {
        $installStamp = 'node_modules/.motocare-lock.sha256'
        $lockHash = if (Test-Path package-lock.json) { (Get-FileHash package-lock.json).Hash } else { '' }
        $installedHash = if (Test-Path $installStamp) { (Get-Content $installStamp -Raw).Trim() } else { '' }
        if (-not $lockHash -or $lockHash -ne $installedHash -or -not (Test-Path node_modules/.bin/vite.cmd)) {
            if (Test-Path package-lock.json) { & npm.cmd ci --no-audit --no-fund }
            else { & npm.cmd install --no-audit --no-fund }
            if ($LASTEXITCODE -ne 0) { throw 'Installation der Frontend-Abhaengigkeiten fehlgeschlagen.' }
            Set-Content $installStamp (Get-FileHash package-lock.json).Hash
        } else { Write-Host 'Frontend-Abhaengigkeiten sind aktuell.' }
        & npm.cmd test
        if ($LASTEXITCODE -ne 0) { throw 'Frontend-Tests fehlgeschlagen.' }
        & npm.cmd run build
        if ($LASTEXITCODE -ne 0) { throw 'Frontend-Build fehlgeschlagen.' }
    } finally { Pop-Location }
    Push-Location (Join-Path $PSScriptRoot 'backend')
    try {
        & mvn.cmd -B clean package -P local-app
        if ($LASTEXITCODE -ne 0) { throw 'Backend-Build oder Tests fehlgeschlagen.' }
        if (-not $BuildOnly) {
            # Keep the running JAR outside target so Maven clean can always build.
            $runtimeDirectory = Join-Path $PSScriptRoot '.runtime'
            $runtimeJar = Join-Path $runtimeDirectory 'motocare.jar'
            $running = Get-CimInstance Win32_Process -Filter "name = 'java.exe'" | Where-Object {
                $_.CommandLine -and $_.CommandLine.Contains('-jar "' + $runtimeJar + '"')
            }
            foreach ($process in $running) {
                Write-Host "Ersetze laufende MOTOCARE-Instanz (PID $($process.ProcessId))."
                Stop-Process -Id $process.ProcessId -ErrorAction Stop
                Wait-Process -Id $process.ProcessId -ErrorAction SilentlyContinue
            }
            New-Item -ItemType Directory -Path $runtimeDirectory -Force | Out-Null
            Copy-Item -LiteralPath target/motocare-backend-1.0.0.jar -Destination $runtimeJar -Force
            Write-Host "MOTOCARE: http://localhost:$Port (Stoppen: Strg+C)"
            $appProcess = Start-Process -FilePath $java -ArgumentList @('-jar', ('"' + $runtimeJar + '"'), "--server.port=$Port", '--server.address=127.0.0.1', '--spring.datasource.url=jdbc:h2:file:./data/motocare;DB_CLOSE_ON_EXIT=FALSE', '--spring.datasource.driver-class-name=org.h2.Driver', '--spring.datasource.username=sa', '--spring.datasource.password=') -WorkingDirectory (Get-Location).Path -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $runtimeDirectory 'app.log') -RedirectStandardError (Join-Path $runtimeDirectory 'app-error.log')
            try {
                $appProcess.WaitForExit()
                if ($appProcess.ExitCode -ne 0) { throw "MOTOCARE wurde beendet. Details: $runtimeDirectory/app-error.log und app.log" }
            } finally {
                if (-not $appProcess.HasExited) { Stop-Process -Id $appProcess.Id }
            }
        }
    } finally { Pop-Location }
} finally { $env:JAVA_HOME = $previousJavaHome }
