exports.getHome = (req, res) => {
  res.render("layout", { 
    title: "Home - Meliran",
    content: "home"
  });
};
