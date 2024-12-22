// export function renderHeader() {
//   const user = JSON.parse(localStorage.getItem('user'));
  
//   return `
//     <div class="navbar-custom">
//       <div class="flex-1">
//         <h2 class="text-xl font-bold">Hi ${user?.name || 'User'}, Welcome Back!</h2>
//       </div>
//       <div class="flex-none gap-2">
//         <div class="dropdown-custom">
//           <button class="btn btn-ghost btn-circle">
//             <div class="indicator">
//               <i class="fas fa-bell"></i>
//               <span class="badge badge-xs badge-primary indicator-item"></span>
//             </div>
//           </button>
//         </div>
//         <div class="dropdown-custom">
//           <label tabindex="0" class="btn btn-ghost btn-circle avatar-custom">
//             <div class="w-10 rounded-full">
//               <span class="text-xl"><i class="fas fa-user"></i></span>
//             </div>
//           </label>
//           <ul tabindex="0" class="mt-3 z-[1] p-2 menu-custom dropdown-content">
//             <li>
//               <button onclick="toggleTheme()" class="justify-between">
//                 Theme
//                 <i class="fas fa-moon"></i>
//               </button>
//             </li>
//             ${user ? `
//               <li><button onclick="handleLogout()">Logout</button></li>
//             ` : ''}
//           </ul>
//         </div>
//       </div>
//     </div>
//   `;
// }



export function renderHeader() {
  let user = null;

  // Safely parse the user data
  try {
    const userData = localStorage.getItem('user');
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
  }

  return `
    <div class="navbar-custom">
      <div class="flex-1">
        <h2 class="text-xl font-bold">Hi ${user?.name || 'User'}, Welcome Back!</h2>
      </div>
      <div class="flex-none gap-2">
        <div class="dropdown-custom">
          <button class="btn btn-ghost btn-circle">
            <div class="indicator">
              <i class="fas fa-bell"></i>
              <span class="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
        <div class="dropdown-custom">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar-custom">
            <div class="w-10 rounded-full">
              <span class="text-xl"><i class="fas fa-user"></i></span>
            </div>
          </label>
          <ul tabindex="0" class="mt-3 z-[1] p-2 menu-custom dropdown-content">
            <li>
              <button onclick="toggleTheme()" class="justify-between">
                Theme
                <i class="fas fa-moon"></i>
              </button>
            </li>
            ${user ? `
              <li><button onclick="handleLogout()">Logout</button></li>
            ` : ''}
          </ul>
        </div>
      </div>
    </div>
  `;
}
