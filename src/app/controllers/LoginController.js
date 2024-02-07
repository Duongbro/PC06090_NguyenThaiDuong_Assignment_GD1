const { db, ref, set, get, child } = require("../../firebase");
const user = require("../../public/js/module/user");
const login_layout = "login_layout";

class LoginController {
  index(req, res) {
    res.render("login", { layout: login_layout });
  }

  async login(req, res) {
    try {
      let {
        register_email,
        register_password,
        username,
        email,
        password,
        btn_login,
        btn_signup,
      } = req.body;
      if (btn_login) {
        const newUser = new user();
        newUser.login(email, password)
          .then((result) => {
            console.log(result);
            if (result[0].status) {
              req.session.email = result[0].email;
              req.session.username = result[0].username;
              req.session.id = result[0].id;

              res.redirect("/home");
            }
          });
      } else if (btn_signup) {
        const newUser = new user();
        newUser.register(register_email, register_password, username)
          .then((result) => {
            if (result) {
              res.redirect("/home");
              req.session.email = result[0].email;
              req.session.username = result[0].username;
              req.session.id = result[0].id;
            } else {
              res.redirect("/login");
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  show(req, res) {
    res.send("show forgot passwor2d");
  }
}

module.exports = new LoginController();
