if(process.env.NODE_ENV !="production"){
require('dotenv').config()
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Data = require("./models/Stu_Data.js");
const ejsmate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const WrapAsync = require("./utils/WrapAsync.js");
const Content = require("./models/content.js");
const contentschema = require("./schema/contentschema.js");
const session = require("express-session");
const MongoStore=require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/Stu_Data.js");
const Userschema = require("./schema/schema.js");
const { isLoggedIn, saveRedirectUrl } = require("./middleware.js");
const { error } = require('console');
// const Collegeform= require("./models/collegeform.js")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "/public")));

const dbUrl= process.env.ATLASDB_URL;

const store= MongoStore.create({
    mongoUrl: dbUrl,
     crypto: {
     secret: process.env.SECRET,
  },
  touchAfter:24*3600,

  });

  store.on("error",()=>{
    console.log("error",err);
  })

  const sessionOption={
    store,
     secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
     cookie:{
    expires:Date. now() +7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,

   }
  }

app.use(
  session(sessionOption)
);



main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  // await mongoose.connect("mongodb://127.0.0.1:27017/StudentData");
  await mongoose.connect(dbUrl);
  // console.log(dbUrl);
}

const ValidateData = (req, res, next) => {
  const { error } = Userschema.validate(req.body);
  if (error) {
    console.log(error);
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

const Validatecontent = (req, res, next) => {
  const { error } = contentschema.validate(req.body);
  if (error) {
    console.log(error);
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

app.use(passport.initialize());
app.use(passport.session());
passport.use( "User-local",new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curruser = req.user;
  next();
});

  // search box
  app.post("/search",WrapAsync(async(req, res) =>{
    let {search} = req.body;
    let searchData= await Content.find({name:search});
    if(searchData.length===0){
       res.render("searcherror.ejs");
    }
    else{
   res.render("searchData.ejs",{searchData});
    console.log(searchData);
    }
  }))

           //contact

app.get("/contact", (req, res) => {
  res.render("contact/contact.ejs");
});

//  about 

app.get("/about",(req, res)=>{
  res.render("about.ejs");
})

// main


app.get(
  "/main",
  WrapAsync(async (req, res) => {
    let datas = await Content.find({});
    res.render("main.ejs", { datas });
  })
);

    //collegeform

app.get("/submit", (req, res) => {
  res.render("collegeform.ejs");
});

// post main
app.post("/main", (req, res) => {
  let { username, password } = req.body;
  let id = "acetcollege";
  let Password = "acet12345678";
  if (id === username && Password === password) {
    req.flash("success", "Welcome To Acet Feedback");
    return res.redirect("/main");
  } else {
    req.flash("error", "Enter valid username and Password");
    return res.redirect("/submit");
  }
});
         
      //   add feed

app.get(
  "/feed",
  WrapAsync(async (req, res) => {
    if (res.locals.curruser) {
      let id = res.locals.curruser._id;
      let user = await User.findById(id);
      let name = user.name;
      res.render("feed.ejs", { name });
    }
  })
);

// //main2

app.post(
  "/main2",
  Validatecontent,
  WrapAsync(async (req, res) => {
    let { data } = req.body;
    if (res.locals.curruser) {
      let id = res.locals.curruser._id;
      let user = await User.findById(id);
      let name = user.name;
      let course = user.course;
      let semister = user.semister;
      const newdata = new Content({
        name: name,
        course: course,
        semister: semister,
        content: data.content,
      });
      await newdata.save();
      console.log("chat save");
      req.flash("success", "Add Feed Successfuly!");
      res.redirect("/main");
    }
  })
);

    // signup

app.get("/signup", (req, res) => {
  res.render("user/signup.ejs");
});
    // post signup 

app.post(
  "/signup",
  ValidateData,
  WrapAsync(async (req, res) => {
    let { data } = req.body;
    let course1 = "BCA";
    let course2 = "BBA";
    let course3 = "B.Tech";
    let course4 = "MCA";
    let sem1 = "1";
    let sem2 = "2";
    let sem3 = "3";
    let sem4 = "4";
    let sem5 = "5";
    let sem6 = "6";
    let sem7 = "7";
    let sem8 = "8";

    if (
      course1 === data.course &&
      (sem1 === data.semister ||
        sem2 === data.semister ||
        sem3 === data.semister ||
        sem4 === data.semister ||
        sem5 === data.semister ||
        sem6 === data.semister)
    ) {
      try {
        const newUser = new User(req.body.data);
        let registerUser = await User.register(newUser, data.password);
        req.login(registerUser, (err) => {
          if (err) {
            return next(err);
          }
          req.flash("success", "Welcome to Acet Feedback");
          res.redirect("/main");
        });
      } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
      }
    } else if (
      data.course === course2 &&
      (data.semister === sem1 ||
        data.semister === sem2 ||
        data.semister === sem3 ||
        data.semister === sem4 ||
        data.semister === sem5 ||
        data.semister === sem6)
    ) {
      try {
        const newUser = new User(req.body.data);
        let registerUser = await User.register(newUser, data.password);
        req.login(registerUser, (err) => {
          if (err) {
            return next(err);
          }
          req.flash("success", "Welcome to Acet Feedback");
          res.redirect("/main");
        });
      } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
      }
    } else if (
      data.course === course3 &&
      (data.semister === sem1 ||
        data.semister === sem2 ||
        data.semister === sem3 ||
        data.semister === sem4 ||
        data.semister === sem5 ||
        data.semister === sem6 ||
        data.semister === sem7 ||
        data.semister === sem8)
    ) {
      try {
        const newUser = new User(req.body.data);
        let registerUser = await User.register(newUser, data.password);
        req.login(registerUser, (err) => {
          if (err) {
            return next(err);
          }
          req.flash("success", "Welcome to Acet Feedback");
          res.redirect("/main");
        });
      } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
      }
    } else if (
      data.course === course4 &&
      (data.semister === sem1 ||
        data.semister === sem2 ||
        data.semister === sem3 ||
        data.semister === sem4)
    ) {
      try {
        const newUser = new User(req.body.data);
        let registerUser = await User.register(newUser, data.password);
        req.login(registerUser, (err) => {
          if (err) {
            return next(err);
          }
          req.flash("success", "Welcome to Acet Feedback");
          res.redirect("/main");
        });
      } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
      }
    } else {
      req.flash("error", "Enter valid course and Semister");
      res.redirect("/signup");
    }
  })
);



// /login/modal

app.post(
  "/login/modal",
  saveRedirectUrl,
  passport.authenticate("User-local", {
    failureRedirect: "/main",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome to Acet Feedback");
    let redirectUrl = res.locals.redirectUrl || "/main";
    console.log(redirectUrl);
    res.redirect(redirectUrl);
  }
);
//  /feed/modal
app.post(
  "/feed/login",
  saveRedirectUrl,
  passport.authenticate("User-local", {
    failureRedirect: "/main",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome to Acet Feedback");
    res.redirect("/feed");
  }
);
//logout

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out");
    res.redirect("/main");
  });
});

app.use((req, res, next) => {
  next(new ExpressError(500));
});

app.use((err, req, res, next) => {
  let { statuscode = 400, message = "something went wrong" } = err;
  res.status(statuscode).render("error.ejs", { message, statuscode });
});

app.listen(8000, (req, res) => {
  console.log("all clear", 8000);
});