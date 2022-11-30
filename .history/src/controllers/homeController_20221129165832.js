import db from "../models/index";

const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();
        console.log("getHomePage ~ user", data);
        return res.render("homePage.ejs", { data });
    } catch (e) {}
};

export { getHomePage };
