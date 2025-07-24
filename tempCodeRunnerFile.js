app.use(passport.initialize());
app.use(passport.session());
passport.use( "User-local",new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use( "Collegeform-local",new localStrategy(Collegeform.authenticate()));

passport.serializeUser(Collegeform.serializeUser());
passport.deserializeUser(Collegeform.deserializeUser());