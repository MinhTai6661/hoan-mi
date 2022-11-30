import db from "../models";
const getHomePage = async (req, res) => {
    // const data = await db.user.findAll();
    return res.render("homePage.ejs");
};

export { getHomePage };
