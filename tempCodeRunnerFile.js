et("/avatar/:gxid",(req, res) =>{
  const gxid = _.capitalize(req.params.gxid);
  console.log("Got avatar gxid: " + gxid);
  res.render("avatar",{"gxid": gxid});
});