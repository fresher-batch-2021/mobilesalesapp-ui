//paths
const routes = [
    { path: 'index.html' },
    { path: 'register.html' },
    { path: 'home.html', role: ["user"] },
    { path: 'product.html', role: ["user"] },
    { path: 'buy.html', role: ["user"] },
    { path: 'checkout.html', role: ["user"] },
    { path: 'cart.html', role: ["user"] },

    { path: 'admin/adminindex.html', role: ["admin"] },
    { path: 'admin/addmobile.html', role: ["admin"] },
    { path: 'admin/edit.html',  role: ["admin"] },
    { path: 'admin/listmobile.html' , role: ["admin"] },
    { path: 'admin/orderlist.html',role: ["admin"] },
    { path: 'admin/userlist.html',role: ["admin"] },
];

// logout
 function logout() {
     localStorage.clear();
     window.location.href = "../index.html";
 }

//check access admin or user
function checkAccess(pageName, role) {
    let allowed = false;
    for (let route of routes) {
        
        if (route.path == pageName) {
            
            if (!route.role) {
                allowed = true;
                break;
            }
            else if (route.role.includes(role)) {
                allowed = true
                break;
            }
        }
    }
    return allowed;
}

//if user or admin is irrevelenat to their access
(function() {
    console.log("Routes initializing")
    let user = JSON.parse(localStorage.getItem("LOGGED_IN_USER"));
    let role = user != null ? user.role : null;
    let pathName = window.location.pathname.substr(1);
    let allowedAccess = checkAccess(pathName, role);

    if (!allowedAccess) {
        toastr.error("You are not authorized to access this page. Redirecting to login page",{
            positionClass: 'toast-top-center',
        });      
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 3000);       
    }
})();