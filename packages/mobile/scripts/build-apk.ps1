# Builds a release APK on Windows. React Native's C++ modules fail when paths pass 260 characters, and pnpm's
# store folders under this repo's path get there, so the build runs in a disposable copy at a short path with
# shorter store folder names. node_modules and android/ are kept there between runs, so rebuilds are faster.
#
#   powershell -File packages/mobile/scripts/build-apk.ps1 [-Dest E:\sm] [-Pnpm pnpm] [-Architectures arm64-v8a]
#
# The APK lands in packages/mobile/dist/. It is signed with the debug key; sign releases with your own.
param(
  [string]$Dest = 'E:\sm',
  [string]$Pnpm = 'pnpm',
  [string]$Architectures = 'arm64-v8a,armeabi-v7a,x86_64'
)
$ErrorActionPreference = 'Stop'

$repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..\..')).Path
Write-Host "Copying $repo -> $Dest"
# /MIR leaves the excluded folders in $Dest alone, so its node_modules and native build survive between runs
robocopy $repo $Dest /MIR /NFL /NDL /NJH /NJS /NP `
  /XD node_modules .git .expo dist dist-next target data android ios .tools | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy failed ($LASTEXITCODE)" }

# A flat node_modules: under pnpm's store each package path is long, and CMake repeats it inside its object paths
$workspace = Join-Path $Dest 'pnpm-workspace.yaml'
Add-Content -Path $workspace -Value "`n# build-apk.ps1: flat node_modules (Windows path limit)`nnodeLinker: hoisted"

Push-Location $Dest
try {
  & $Pnpm install --frozen-lockfile --config.confirmModulesPurge=false
  if ($LASTEXITCODE -ne 0) { throw 'pnpm install failed' }

  Set-Location (Join-Path $Dest 'packages\mobile')
  $env:CI = '1'
  # the app's own CMake build folder, which also needs a short path (plugins/with-cmake-staging-dir.js)
  $env:MOBILE_CMAKE_STAGING_DIR = "$Dest-cxx"
  npx expo prebuild --platform android --no-install
  if ($LASTEXITCODE -ne 0) { throw 'expo prebuild failed' }

  if (-not $env:JAVA_HOME) {
    $studioJdk = 'C:\Program Files\Android\Android Studio\jbr'
    if (Test-Path $studioJdk) { $env:JAVA_HOME = $studioJdk }
  }
  if (-not $env:ANDROID_HOME) { $env:ANDROID_HOME = Join-Path $env:LOCALAPPDATA 'Android\Sdk' }
  $env:Path = "$env:JAVA_HOME\bin;$env:Path"

  Set-Location android
  .\gradlew.bat assembleRelease "-PreactNativeArchitectures=$Architectures"
  if ($LASTEXITCODE -ne 0) { throw 'gradle assembleRelease failed' }
  .\gradlew.bat --stop | Out-Null

  $apk = Join-Path $Dest 'packages\mobile\android\app\build\outputs\apk\release\app-release.apk'
  $out = Join-Path $repo 'packages\mobile\dist'
  New-Item -ItemType Directory -Force $out | Out-Null
  Copy-Item $apk (Join-Path $out 'skiff-mail.apk') -Force
  Write-Host "APK: $(Join-Path $out 'skiff-mail.apk')"
}
finally {
  Pop-Location
}
