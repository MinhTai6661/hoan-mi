import db from "../models/index";

const getHomePage = async (req, res) => {
    try {
        const user = await db.User.findAll();
        console.log("getHomePage ~ user", user);
        return res.render("homePage.ejs");
    } catch (e) {}
};

export { getHomePage };
