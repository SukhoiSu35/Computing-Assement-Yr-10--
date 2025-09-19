from flask import Flask, request, render_template, redirect, url_for, session, send_from_directory

# Serve static files right from this folder (index.html, styles.css, app.js)
app = Flask(__name__, static_folder=".", static_url_path="", template_folder="templates")
app.secret_key = "change-me"   # replace for real use

USERS = {"admin": "test123"}   # demo credentials

@app.get("/")
def home():
    # serve index.html from the current folder
    return send_from_directory(app.static_folder, "index.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        u = request.form.get("username", "").strip()
        p = request.form.get("password", "").strip()
        if USERS.get(u) == p:
            session["user"] = u
            return redirect(url_for("home"))
        return render_template("login.html", error="Invalid username or password.", username=u)
    # GET
    if session.get("user"):
        return redirect(url_for("home"))
    return render_template("login.html")

@app.get("/logout")
def logout():
    session.clear()
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(debug=True)
