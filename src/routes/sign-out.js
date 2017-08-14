router.get('/sign-out', (req, res) => { 
  req.logout()
  res.redirect('/') 
})