from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from routes import support

app = FastAPI()

# Mount the 'static' directory so we can serve files like the favicon
#app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve a message at the root path so it doesn't 404
@app.get("/")
async def root():
    return {"message": "Welcome to the Murur API 💜"}

# Redirect /favicon.ico to the actual static location
@app.get("/favicon.ico")
async def favicon():
    return RedirectResponse(url="/static/favicon_io/favicon.ico")

# Include the support routes
app.include_router(support.router)
