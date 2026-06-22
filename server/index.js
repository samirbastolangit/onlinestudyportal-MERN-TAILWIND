require("dotenv").config();
const express = require("express");
const app = express();

//solving cors issue
const cors = require("cors");
const corsOptions= {
        origin:"http://localhost:5173" ,
        methods:"POST,PUT,GET,PATCH,DELETE",
        credentials:true,
};
app.use(cors(corsOptions));

const authRouter = require("./router/auth-router");
const courseRouter  = require("./router/course-router");
const userRouter = require("./router/user-router");
const noticeRouter = require("./router/notice-router");
const profileRouter = require("./router/profile-router");
const dashboardRouter = require("./router/dashboard-router");

const connectDb = require("./db");

app.use(express.json());

app.use("/uploads",
    express.static("assets/uploads")
);

app.get("/",(req,res)=>{
        res.send("hi")
});

app.use("/api/auth", authRouter);
app.use("/api/notices", noticeRouter);
app.use("/api/courses",courseRouter);
app.use("/api/users",userRouter);
app.use("/api/profile",profileRouter);
app.use("/api/dashboard",dashboardRouter);

connectDb();
app.listen(process.env.SERVER_PORT,()=>{
        console.log(`server started on port ${process.env.SERVER_PORT}`)
})