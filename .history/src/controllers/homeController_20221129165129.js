import db from "../models/index";

const getHomePage = async (req, res) => {
    try {
        const user = await db.user.findAll();
        return res.render("homePage.ejs");
    } catch (e) {}
};

export { getHomePage };
