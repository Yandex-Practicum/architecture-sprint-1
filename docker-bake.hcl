target "backend" {
  cache-to = [
    "type=gha,ignore-error=true,mode=max,scope=backend"
  ]
  cache-from = [
    "type=gha,scope=backend"
  ]
}
target "frontend" {
  cache-to = [
    "type=gha,ignore-error=true,mode=max,scope=frontend"
  ]
  cache-from = [
    "type=gha,scope=frontend"
  ]
}
