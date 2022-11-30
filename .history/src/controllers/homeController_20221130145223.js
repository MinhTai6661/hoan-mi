import db from "../models/index";

const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();
        console.log("getHomePage ~ user", data);
        return res.render("homePage.ejs", { data: JSON.stringify(data) });
    } catch (e) {
        console.log(e);
    }
};

const getCRUD = (req, res) => {
    return res.render("crud.ejs");
};
const postCRUD = (req, res) => {
    return res.send(req.body);
};

export { getHomePage, getCRUD, postCRUD };
