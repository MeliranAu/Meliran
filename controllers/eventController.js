exports.getEvents = (req, res) => {
  res.render("layout", { 
    title: "Events - Meliran",
    content: "events"
  });
};
