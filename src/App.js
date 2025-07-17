// src/App.js

// ... (existing imports)
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // أضف هذا الاستيراد


function AppContent() {
  // ... (existing state and functions)

  // ... (existing loading/error/authentication checks and returns)

  console.log("AppContent: Rendering main application layout. UserProfile:", userProfile);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: '100%',
          ml: 0,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(!drawerOpen)}
            edge="start"
            sx={{ mr: 2 }}
            disabled={isLargeScreen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'inherit' }}>
            {appName || 'منصة المحامي'}
          </Typography>
          <Typography variant="subtitle1" sx={{ mr: 2, color: 'inherit', display: { xs: 'none', sm: 'block' } }}>
            مرحباً، {userProfile?.displayName || userProfile?.email}
          </Typography>
          <Button
            color="inherit"
            onClick={handleSignOut}
            startIcon={<LogoutIcon />}
            size={isSmallScreen ? "small" : "medium"}
            sx={{ px: isSmallScreen ? 1 : 2 }}
          >
            {!isSmallScreen && 'تسجيل الخروج'}
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isLargeScreen ? "permanent" : "temporary"}
        open={isLargeScreen ? false : drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            mt: {
                xs: `${theme.mixins.toolbar.minHeight}px`,
                md: `${theme.mixins.toolbar.minHeight}px`,
            },
            position: 'fixed',
            height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`
          },
        }}
      >
        <Box sx={{ overflowY: 'auto' }}>
          <SideMenu user={userProfile} toggleDrawer={toggleDrawer} />
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: `${theme.mixins.toolbar.minHeight}px`,
          ml: isLargeScreen ? 1 : 2,
          width: '100%',
          minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
          overflowY: 'auto',
          p: 0,
        }}
      >
        <Box sx={{ p: 0 }}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Dashboard user={userProfile} showAlert={showAlert} appName={appName} />} />
              <Route path="/cases" element={<CaseManagement user={userProfile} />} />
              <Route path="/company-cases" element={<CompanyCaseManagement user={userProfile} />} /> 
              <Route path="/company-data" element={<CompanyDataManagement user={userProfile} />} />
              <Route path="/finances" element={<FinancialTransactions user={userProfile} />} />
              <Route path="/users" element={<UserManagement user={userProfile} />} />
              <Route path="/documents" element={<DocumentManagement user={userProfile} />} />
              <Route path="/tasks-appointments" element={<TasksAppointments user={userProfile} />} />
              <Route path="/reports" element={<Reports user={userProfile} />} />
              <Route path="/settings" element={<Settings user={userProfile} />} />
              <Route path="/seed-data" element={<DataSeeder user={userProfile} />} />
              <Route path="/court-case-tree" element={<CourtCaseTreeView user={userProfile} />} /> {/* NEW ROUTE ADDED HERE */}
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Typography variant="h5" sx={{ textAlign: 'center', mt: 5 }}>الصفحة غير موجودة (404)</Typography>} />
            </Routes>
          </Suspense>
        </Box>
      </Box>

      {/* WhatsApp Floating Action Button */}
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1200 }}> {/* Changed to right for RTL consistency */}
          <IconButton
              color="primary"
              sx={{
                  backgroundColor: '#25D366', // WhatsApp green
                  '&:hover': {
                      backgroundColor: '#1DA851', // Darker green on hover
                      transform: 'scale(1.05)', // Subtle zoom effect
                  },
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow
                  p: 1.5, // Padding for larger touch area
                  borderRadius: '50%', // Make it circular
              }}
              onClick={() => window.open('https://wa.me/+962775379898', '_blank')}
              aria-label="WhatsApp"
              title="تواصل معنا عبر واتساب"
          >
              <WhatsAppIcon sx={{ fontSize: 35, color: 'white' }} />
          </IconButton>
      </Box>

      {/* Floating Email Button (Optional) */}
      <Box sx={{ position: 'fixed', bottom: 90, right: 20, zIndex: 1200 }}> {/* Placed above WhatsApp */}
          <IconButton
              color="secondary"
              sx={{
                  backgroundColor: '#DB4437', // Google/Email red
                  '&:hover': {
                      backgroundColor: '#C23321', // Darker red on hover
                      transform: 'scale(1.05)',
                  },
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  p: 1.5,
                  borderRadius: '50%',
              }}
              onClick={() => window.open('mailto:saad.abushendi@gmail.com', '_blank')}
              aria-label="Email"
              title="أرسل لنا بريداً إلكترونياً"
          >
              <EmailIcon sx={{ fontSize: 35, color: 'white' }} /> {/* Assuming EmailIcon is imported from @mui/icons-material */}
          </IconButton>
      </Box>


      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

// ... (rest of the file)
