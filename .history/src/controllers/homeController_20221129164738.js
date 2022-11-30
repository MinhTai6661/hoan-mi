import db from "../models";
const getHomePage = async (req, res) => {
    try {
        const data = await db.user.findAll();
        return res.render("homePage.ejs");
    } catch (e) {}
};

export { getHomePage };
